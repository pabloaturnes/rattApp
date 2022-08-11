
import {Button, Modal, Text, Input, Row, Checkbox, Loading } from '@nextui-org/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext,handleUserContext } from "./GlobalProvider"
import useData from '../hooks/useData';
import { useState } from 'react';


const LoginModal = ({loginModalCloseHandler,loginModalVisible,registerModalHandler}) =>{

    const [error, setError] = useState({error: false, msj : null})
    const [loader, setLoader] = useState(false)
    const {loggedUser ,handleUserContext} = useGlobalContext()
    const {getUserMeetings} = useData()

    const handleClose = () =>{
        setError({error: false, msj : null})
        setLoader(false)
        loginModalCloseHandler()
    }

 const handleSubmit = async (e) =>{
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get("email").trim()
    const password = formData.get("password").trim()


    if(email == "" || password == ""){
        setError({error: true, msj : "Debes completar todos los campos"})
        return
    }


    setLoader(true)
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        // Signed in
        const user = userCredential.user;
        
        const userMeetings = await getUserMeetings(user.uid)

        const updateLoggedUser = {
            displayName : user.displayName,
            id : user.uid,
            userMeetings : userMeetings,
            actualMeeting: null,
            logged : true,
            offlineData : loggedUser.offlineData 
        }
        setLoader(false)
        //cambio usuario en el contexto
        handleUserContext(updateLoggedUser)
        setError({error: true, msj : null})
        loginModalCloseHandler()
    }catch(error) {
        setLoader(false)
        if(error.code == "auth/user-not-found") setError({error:true, msj:"Usuario no encontrado"}) 
        if(error.code == "auth/wrong-password") setError({error:true, msj:"Contraseña incorrecta"})  
        if(error.code == "auth/too-many-requests") setError({error:true, msj:"La cuenta ha sido bloqueada temporalmente, intenta mas tarde"})   
        
    };
 }



    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={loginModalVisible}
            onClose={handleClose}
            css={{
                '@xs': {
                    width: '80vw'
                }
            }}
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        ¡You must be 
                        Logged in
                        to create/join to a new Meeting!
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        aria-labelledby="email"
                        name="email"
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        aria-labelledby="password"
                        name="password"
                    />
                    <Row justify="space-between">
                        <Checkbox>
                        <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14}>Forgot password?</Text>
                    </Row>
                    <Row justify="space-between">
                        {loader && <Loading size="xs"></Loading> }
                        {error && <Text  color="error" size={14}>{error.msj}</Text> }
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto color="primary" onClick={registerModalHandler}>
                       ¡Create an account!
                    </Button>
                    <Button auto flat color="error" onClick={handleClose}>
                        Close
                    </Button>
                    <Button auto type="submit">
                        Sign in
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default LoginModal












