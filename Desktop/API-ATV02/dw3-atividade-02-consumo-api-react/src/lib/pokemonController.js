import pokeapi from "@/lib/pokeapi";
import typeChartLib from "@/lib/typeChart";
import constants from "@/lib/constants";
import regions from "@/lib/regions";

export async function buscarDadosCompletosPokemon(id) {
  try {
    const [pokemon, species] = await Promise.all([
      pokeapi.getPokemon(id),
      pokeapi.getSpecies(id),
    ]);

    const evolucao = await pokeapi.getEvolutionChain(
      species.evolution_chain.url,
    );

    const tipos = pokemon.types.map((t) => t.type.name);
    const efetividades = typeChartLib.calcularEfetividade(tipos);

    const regiaoChave = regions.getRegionByGeneration(species.generation.name);
    const regiaoNome =
      constants.REGION_DISPLAY_NAMES[regiaoChave] || "Desconhecida";

    // Pega a categoria (ex: "Seed Pokémon")
    const categoria =
      species.genera.find((g) => g.language.name === "en")?.genus ||
      "Pokémon Desconhecido";

    return {
      id: pokemon.id,
      nome: pokemon.name,
      imagem: `${constants.SPRITE_BASE}/${pokemon.id}.png`,
      tipos,
      categoria,
      altura: pokemon.height / 10,
      peso: pokemon.weight / 10,
      status: pokemon.stats.map((s) => ({
        nome: s.stat.name,
        valor: s.base_stat,
      })),
      ataques: pokemon.moves.slice(0, 10).map((m) => m.move.name),
      fraquezas: efetividades.fraquezas,
      resistencias: efetividades.resistencias,
      regiao: regiaoNome,
      lendario: species.is_legendary || species.is_mythical,
      evolucao,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do pokémon", error);
    return null;
  }
}
