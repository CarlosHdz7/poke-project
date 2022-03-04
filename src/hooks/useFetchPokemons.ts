import { useState, useEffect, useRef } from 'react';
import IPokemon from "../interfaces/IPokemon";
import { getAllPokemons } from '../services/pokemons.service';

const useFetchPokemons = (filter: string) => {
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IPokemon[]>();
  const [error, setError] = useState();

  useEffect(() => {
    getPokemons();
    return () => {
      isMounted.current = false;
    }
  }, [filter])

  const getPokemons = async () => {
    setLoading(true);
    isMounted.current = true;
    try {
      const pokemons = await getAllPokemons(filter);
      setData(pokemons);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  };
  

  return { loading, data, error };
}

export default useFetchPokemons;