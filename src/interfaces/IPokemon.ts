interface IPokemon {
  id: number;
  name: string;
  image: string;
  url?: string;
  stats?: IStat[];
  type?: string[];
}

interface IStat {
  name: string;
  base: number;
}

export default IPokemon;
