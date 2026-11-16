"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PokemonGrid from "@/components/PokemonGrid/PokemonGrid";
import RegionSelector from "@/components/RegionSelector/RegionSelector";
import SearchBar from "@/components/SearchBar/SearchBar";
import Loading from "@/components/Loading/Loading";
import regions from "@/lib/regions";
import pokeapi from "@/lib/pokeapi";
import constants from "@/lib/constants";
import styles from "./page.module.css";

export default function Home() {
  const [regiaoAtual, setRegiaoAtual] = useState("kanto");
  const [todosPokemons, setTodosPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 14;

  function mudarRegiao(novaRegiao) {
    setRegiaoAtual(novaRegiao);
    setPaginaAtual(0);
  }

  useEffect(() => {
    async function carregarPokemons() {
      setLoading(true);
      try {
        const ids = regions.getPokemonIdsByRegion(regiaoAtual);
        const todosNomes = await pokeapi.getAllPokemonNames();

        const nomesDaRegiao = todosNomes
          .map((p) => {
            const id = Number(p.url.split("/").filter(Boolean).pop());
            return { id, name: p.name };
          })
          .filter((p) => ids.includes(p.id));

        const basicos = [];
        const tamanhoLote = 20;

        for (let i = 0; i < nomesDaRegiao.length; i += tamanhoLote) {
          const lote = nomesDaRegiao.slice(i, i + tamanhoLote);
          const detalhes = await Promise.all(
            lote.map(async (p) => {
              const species = await pokeapi.getSpecies(p.id);
              const evolution = await pokeapi.getEvolutionChain(
                species.evolution_chain.url,
              );
              return { p, evolution };
            }),
          );

          detalhes.forEach(({ p, evolution }) => {
            if (evolution.chain.species.name === p.name) {
              basicos.push(p);
            }
          });
        }
        setTodosPokemons(basicos);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarPokemons();
  }, [regiaoAtual]);

  const totalPaginas = Math.ceil(todosPokemons.length / itensPorPagina);
  const pokemonsPaginados = todosPokemons.slice(
    paginaAtual * itensPorPagina,
    (paginaAtual + 1) * itensPorPagina,
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h2 className={styles.title}>Catálogo de Pokémon</h2>
        <p className={styles.subtitle}>
          Escolha uma região e clique em um Pokémon para ver seus detalhes
        </p>
      </div>

      <SearchBar />
      <RegionSelector regiaoAtual={regiaoAtual} onMudarRegiao={mudarRegiao} />

      {loading ? (
        <div className={styles.loadingWrapper}>
          <Loading texto="Carregando Pokémon..." />
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          <button
            onClick={() => setPaginaAtual((prev) => Math.max(0, prev - 1))}
            disabled={paginaAtual === 0}
            className={`${styles.floatingBtn} ${styles.btnLeft} ${paginaAtual === 0 ? styles.btnDisabled : styles.btnActive}`}
          >
            ←
          </button>

          <PokemonGrid pokemons={pokemonsPaginados} />

          <button
            onClick={() =>
              setPaginaAtual((prev) => Math.min(totalPaginas - 1, prev + 1))
            }
            disabled={paginaAtual >= totalPaginas - 1}
            className={`${styles.floatingBtn} ${styles.btnRight} ${paginaAtual >= totalPaginas - 1 ? styles.btnDisabled : styles.btnActive}`}
          >
            →
          </button>

          <div className={styles.pageCount}>
            Página {paginaAtual + 1} de {totalPaginas}
          </div>

          {/* NOVA MENSAGEM / BOTÃO DA REGIÃO */}
          <div className={styles.regionSection}>
            <Link
              href={`/regiao/${regiaoAtual}`}
              className={styles.regionLinkButton}
            >
              Ler a história e os lendários de{" "}
              {constants.REGION_DISPLAY_NAMES[regiaoAtual]} &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
