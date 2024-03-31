import './App.css';
import Login from './Pages/Login/Login';
import ClientForm from './componentes/ClientForm';
import Menu from './Pages/Menu/Menu'
import Dadosmestres from './Pages/MasterData/Dadosmestres';

function App() {
  return (
    <div className="App">
      <Login/>
      <ClientForm/>
      <Menu/>
      <Dadosmestres/>
    </div>
  );
}

export default App;
