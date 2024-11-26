import {useContext} from "react"
import {Alert, Button, Form, Row, Col, Stack} from "react-bootstrap"
import { AuthContext } from "../context/AuthContext";

const Register = () =>{
    const {user} = useContext(AuthContext)
    const {registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading} = useContext(AuthContext)

    return (
    <>
        <Form onSubmit={registerUser}>
            <Row style={{
                height:"100vh",
                justifyContent:"center",
                paddingTop:"15%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Register</h2>

                        <Form.Control type="text" placeholder="Name" onChange={(e)=>{updateRegisterInfo({...registerInfo , name: e.target.value})}} minLength={3} maxLength={30}/>
                        <Form.Control type="text" placeholder="Username" onChange={(e)=>{updateRegisterInfo({...registerInfo , username: e.target.value})}} minLength={3} maxLength={30}/>
                        <Form.Control type="email" placeholder="Email" onChange={(e)=>{updateRegisterInfo({...registerInfo , email: e.target.value})}} minLength={3} maxLength={100}/>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{updateRegisterInfo({...registerInfo , password: e.target.value})}} minLength={3} maxLength={200}/>
                        <Button variant="primary" type="submit" >
                            {isRegisterLoading ? "Wait...":"Register"}
                        </Button>

                        {
                            registerError?.error && (
                            <Alert variant="danger">
                            <p>{registerError?.message}</p>
                            </Alert>)
                        }
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>
);
}

export default Register;