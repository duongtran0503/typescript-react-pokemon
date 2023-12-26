import React from "react";
import "./pokemon.css"
import { Detail,PokemonDetail} from "../interface";
import PokemonList from "./PokemonList";
import { nanoid } from "nanoid";
interface Props {
   pokemons:PokemonDetail[],
   viewDetail:Detail;
   setViewDetail:React.Dispatch<React.SetStateAction<Detail>>
}
const PokemonCollection:React.FC<Props> = ({pokemons,viewDetail,setViewDetail})=> {
     const selectPokemon = (id:string)=> {
      if(!viewDetail.isOpened) {
        setViewDetail({
            id:id,
            isOpened:true,
           })
      }
     }
    return <div className={viewDetail.isOpened?"collection-container-active ":"collection-container "}>
        {
            viewDetail.isOpened?(
                <div className="overlay"></div>
            ):(
                <div></div>
            )
        }
         {pokemons.map(pokemon => {
            return (
                <div key={nanoid()} onClick={()=>selectPokemon(pokemon.id)}>
                    
                    <PokemonList
                    viewDetail = {viewDetail}
                    setViewDetail = {setViewDetail}
                        key={nanoid()}
                        id = {pokemon.id}
                        name = {pokemon.name}
                        image = {pokemon.sprites.front_default}
                        abilities = {pokemon.abilities}
                    />
                </div>
               
            )
         })}
    </div>
}
export default PokemonCollection;