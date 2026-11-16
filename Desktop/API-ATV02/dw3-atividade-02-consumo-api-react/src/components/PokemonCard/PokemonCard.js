import Link from "next/link";
import Image from "next/image";
import constants from "@/lib/constants";
import TypeBadge from "@/components/TypeBadge/TypeBadge";
import styles from "./PokemonCard.module.css";

export default function PokemonCard({ id, name }) {
  // Monta a URL da imagem oficial do Pokémon usando o ID
  const imgUrl = `${constants.SPRITE_BASE}/${id}.png`;

  return (
    <Link href={`/pokemon/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imgUrl}
          alt={name}
          width={120}
          height={120}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.id}>#{String(id).padStart(3, "0")}</span>
        <h3 className={styles.name}>{name}</h3>
      </div>
    </Link>
  );
}
