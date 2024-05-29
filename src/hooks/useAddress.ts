import { Adress } from '@/types/clients.types';
import { GEOLOCATION_API_KEY } from '@/config/api';
import { INITIAL_COORDS } from '@/types/utils.types';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

interface Location {
  city: string;
  street: string;
  number: string;
}

export const useAddress = (defaultValues?: Adress) => {
  const [address, setAddress] = useState<Adress>({
    lon: defaultValues ? Number(defaultValues?.lon) : INITIAL_COORDS.LON,
    lat: defaultValues ? Number(defaultValues?.lat) : INITIAL_COORDS.LAT,
    address: defaultValues?.address ?? '',
  });

  const [location, setLocation] = useState<Location>({
    street:
      `${defaultValues?.address?.split(' ')[0]} ${defaultValues?.address?.split(' ')[1]}` ??
      '',
    number: defaultValues?.address?.split(' ')[2] ?? '',
    city:
      `${defaultValues?.address?.split(' ')[4]} ${defaultValues?.address?.split(' ')[5]}` ??
      '',
  });

  const [error, setError] = useState(false);

  const noError = () => {
    setError(false);
  };

  const handleLocation = useDebouncedCallback(
    (key: keyof Location, value: string) => {
      if (value.trim().length === 0) setError(true);
      setLocation((prev) => ({ ...prev, [key]: value }));
    },
    600,
  );

  const handleGetAddress = async ({ street, number, city }: Location) => {
    const trimmedStreet = street.trim();
    const trimmedCity = city.trim();

    const URL = `https://api.geoapify.com/v1/geocode/search?street=${trimmedStreet.replace(/ /g, '%20')}&housenumber=${number}&city=${trimmedCity.replace(/ /g, '%20')}&country=Argentina&format=json&apiKey=${GEOLOCATION_API_KEY}`;
    const res = await fetch(`${URL}`, {
      method: 'GET',
    });
    const { results }: { results: Array<any> } = await res.json();

    if (results && results.length > 0) {
      const {
        lon,
        lat,
        formatted,
      }: { lon: number; lat: number; formatted: string } = results[0];
      if (lat && lon && formatted) setAddress({ lat, lon, address: formatted });
    }
  };

  return {
    address,
    location,
    handleGetAddress,
    handleLocation,
    error,
    noError,
  };
};
