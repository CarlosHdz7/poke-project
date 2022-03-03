import { useState, useEffect, useRef } from 'react';
import IPokemon from "../interfaces/IPokemon";
import { getPokemonById } from '../services/pokemons.service';

const useFetchPokemon = (id: string) => {
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IPokemon>();
  const [error, setError] = useState();

  useEffect(() => {
    getPokemon();
    return () => {
      isMounted.current = false;
    }
  }, [id])

  const getPokemon = async () => {
    setLoading(true);
    isMounted.current = true;
    try {
      const pokemon = await getPokemonById(id);
      setData(pokemon);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  };
  

  return { loading, data, error };
}

export default useFetchPokemon;