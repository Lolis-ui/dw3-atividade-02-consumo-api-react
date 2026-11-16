import constants from "@/lib/constants";

const { POKEAPI_BASE } = constants;

async function fetchJson(url) {
  const res = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Erro ao buscar: ${url} (status ${res.status})`);
  }
  return res.json();
}

// Busca um Pokémon pelo ID ou nome
// Retorna: tipos, altura, peso, status, ataques, sprites
function getPokemon(idOrName) {
  return fetchJson(`${POKEAPI_BASE}/pokemon/${idOrName}`);
}

// Busca a espécie do Pokémon (contém geração, se é lendário, URL da evolução)
function getSpecies(idOrName) {
  return fetchJson(`${POKEAPI_BASE}/pokemon-species/${idOrName}`);
}

// Busca a cadeia de evolução a partir da URL que vem em species.evolution_chain.url
function getEvolutionChain(url) {
  return fetchJson(url);
}

// Busca uma região na PokéAPI (lista de Pokédex e localizações)
function getRegion(name) {
  return fetchJson(`${POKEAPI_BASE}/region/${name}`);
}

// Cache em memória da lista completa de nomes (para a busca)
let allPokemonCache = null;

async function getAllPokemonNames() {
  if (allPokemonCache) return allPokemonCache;

  const data = await fetchJson(`${POKEAPI_BASE}/pokemon?limit=100000`);
  allPokemonCache = data.results; // [{ name, url }]
  return allPokemonCache;
}

// Busca por nome (filtra localmente a lista completa)
async function searchPokemon(query) {
  if (!query || query.trim().length < 2) return [];

  const all = await getAllPokemonNames();
  const q = query.trim().toLowerCase();

  return all
    .filter((p) => p.name.includes(q))
    .slice(0, 40)
    .map((p) => {
      const id = Number(p.url.split("/").filter(Boolean).pop());
      return { id, name: p.name };
    });
}

const pokeapi = {
  getPokemon,
  getSpecies,
  getEvolutionChain,
  getRegion,
  getAllPokemonNames,
  searchPokemon,
};

export default pokeapi;
