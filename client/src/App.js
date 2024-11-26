import './App.css';
import {Routes,Route,Navigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
//Page imports
import Room from "./pages/Room"
import Register from "./pages/Register"
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
//Component imports
import {Container} from "react-bootstrap";
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { RoomContextProvider } from './context/RoomContext';

//Route * means that if a user tries to access a non declared path
//they will be forwarded to //
function App() {
  const { user } = useContext(AuthContext)
  return (
    <RoomContextProvider user ={user}>
      <NavBar/>
      <Container className='text-secondary'>
        <Routes>
          <Route path="/" element={user ? <Room/>:<Login/>}/>
          <Route path="/register" element={user ? <Room/>:<Register/>}/>
          <Route path="/forgot" element={<ForgotPassword/>}/>
          <Route path="/login" element={user ? <Room/>:<Login/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Container>
    </RoomContextProvider>
    
        
  );
}

export default App;
