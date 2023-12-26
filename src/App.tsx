import React, {useState,useEffect} from "react"
import PokemonCollection from "./components/PokemonCollection"
import "./App.scss"
import axios from "axios"
import { Pokemons,Detail } from "./interface"
const App:React.FC = ()=> {
  const [pokemons,SetPokemon] = useState<Pokemons[]>([]);
  const [nextUrl,setNextUrl] = useState<string>("");
  const [loadding,setLoadding] = useState<boolean>(true);
  const [viewDetail ,setViewDetail] = useState<Detail>({
    id:'',
    isOpened:false,
  });
  useEffect(()=>{
   const getPokemon = async function() {
     const respone = await axios.get(" https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
     const pokes = respone.data.results
     setNextUrl(respone.data.next);
     pokes.forEach( async(pokemon:Pokemons) =>{
        const poke = await axios.get(` https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        SetPokemon(p=>[...p,poke.data])
        setLoadding(false);       
     })
    }
  

   getPokemon();
  },[] )
  const nextPage = async ()=> {
    setLoadding(true);
     let res =   await axios.get(nextUrl);
     setNextUrl(res.data.next);
     res.data.results.forEach( async (pokemon:Pokemons)=> {
      const poke = await axios.get(` https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      SetPokemon(p=>[...p,poke.data]);
      setLoadding(false);
     })
  }
  return (
     <div className="App">
      <div className="container">
        <header className="pokemon-header">
        pokemon
        </header>
        <PokemonCollection pokemons= {pokemons}
         viewDetail = {viewDetail}
         setViewDetail = {setViewDetail}
        />
      {
        !viewDetail.isOpened?(
          <div className="btn">
          <button onClick={nextPage}> 
          {loadding?'loadding...':'load more'}
          </button>
        </div>
        ):(<div></div>)
      }
      </div>
     </div>
  )
}
export default App