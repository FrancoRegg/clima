import './App.css';
import { Ubicacion } from './components/ubicacion';
import { Clima } from './components/clima';
const App = () => {
  
  return (
    <div className="App">
      <h1>Aca empieza la APP del clima</h1>
      <Ubicacion /> 
      <h2>Pruebas de la API Climatica</h2>
      <Clima />
    </div>
  );
}

export default App;
