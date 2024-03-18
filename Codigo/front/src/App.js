import './App.css';
import Login from './Pages/Login/Login';
import ClientForm from './componentes/ClientForm';
import Menu from './Pages/Menu/Menu'

function App() {
  return (
    <div className="App">
      <Login/>
      <ClientForm/>
      <Menu/>
    </div>
  );
}

export default App;
