import axios from 'axios';

const APIKEY = 'AYYSWB9boZRFaa5WASIqPKoiqhIOlviz';

export const getCities = (value)=>{
    return axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
    {params:{apikey:APIKEY, q:value}}
    )
}

export const getFiveDaysForecast = (locationKey)=>{
    return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,
    {params:{apikey:APIKEY}}
    )
}
export const getTelAvivForecast = ()=>{
    return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854`,
    {params:{apikey:APIKEY}}
    )
}



