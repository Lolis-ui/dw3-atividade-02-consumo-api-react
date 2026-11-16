import typeChart from "@/data/typeChart.json";

// Calcula fraquezas, resistências e imunidades de um Pokémon a partir dos seus tipos
function calcularEfetividade(tipos) {
  if (!tipos || tipos.length === 0) {
    return { fraquezas: [], resistencias: [], imunidades: [] };
  }

  const efetividade = {};

  for (const tipo of tipos) {
    const rel = typeChart[tipo];
    if (!rel) continue;

    for (const t of rel.double_damage_from) {
      efetividade[t] = (efetividade[t] ?? 1) * 2;
    }
    for (const t of rel.half_damage_from) {
      efetividade[t] = (efetividade[t] ?? 1) * 0.5;
    }
    for (const t of rel.no_damage_from) {
      efetividade[t] = 0;
    }
  }

  return {
    fraquezas: Object.entries(efetividade)
      .filter(([, v]) => v > 1)
      .map(([k]) => k),
    resistencias: Object.entries(efetividade)
      .filter(([, v]) => v > 0 && v < 1)
      .map(([k]) => k),
    imunidades: Object.entries(efetividade)
      .filter(([, v]) => v === 0)
      .map(([k]) => k),
  };
}

// Retorna a multiplicação de efetividade de um tipo atacante contra os tipos do defensor
// Ex.: efetividadeContra('water', ['fire', 'flying']) → 2 (water é 2x contra fire e 1x contra flying)
function efetividadeContra(tipoAtacante, tiposDefensor) {
  if (!tipoAtacante || !tiposDefensor || tiposDefensor.length === 0) return 1;

  return tiposDefensor.reduce((acc, tipoDefensor) => {
    const rel = typeChart[tipoDefensor];
    if (!rel) return acc;

    if (rel.double_damage_from.includes(tipoAtacante)) return acc * 2;
    if (rel.half_damage_from.includes(tipoAtacante)) return acc * 0.5;
    if (rel.no_damage_from.includes(tipoAtacante)) return acc * 0;

    return acc;
  }, 1);
}

const typeChartLib = {
  calcularEfetividade,
  efetividadeContra,
};

export default typeChartLib;
