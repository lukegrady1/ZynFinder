'use client';

import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Store } from '@/types';
import { useLocation } from '@/hooks/useLocation';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060 // New York City coordinates as default
};

interface MapProps {
  stores: Store[];
  onStoreSelect?: (store: Store) => void;
}

export default function Map({ stores, onStoreSelect }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const { location, loading: locationLoading, error: locationError } = useLocation();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    if (location) {
      map.setCenter(location);
      map.setZoom(13);
    }
    setMap(map);
  }, [location]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  if (!isLoaded || locationLoading) return <div>Loading...</div>;
  if (locationError) return <div>Error: {locationError}</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || defaultCenter}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* User Location Marker */}
      {location && (
        <Marker
          position={location}
          icon={{
            url: '/user-location.svg',
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      )}

      {/* Store Markers */}
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={store.location}
          onClick={() => {
            setSelectedStore(store);
            if (onStoreSelect) onStoreSelect(store);
          }}
        />
      ))}

      {/* Info Window */}
      {selectedStore && (
        <InfoWindow
          position={selectedStore.location}
          onCloseClick={() => setSelectedStore(null)}
        >
          <div style={{
            padding: '0.5rem'
          }}>
            <h3 style={{
              fontWeight: 600,
              marginBottom: '0.25rem'
            }}>{selectedStore.name}</h3>
            <p style={{
              fontSize: '0.875rem'
            }}>{selectedStore.address}</p>
            <p style={{
              fontSize: '0.75rem',
              color: '#666',
              marginTop: '0.25rem'
            }}>
              Last updated: {selectedStore.lastUpdated.toLocaleDateString()}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
} 