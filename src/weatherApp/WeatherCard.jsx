import { useSelector } from "react-redux";
import { selectWeatherData } from "../store/WeatherSelectore";
import { motion } from "framer-motion";



export default function WeatherCard() {
  const getData = useSelector(selectWeatherData);

  const getFormattedDate=()=>  {
  const now = new Date();

  const dayName = now.toLocaleDateString(undefined, { weekday: 'long' });
  const time = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Change to true for AM/PM format
  });
 
  return `${dayName}, ${time}`;
} 
 const formatTimeFromTimestamp=(unixTimestamp)=> {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // use true for AM/PM format
  })};



  return (
<>
  {getData.isloaded === true ? (
    <motion.div
    initial={{ opacity: 0, y: -100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="bg-gray-600 bg-opacity-50 text-white p-4 rounded-lg shadow-md w-full md:w-1/2 mx-auto mt-5 mb-10 flex flex-col gap-4">
      {/* Main Weather Info */}
      <div className="flex flex-col items-center gap-4">
        {/* Location and Date */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              {`${getData?.name || 'Unknown'}, ${getData?.sys?.country || ''}`}
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-6 h-6 text-blue-400"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
            </svg>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <p className="text-sm">{getFormattedDate()}</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512" 
              className="w-4 h-4 text-emerald-400"
              fill="currentColor"
            >
              <path d="M256 8C119.03 8 8 119.03 8 256s111.03 248 248 248 248-111.03 248-248S392.97 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm12-212V128c0-6.627-5.373-12-12-12s-12 5.373-12 12v124c0 4.418 2.406 8.465 6.328 10.609l88 48c5.906 3.219 13.281 1.094 16.5-4.812s1.094-13.281-4.812-16.5L268 244z"/>
            </svg>
          </div>
        </div>

        {/* Weather Icon and Temperature */}
        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${getData.weather[0].icon}@2x.png`}
            className="w-35 h-30 mb-2"
            />

          <motion.div
           initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 , delay: 0.2 }}
          className="flex items-center gap-2">
            <p className="text-4xl font-light">
              {Math.round(getData?.main?.temp) || '--'}°C
            </p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 384 512" 
              className="w-8 h-8 text-yellow-400"
              fill="currentColor"
            >
              <path d="M192 384c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32zm0-320c-17.7 0-32 14.3-32 32v220.7c-28.8 20.9-44.4 55.3-40.6 91.2C123.9 466.3 154.5 496 192 496s68.1-29.7 72.6-67.1c3.8-35.9-11.8-70.3-40.6-91.2V96c0-17.7-14.3-32-32-32zm-64 32c0-35.3 28.7-64 64-64s64 28.7 64 64v208.6c37.4 27.6 58.2 73.6 51.4 120.5C299.5 482 250.7 528 192 528s-107.5-46-115.4-103C69.8 409.2 90.6 363.2 128 335.6V96z"/>
            </svg>
          </motion.div>
          <motion.p
           initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 , delay: 0.2 }}
           className="capitalize">{getData?.weather?.[0]?.description || ''}</motion.p>
        </div>
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Temperature Metrics */}
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 , delay: 0.5 }}
        className="bg-gray-700 p-3 rounded-lg">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-gray-300">Avg</p>
              <p className="font-medium">{Math.round(getData?.main?.temp) || '--'}°C</p>
            </div>
            <div>
              <p className="text-xs text-gray-300">Max</p>
              <p className="font-medium">{Math.round(getData?.main?.temp_max) || '--'}°C</p>
            </div>
            <div>
              <p className="text-xs text-gray-300">Min</p>
              <p className="font-medium">{Math.round(getData?.main?.temp_min) || '--'}°C</p>
            </div>
          </div>
        </motion.div>

        {/* Humidity */}
        <motion.div  initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 , delay: 0.5 }}
         className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm">Humidity</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-blue-400"
              fill="currentColor"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>
            </svg>
          </div>
          <p className="font-medium">{getData?.main?.humidity || '--'}%</p>
        </motion.div>

        {/* Wind Speed */}
        <motion.div 
         initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 , delay: 0.5 }}
        className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm">Wind</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-gray-300"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
            </svg>
          </div>
          <p className="font-medium">{getData?.wind?.speed || '--'} km/h</p>
        </motion.div>

        {/* Pressure */}
        <motion.div 
         initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 , delay: 0.5 }}
        className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm">Pressure</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-gray-300"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/>
              <path d="M12 9v6"/>
              <path d="M6 12h12"/>
            </svg>
          </div>
          <p className="font-medium">{getData?.main?.pressure || '--'} hPa</p>
        </motion.div>
      </div>

      {/* Additional Weather Data */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sea Level & Ground Level */}
        <motion.div
         initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 , delay: 0.5 }}
        className="bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <p className="text-xs">Sea Level</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#7dd3fc" 
                  strokeWidth="2"
                >
                  <path d="M2 16s6-4 10-4 10 4 10 4" />
                  <path d="M2 20s6-4 10-4 10 4 10 4" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <p className="font-medium">{getData?.main?.sea_level || '--'} hPa</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <p className="text-xs">Ground</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#86efac" 
                  strokeWidth="2"
                >
                  <path d="M2 18h20" />
                  <circle cx="6" cy="12" r="1" />
                  <circle cx="12" cy="10" r="1" />
                  <circle cx="18" cy="12" r="1" />
                </svg>
              </div>
              <p className="font-medium">{getData?.main?.grnd_level || '--'} hPa</p>
            </div>
          </div>
        </motion.div>

        {/* Sunrise & Sunset */}
        <motion.div
         initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 , delay: 0.5 }}
        className="bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <p className="text-xs">Sunrise</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                >
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="2" x2="12" y2="9" />
                  <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                  <line x1="1" y1="18" x2="3" y2="18" />
                  <line x1="21" y1="18" x2="23" y2="18" />
                  <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                  <line x1="23" y1="22" x2="1" y2="22" />
                </svg>
              </div>
              <p className="font-medium">
                {getData?.sys?.sunrise ? formatTimeFromTimestamp(getData.sys.sunrise) : '--:--'}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <p className="text-xs">Sunset</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2"
                >
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="9" x2="12" y2="2" />
                  <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                  <line x1="1" y1="18" x2="3" y2="18" />
                  <line x1="21" y1="18" x2="23" y2="18" />
                  <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                  <line x1="23" y1="22" x2="1" y2="22" />
                </svg>
              </div>
              <p className="font-medium">
                {getData?.sys?.sunset ? formatTimeFromTimestamp(getData.sys.sunset) : '--:--'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  ) : (
    <div className="bg-gray-600 bg-opacity-50 text-white p-4 rounded-lg shadow-md w-full md:w-1/2 mx-auto mt-5 mb-10 flex flex-col items-center justify-center min-h-[200px]">
      <p className="text-center">Please search for a city to get weather information</p>
    </div>
  )}
</>
  );
}