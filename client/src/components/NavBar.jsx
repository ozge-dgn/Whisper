import React, { useContext } from 'react'
import { Container,Nav,Navbar,Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext)
  return (
    <Navbar 
    bg="light" 
    className='mb-4' 
    style={{height:"3.75rem"}}
    >
        <Container>
            <h2>
                <Link to="/" className='link-dark text-decoration-none'>Whisper</Link>
            </h2>
            {user && (<span>Logged in as {user?.username}</span>)}
            <Nav>
                <Stack direction="horizontal" gap={3}>
                    {
                        user && (
                        <>
                            <Link to="/login" onClick={()=>{logoutUser()}} className='link-dark text-decoration-none'>Logout</Link>
                        </>)
                    }
                    {
                        !user && (
                            <>
                            <Link to="/login" className='link-dark text-decoration-none'>Login</Link>
                            <Link to="/register" className='link-dark text-decoration-none'>Register</Link>
                            </>
                        )
                    }
                    
                </Stack>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar
