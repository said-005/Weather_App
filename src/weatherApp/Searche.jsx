import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setData, setIsLoaded } from '../store/features/WeatherSlice';
export default function Searche() {

  const [searchData, setSearchData] = useState([]);
  const [geoLocation,setgeoLocation]=useState(undefined);
  const [affiche, setAffiche] = useState(true);
  
  const dispatch = useDispatch();

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setgeoLocation({ lat: latitude, lon: longitude });
      }
    )
}
useEffect(()=>{
 

    getGeoLocation();}
,[])

 
  navigator.permissions.query({ name: 'geolocation' }).then((result) => {
  if (result.state === 'granted') {
   setAffiche(true);

  } else if (result.state === 'prompt') {
  setAffiche(false);
  } else if (result.state === 'denied') {
    setAffiche(false);
  }
});

  

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    const api_Key = import.meta.env.VITE_GEO_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&type=city&format=json&apiKey=${api_Key}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          setSearchData([]);
          return;
        }
        setSearchData(
          data.results.map((item) => {
            const { lat, lon, city, country } = item;
            return { lat, lon, city, country };
          })
        );
      })
      .catch((error) => {
        console.error('Error fetching city data:', error);
      });
  };
const fetchData=()=>{
if (!geoLocation) return;
    const API_KEY = import.meta.env.VITE_Api_ey_weather;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=metric&lon=${geoLocation.lon}&appid=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
      
        const {clouds,main,sys,weather,wind,name}=data
        dispatch(setData({clouds,main,sys,weather,wind,name,}));

      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
}
useEffect(() => {
  fetchData()
}, [geoLocation]);
  const handelSelect = (event, value) => {

    if (value!==null) {
    const { lat, lon } = value;
    setgeoLocation({ lat, lon });
   
    }
    else{
      dispatch(setIsLoaded(false));
     
    }
    
  };
  

  return (
    <div className="flex justify-center items-center w-full max-w-xl mx-auto">
      <Autocomplete
        onChange={handelSelect}
        options={searchData}
        getOptionLabel={(option) => `${option.city}, ${option.country}`}
        clearOnBlur={false}
        className="grow rounded outline-none text-black bg-gray-200 bg-opacity-50"
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleSearch}
            label="Search a city"
            variant="outlined"
          />
        )}
      />
      {affiche &&(
        <button 
        onClick={getGeoLocation}
        className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
           <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-6 h-6 text-blue-400"
              fill="currentColor"
            >
              <path className='bg-blue-300' d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
            </svg>
      </button>
      )}
      
    </div>
  );
}
