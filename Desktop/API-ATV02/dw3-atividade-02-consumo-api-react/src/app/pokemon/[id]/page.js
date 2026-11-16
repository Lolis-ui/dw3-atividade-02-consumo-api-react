import Image from 'next/image';
import Link from 'next/link';
import { buscarDadosCompletosPokemon } from '@/lib/pokemonController';
import TypeBadge from '@/components/TypeBadge/TypeBadge';
import EvolutionAnimation from '@/components/EvolutionAnimation/EvolutionAnimation';
import constants from '@/lib/constants';
import styles from './page.module.css'; 

export default async function PokemonDetalhesPage(props) {
  const params = await props.params;
  const id = params.id;
  const pokemon = await buscarDadosCompletosPokemon(id);

  if (!pokemon) {
    return (
      <div className={styles.notFoundBox}>
        <h1 className={styles.notFoundTitle}>Pokémon não encontrado</h1>
        <Link href="/" className={styles.backBtn} style={{ marginTop: '1rem', background: '#222224' }}>
          Voltar para o catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      
      <div>
        <Link href="/" className={styles.backBtn}>
          &larr; Voltar ao Catálogo
        </Link>
      </div>

      <div className={styles.mainCard}>
        
        <div className={styles.imageCol}>
          <Image src={pokemon.imagem} alt={pokemon.nome} width={250} height={250} style={{ objectFit: 'contain' }} priority unoptimized />
          
          <h1 className={styles.pokemonName}>
            {pokemon.nome} <span className={styles.pokemonId}>#{pokemon.id}</span>
          </h1>
          
          <p className={styles.categoryBadge}>{pokemon.categoria}</p>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {pokemon.tipos.map(tipo => <TypeBadge key={tipo} type={tipo} />)}
          </div>

          {pokemon.lendario && (
            <span className={styles.legendaryBadge}>LENDÁRIO</span>
          )}
        </div>

        <div className={styles.infoCol}>
          
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>ALTURA</p>
              <p className={styles.statValue}>{pokemon.altura} m</p>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>PESO</p>
              <p className={styles.statValue}>{pokemon.peso} kg</p>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>REGIÃO</p>
              <p className={styles.statValue}>{pokemon.regiao}</p>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Status Base</h3>
          <div className={styles.progressBarContainer}>
            {pokemon.status.map(stat => (
              <div key={stat.nome} className={styles.progressRow}>
                <span className={styles.progressName}>
                  {constants.STAT_DISPLAY_NAMES[stat.nome]}
                </span>
                <div className={styles.progressBarBg}>
                  <div 
                    className={styles.progressBarFill} 
                    style={{ 
                      width: `${(stat.valor / 255) * 100}%`, 
                      background: stat.valor > 100 ? '#4caf50' : stat.valor > 50 ? '#ffcb05' : '#9f1b1b' 
                    }}
                  ></div>
                </div>
                <span className={styles.progressValue}>{stat.valor}</span>
              </div>
            ))}
          </div>

          <div className={styles.flexRow}>
            <div style={{ flex: 1 }}>
              <h3 className={styles.sectionTitle}>Fraquezas</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pokemon.fraquezas.length > 0 ? pokemon.fraquezas.map(f => <TypeBadge key={f} type={f} />) : <span style={{ color: '#666', fontWeight: 'bold' }}>Nenhuma</span>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 className={styles.sectionTitle}>Resistências</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pokemon.resistencias.length > 0 ? pokemon.resistencias.map(r => <TypeBadge key={r} type={r} />) : <span style={{ color: '#666', fontWeight: 'bold' }}>Nenhuma</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.attacksCard}>
        <h3 className={styles.sectionTitle}>Ataques Principais</h3>
        <ul className={styles.attacksList}>
          {pokemon.ataques.map(ataque => (
            <li key={ataque} className={styles.attackItem}>
              {ataque.replace('-', ' ')}
            </li>
          ))}
        </ul>
      </div>

      <EvolutionAnimation evolucaoData={pokemon.evolucao} nomeAtual={pokemon.nome} idAtual={pokemon.id} />
    </div>
  );
}