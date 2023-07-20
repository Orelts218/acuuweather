import React, { useEffect, useState } from 'react'
import { getCities, getFiveDaysForecast, getTelAvivForecast } from '../apis/accuweather';
import styles from "./Home.module.css"
import { useParams } from 'react-router-dom';

export default function Home() {
    const [userInput, setUserInput] = useState();
    const [forecasts, setForecasts]= useState([]);
    const [locationName, setLocationName] = useState("");
    const [iconPhrase, setIconPhrase] = useState("");
    const [locationKey, setLocationKey] = useState("");
    const [favorite, setFavorite] = useState(false);

    const params = useParams()

    const searchForecast = async(locationKey) => {
        try {
            const response =  await getFiveDaysForecast(locationKey);
            
            if(response.data.DailyForecasts){
                const dailyForecasts = response.data.DailyForecasts;
            
                setForecasts(() => {
                    return setDaysTemperature(dailyForecasts)
                })
            }
        } catch (error) {
            alert("Failed to find five days forecast")
        }
        
    }

    const setDaysTemperature = (dailyForecasts) => {
        let updatedForecasts = [];
                setIconPhrase(dailyForecasts[0].Day?.IconPhrase)
                for(let i = 0; i<dailyForecasts.length; i++){
                    const day = new Date(dailyForecasts[i].Date).getDay();
                    const translatedDay = translateDay(day);
                    const temperatureF = dailyForecasts[i].Temperature.Minimum.Value;
                    const temperatureC = (temperatureF - 32) * 5/9;
                    updatedForecasts.push({day: translatedDay, temperature: Math.round(temperatureC * 10) / 10});
                }
                return updatedForecasts;
    }

    const getTelAviv =async() =>{
        try {
            const response = await getTelAvivForecast();
            if(response.data.DailyForecasts){
                setForecasts(() => {
                    return setDaysTemperature(response.data.DailyForecasts)
                })
            }
            
        } catch (error) {
            alert("Failed to fetch tel aviv forecast")
        }
    }

    const translateDay = (day) => {
        switch(day){
            case 0:
                return 'Sun';
            case 1:
                return 'Mon';
            case 2:
                return 'Tue';
            case 3:
                return 'Wed';
            case 4:
                return 'Tur';
            case 5:
                return 'Fri';
            case 6:
                return 'Sat';
            default: return;
        }
    }

    const searchCity = async() => {
        try{
            const response = await getCities(userInput);
            if(response.data.length > 0){
                const locationKey = response.data[0].Key
               await searchForecast(locationKey)
               setLocationName(response.data[0].LocalizedName)
                 setLocationKey(response.data[0].Key)
                setFavorite(checkIfFavorite());
            }
        }catch(err){
            alert("Failed to find city")
        }
        
    }

    useEffect(()=>{
        if(userInput)
        searchCity();
    },[userInput])


    useEffect(()=>{
        
       if(params.id){
        const parsedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if(parsedFavorites){
            const city = parsedFavorites.find((h) => h.id == params.id);
            searchForecast(params.id);
            setLocationName(city.name)
            setLocationKey(params.id)
        }
                
       }else{
        getTelAviv()
        setLocationName('Tel Aviv')
        setLocationKey(215854)
       }
       setFavorite(checkIfFavorite());
    },[])

    const addToFavorite = () => {
        const favorites = localStorage.getItem('favorites');
        if(favorites){
            const convertedFavorites = JSON.parse(favorites);
            convertedFavorites.push({id: locationKey, name: locationName, temeperature:forecasts[0].temperature})
            localStorage.setItem('favorites', JSON.stringify(convertedFavorites));
        }else{
            localStorage.setItem('favorites', JSON.stringify([{id: locationKey, name: locationName, temeperature:forecasts[0].temperature}]));
        }
        setFavorite(true)
    }

    const checkIfFavorite = () => {
        const favorites = localStorage.getItem('favorites');
        
        if(favorites && locationName){
            const parsedFavorites = JSON.parse(favorites)
            
            for (let i = 0; i < parsedFavorites.length; i++) {
                if(parsedFavorites[i].name.toLowerCase() == locationName.toLowerCase()) return true;
                
            }

        }
        return false;
    }

    const removeFromFavorite = () => {
        const favorites = localStorage.getItem('favorites');
        
        if(favorites){
            const parsedFavorites = JSON.parse(favorites)
            console.log(parsedFavorites, "###")
            const favoriteIndex = parsedFavorites.findIndex(f => f.name.toLowerCase() == locationName.toLowerCase());
            if(favoriteIndex >= 0){
                parsedFavorites.splice(favoriteIndex, 1);
                setFavorite(false)
            }
            localStorage.setItem('favorites', JSON.stringify(parsedFavorites));
        }
    }

  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
        <div>
        <input placeholder='Search city' value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        {favorite ? 
        <button onClick={removeFromFavorite}>Remove from Favorites</button> 
        :
        <button onClick={addToFavorite}>Add To Favorites</button>
        }
        </div>
        {forecasts.length > 0 && 
        <>
        <div style={{display:'flex', flexDirection:'column'}}>
            <span>{locationName}</span>
            <span>{forecasts[0].temperature}</span>
        </div>
        
        <div>
            <h3 style={{textAlign:'center'}}>{iconPhrase}</h3>
            <div className={styles.dayContainer}>
            { forecasts.map((f) =>
             <div className={styles.day}>
                <span>{f.day}</span>
                <span>{f.temperature}C</span>
            </div>)}
            </div>
        </div>
        </>
            }
    </div>
  )
}
