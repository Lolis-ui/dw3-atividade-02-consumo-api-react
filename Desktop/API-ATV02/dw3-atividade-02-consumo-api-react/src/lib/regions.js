import regionsData from "@/data/regions.json";

// Ranges de IDs por geração (aproximado, suficiente para o catálogo)
const REGION_ID_RANGES = {
  kanto: [1, 151],
  johto: [152, 251],
  hoenn: [252, 386],
  sinnoh: [387, 493],
  unova: [494, 649],
  kalos: [650, 721],
  alola: [722, 809],
  galar: [810, 905],
  paldea: [906, 1025],
};

// Lista de nomes de região (kanto, johto, ...)
function getRegionNames() {
  return Object.keys(regionsData);
}

// Retorna o objeto completo de uma região (name, generation, map, story, legendaries)
function getRegionData(regionName) {
  if (!regionName) return null;
  return regionsData[regionName.toLowerCase()] ?? null;
}

// Retorna a lista de IDs de Pokémon daquela região
function getPokemonIdsByRegion(regionName) {
  if (!regionName) return [];
  const range = REGION_ID_RANGES[regionName.toLowerCase()];
  if (!range) return [];

  const [start, end] = range;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// Dado o nome da geração (ex.: "generation-i"), retorna a chave da região ("kanto")
function getRegionByGeneration(generationName) {
  if (!generationName) return null;

  const entry = Object.entries(regionsData).find(
    ([, data]) => data.generation === generationName,
  );

  return entry ? entry[0] : null;
}

const regions = {
  getRegionNames,
  getRegionData,
  getPokemonIdsByRegion,
  getRegionByGeneration,
  REGION_ID_RANGES,
};

export default regions;
