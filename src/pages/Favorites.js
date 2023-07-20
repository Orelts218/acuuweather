import React, { useEffect, useState } from 'react'
import styles from "./Favorites.module.css"
import { useNavigate } from 'react-router-dom'
export default function Favorites() {
    const [favorite, setFavorite] = useState([])
    
    const navigate = useNavigate();
    useEffect(()=>{
        const savedFavorites= localStorage.getItem("favorites");
        if(savedFavorites){
            const parsedFavorites = JSON.parse(savedFavorites);
            setFavorite(parsedFavorites);
        }
    },[])
  return (
    <div className={styles.dayContainer}>
        {favorite.length > 0 && favorite.map((f) => <div className={styles.day} onClick={() => navigate('/home/' + f.id)}>
            <span>{f.name}</span>
            <span>{f.temeperature}</span>
        </div>)}
    </div>
  )
}
