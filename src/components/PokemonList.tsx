import React, {useEffect, useState} from "react";
import { Detail } from "../interface";
import "./pokemon.css"
import { nanoid } from "nanoid";
interface Props {
    name:string,
    id:string,
    image:string,
    abilities:{
        name:string;
        abilities:string;
    }[]|undefined;
    viewDetail:Detail;
    setViewDetail:React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonList:React.FC<Props> = (prop)=> {
     const {id,name,image,abilities,viewDetail,setViewDetail} = prop;
     const [selected,setSelected] = useState<boolean>(false);
     useEffect(()=>{
        setSelected(id===viewDetail?.id)
     },[viewDetail])
     const closeDetail = ()=> {
       setViewDetail({
        id:"",
        isOpened:false,
       })
     }
    return  <div className="">
    {selected ? (
      <section className="pokemon-list-detailed">
        <div className="detail-container">
          <p className="detail-close" onClick={closeDetail}>
            X
          </p>
          <div className="detail-info">
            <img src={image} alt="pokemon" className="detail-img" />
            <p className="detail-name"> {name}</p>
          </div>
          <div className="detail-skill">
            <p className="detail-ability"> Ablities: </p>
            {abilities?.map((ab: any) => {
              return <div className=""> {ab.ability.name}</div>;
            })}
          </div>
        </div>
      </section>
    ) : (
      <section className="pokemon-list-container">
        <p className="pokemon-name"> {name} </p>
        <img src={image} alt="pokemon" />
      </section>
    )}
  </div>
}
export default PokemonList