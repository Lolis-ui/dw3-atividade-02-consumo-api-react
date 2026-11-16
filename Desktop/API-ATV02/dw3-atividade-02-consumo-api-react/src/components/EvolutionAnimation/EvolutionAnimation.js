"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import constants from "@/lib/constants";

// Função para buscar o ID de um Pokémon pelo nome na árvore
function acharIdNaArvore(node, nome) {
  if (node.species.name === nome) {
    return Number(node.species.url.split("/").filter(Boolean).pop());
  }
  for (let i = 0; i < node.evolves_to.length; i++) {
    const resultado = acharIdNaArvore(node.evolves_to[i], nome);
    if (resultado) return resultado;
  }
  return null;
}

// Função que encontra TODAS as próximas evoluções
function acharProximasEvolucoes(chainNode, nomeAtual) {
  let noAtual = null;
  function buscarNo(node) {
    if (node.species.name === nomeAtual) noAtual = node;
    else node.evolves_to.forEach(buscarNo);
  }
  buscarNo(chainNode);

  if (!noAtual) return [];

  // Mapeia todas as evoluções possíveis a partir deste nó
  return noAtual.evolves_to.map((proximoNo) => ({
    nome: proximoNo.species.name,
    id: acharIdNaArvore(chainNode, proximoNo.species.name),
  }));
}

export default function EvolutionAnimation({
  evolucaoData,
  nomeAtual,
  idAtual,
}) {
  const [evoluindo, setEvoluindo] = useState(false);
  const [mostrarProximas, setMostrarProximas] = useState(false);

  if (!evolucaoData || !evolucaoData.chain) return null;

  const proximasInfos = acharProximasEvolucoes(evolucaoData.chain, nomeAtual);

  if (proximasInfos.length === 0) {
    return (
      <div
        style={{
          marginTop: "1rem",
          color: "#888",
          fontStyle: "italic",
          background: "#fff",
          padding: "1rem",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        Este Pokémon não evolui mais.
      </div>
    );
  }

  function handleEvoluir() {
    setEvoluindo(true);
    setTimeout(() => {
      setMostrarProximas(true);
      setEvoluindo(false);
    }, 2000);
  }

  return (
    <div
      style={{
        textAlign: "center",
        background: "#fff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "1.5rem", color: "#222" }}>Evolução</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Pokémon Atual */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              width: "150px",
              height: "150px",
              margin: "0 auto",
              animation: evoluindo ? "piscar 0.2s infinite alternate" : "none",
            }}
          >
            <Image
              src={`${constants.SPRITE_BASE}/${idAtual}.png`}
              alt={nomeAtual}
              fill
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>
          <p
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              marginTop: "1rem",
              color: "#333",
            }}
          >
            {nomeAtual}
          </p>
        </div>

        {/* Seta para baixo indicando a evolução */}
        {mostrarProximas && (
          <div style={{ fontSize: "2rem", color: "#888" }}>⬇</div>
        )}

        {/* Lista de Pokémon Evoluídos (múltiplas opções) */}
        {mostrarProximas && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {proximasInfos.map((proxima) => (
              <Link
                key={proxima.id}
                href={`/pokemon/${proxima.id}`}
                style={{
                  textDecoration: "none",
                  display: "block",
                  cursor: "pointer",
                }}
                title={`Ver detalhes de ${proxima.nome}`}
              >
                <div
                  style={{
                    position: "relative",
                    width: "120px",
                    height: "120px",
                    transition: "transform 0.2s",
                  }}
                >
                  <Image
                    src={`${constants.SPRITE_BASE}/${proxima.id}.png`}
                    alt={proxima.nome}
                    fill
                    style={{ objectFit: "contain" }}
                    unoptimized
                  />
                </div>
                <p
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    marginTop: "0.5rem",
                    color: "#ef5350",
                    textAlign: "center",
                  }}
                >
                  {proxima.nome}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {!mostrarProximas && (
        <button
          onClick={handleEvoluir}
          disabled={evoluindo}
          style={{
            marginTop: "2rem",
            padding: "0.8rem 2rem",
            background: evoluindo ? "#ccc" : "#ef5350",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: evoluindo ? "not-allowed" : "pointer",
            boxShadow: "0 4px 6px rgba(239, 83, 80, 0.4)",
            transition: "background-color 0.2s",
          }}
        >
          {evoluindo ? "Evoluindo..." : "Evoluir!"}
        </button>
      )}

      <style>{`
        @keyframes piscar {
          0% { filter: brightness(1); transform: scale(1); }
          100% { filter: brightness(2); transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
