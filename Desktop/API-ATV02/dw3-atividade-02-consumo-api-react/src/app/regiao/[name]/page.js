import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import regions from "@/lib/regions";
import constants from "@/lib/constants";
import pokeapi from "@/lib/pokeapi";
import Loading from "@/components/Loading/Loading";
import lendas from "@/data/lendas.json";
import styles from "./page.module.css"; // <-- IMPORTANDO O CSS

async function DadosDaRegiao({ paramsPromise }) {
  const params = await paramsPromise;
  const nomeRegiao = params.name;

  const dadosRegiao = regions.getRegionData(nomeRegiao);

  if (!dadosRegiao) {
    return (
      <div className={styles.notFoundBox}>
        <h1 style={{ color: "#9f1b1b", fontSize: "2rem", fontWeight: "900" }}>
          Região não encontrada
        </h1>
        <Link
          href="/"
          className={styles.backBtn}
          style={{ marginTop: "1rem", display: "inline-block" }}
        >
          Voltar para o catálogo
        </Link>
      </div>
    );
  }

  const lendariosInfo = await Promise.all(
    dadosRegiao.legendaries.map(async (nomeLendario) => {
      try {
        const dados = await pokeapi.getPokemon(nomeLendario);
        return {
          id: dados.id,
          name: dados.name,
          image: `${constants.SPRITE_BASE}/${dados.id}.png`,
          lenda:
            lendas[nomeLendario] ||
            "Um Pokémon envolto em mistérios e lendas antigas.",
        };
      } catch {
        return null;
      }
    }),
  );

  const lendariosValidos = lendariosInfo.filter((l) => l !== null);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Image
          src={dadosRegiao.map}
          alt="Fundo"
          fill
          className={styles.bannerBg}
          unoptimized
        />

        <div className={styles.bannerImgContainer}>
          <Image
            src={dadosRegiao.map}
            alt={`Mapa de ${dadosRegiao.name}`}
            fill
            style={{ objectFit: "contain" }}
            unoptimized
          />
        </div>
      </div>

      <div className={styles.card}>
        <h1 className={styles.regionName}>{dadosRegiao.name}</h1>
        <h3 className={styles.sectionTitle}>A História da Região</h3>
        <p className={styles.storyText}>{dadosRegiao.story}</p>
      </div>

      <div className={styles.card}>
        <h2
          style={{
            color: "#222224",
            marginBottom: "0.5rem",
            fontSize: "2rem",
            fontWeight: "900",
          }}
        >
          Lendas de {dadosRegiao.name}
        </h2>
        <p style={{ color: "#666", marginBottom: "2rem", fontWeight: "bold" }}>
          Os Pokémon lendários que moldaram a história desta região.
        </p>

        {lendariosValidos.length === 0 ? (
          <p style={{ color: "#666" }}>
            Nenhum lendário cadastrado para esta região.
          </p>
        ) : (
          <div className={styles.legendaryList}>
            {lendariosValidos.map((lendario) => (
              <Link
                key={lendario.id}
                href={`/pokemon/${lendario.id}`}
                className={styles.legendaryCard}
              >
                <div className={styles.legendaryImage}>
                  <Image
                    src={lendario.image}
                    alt={lendario.name}
                    fill
                    style={{ objectFit: "contain" }}
                    unoptimized
                  />
                </div>
                <div className={styles.legendaryInfo}>
                  <h3 className={styles.legendaryName}>
                    {lendario.name.replace("-", " ")}
                  </h3>
                  <p className={styles.legendaryLore}>{lendario.lenda}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className={styles.backBtnWrapper}>
        <Link href="/" className={styles.backBtn}>
          &larr; Voltar ao Catálogo
        </Link>
      </div>
    </div>
  );
}

export default function RegiaoPage(props) {
  return (
    <Suspense fallback={<Loading texto={`Carregando dados da região...`} />}>
      <DadosDaRegiao paramsPromise={props.params} />
    </Suspense>
  );
}
