import './App.css';
import {Routes,Route,Navigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
//Page imports
import Chat from "./pages/Chat"
import Register from "./pages/Register"
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
//Component imports
import {Container} from "react-bootstrap";
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

//Route * means that if a user tries to access a non declared path
//they will be forwarded to //
function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <NavBar/>
      <Container className='text-secondary'>
        <Routes>
          <Route path="/" element={user ? <Chat/>:<Login/>}/>
          <Route path="/register" element={user ? <Chat/>:<Register/>}/>
          <Route path="/forgot" element={<ForgotPassword/>}/>
          <Route path="/login" element={user ? <Chat/>:<Login/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Container>
    </>
    
        
  );
}

export default App;
