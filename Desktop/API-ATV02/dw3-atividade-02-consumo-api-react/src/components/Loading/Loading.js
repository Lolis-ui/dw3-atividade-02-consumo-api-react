import styles from "./Loading.module.css";

export default function Loading({ texto = "Carregando..." }) {
  return (
    <div className={styles.container}>
      <video className={styles.video} autoPlay loop muted playsInline>
        <source src="/imgs/arceus_gif.webm" type="video/webm" />
      </video>
      <p className={styles.text}>{texto}</p>
    </div>
  );
}
