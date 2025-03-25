'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Store } from '@/types';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      Loading map...
    </div>
  )
});

export default function HomePage() {
  const [stores] = useState<Store[]>([]);  // Empty array for now, will be populated later

  return (
    <main style={{
      height: '100vh',
      width: '100vw',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem',
        background: 'white',
        zIndex: 1,
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          ZynFinder
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666'
        }}>
          Find nicotine pouches in stock at stores near you
        </p>
      </div>
      <Map stores={stores} />
    </main>
  );
} 