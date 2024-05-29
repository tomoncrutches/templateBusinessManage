'use client';

import { GeolocateControl, Map as MapContainer, Marker } from 'react-map-gl';

import { MAPBOX_ACCESS_TOKEN } from '@/config/mapbox';

export const Map = ({
  lat,
  lon,
  height,
  maxWidth,
}: {
  lat: number;
  lon: number;
  height?: string;
  maxWidth?: boolean;
}) => {
  return (
    <MapContainer
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        zoom: 10.5,
        latitude: lat,
        longitude: lon,
      }}
      style={{
        width: '100%',
        height: height ?? '300px',
        borderRadius: '11px',
        flexGrow: maxWidth ? 1 : 0,
      }}
      mapStyle='mapbox://styles/tomoncrutches/clubb72fv023h01qqg9c06s21'
    >
      <Marker longitude={lon} latitude={lat} color='#184c1c' scale={0.75} />
      <GeolocateControl />
    </MapContainer>
  );
};
