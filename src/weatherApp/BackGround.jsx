import image from '../assets/images/Bg.jpg';
import { store } from '../store';
import Searche from './Searche';
import WeatherCard from './WeatherCard';
import { Provider } from 'react-redux';

export default function BackGround() {
  const weatherData = {
    city: "New York",
    temperature: 22,
    condition: "Sunny",
    humidity: 50,
    windSpeed: 10
  };

  return (
    <div className="relative w-full min-h-screen">
      <Provider store={store}>
      {/* Background Image (fixed to avoid re-rendering on scroll) */}
      <img 
        src={image} 
        alt="Weather App Background" 
        className="fixed inset-0 w-full h-full object-cover opacity-95 -z-10" 
      />
      
      {/* Content Container (with scrollable weather card) */}
      <div className="relative z-10 p-4">
        {/* Fixed Search Bar */}
 
          <Searche />
  

        {/* Scrollable Weather Card (with top padding to avoid search bar overlap) */}
        <div className=""> {/* Adjust padding to match your search bar height */}
          <WeatherCard weatherData={weatherData} />
        </div>
      </div>
      </Provider>
    </div>
  );
}