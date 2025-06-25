
import { store } from './store';
import BackGround from './weatherApp/BackGround';
import Searche from './weatherApp/Searche';
import WeatherCard from './weatherApp/WeatherCard';
import { Provider } from 'react-redux';

function App() {


  return (
    <>
      <Provider store={store}>
        <BackGround />
      </Provider>
    </>
  )
}

export default App
