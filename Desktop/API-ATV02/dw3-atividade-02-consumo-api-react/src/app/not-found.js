import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '6rem', color: '#9f1b1b', fontWeight: '900', margin: 0, textShadow: '4px 4px 0 #222224' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', color: '#222224', marginBottom: '2rem', fontWeight: '900' }}>
        Um Pokémon selvagem bloqueou o caminho!
      </h2>
      <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 'bold' }}>
        A página que você está procurando não existe ou foi capturada.
      </p>
      
      {/* Imagem de um Pokémon confuso (Psyduck) */}
      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '2rem' }}>
        <Image 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" 
          alt="Psyduck confuso" 
          fill 
          style={{ objectFit: 'contain' }} 
          unoptimized 
        />
      </div>

      <Link 
        href="/" 
        style={{ 
          padding: '1rem 3rem', background: '#9f1b1b', color: '#fff', 
          borderRadius: '999px', textDecoration: 'none', fontWeight: '900',
          border: '2px solid #222224', boxShadow: '0 4px 0 #222224'
        }}
      >
        Voltar para a segurança
      </Link>
    </div>
  );
}