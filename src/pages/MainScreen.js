import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MainScreen = () => {
    const  { city } = useParams();
    const [weatherData, setWeatherData] = useState(null)
    const [isFavorite, setFavorite] = useState(false)
}
 useEffect(() => {
    fetchData(city);
 },[city]);

 const fetchData = async (city) => {

 };

 const handleFavoriteToggle = () => {
    setIsFavoriteToggle((prev) => !prev);
 };

 return (
    <div>
        
    </div>
 )
 

