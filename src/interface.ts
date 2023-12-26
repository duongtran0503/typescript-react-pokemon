 export interface Pokemons{
    name:string,
    url:string,
    id:string,
    sprites:{
      front_default:string,
    }
  }
  export interface Detail {
    id:string;
    isOpened:boolean;
  }
  export interface PokemonDetail extends Pokemons {
    abilities?: {
      abilities:string;
      name:string;
    }[];
  }