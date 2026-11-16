import PokemonCard from "@/components/PokemonCard/PokemonCard";
import styles from "./PokemonGrid.module.css";

export default function PokemonGrid({ pokemons }) {
  if (!pokemons || pokemons.length === 0) {
    return <p className={styles.empty}>Nenhum Pokémon encontrado.</p>;
  }

  return (
    <div className={styles.grid}>
      {pokemons.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  );
}
