import { IBookmark } from 'interfaces/IBookmark';

const bookmarksMock: IBookmark[] = [
  {
    uid: 25,
    pokemon: {
      id: 25,
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      stats: [
        {
          name: 'Hp',
          base: 35,
        },
        {
          name: 'Attack',
          base: 55,
        },
        {
          name: 'Defense',
          base: 40,
        },
        {
          name: 'Special-Attack',
          base: 50,
        },
        {
          name: 'Special-Defense',
          base: 50,
        },
        {
          name: 'Speed',
          base: 90,
        },
      ],
      type: ['electric'],
    },
  },
  {
    uid: 1,
    pokemon: {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      stats: [
        {
          name: 'Hp',
          base: 45,
        },
        {
          name: 'Attack',
          base: 49,
        },
        {
          name: 'Defense',
          base: 49,
        },
        {
          name: 'Special-Attack',
          base: 65,
        },
        {
          name: 'Special-Defense',
          base: 65,
        },
        {
          name: 'Speed',
          base: 45,
        },
      ],
      type: ['grass', 'poison'],
    },
  },
];

export default bookmarksMock;
