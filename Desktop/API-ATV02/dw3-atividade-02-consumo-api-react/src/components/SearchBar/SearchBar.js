"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    const busca = query.trim().toLowerCase();
    
    // A PokéAPI aceita tanto o número do ID (ex: 25) quanto o nome (ex: pikachu)
    router.push(`/pokemon/${busca}`);
    
    setQuery(''); // Limpa o campo após a busca
  }

  return (
    <form onSubmit={handleSearch} className={styles.form}>
      <input 
        type="text" 
        placeholder="Buscar Pokémon (nome ou ID)..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Buscar
      </button>
    </form>
  );
}