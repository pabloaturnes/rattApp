
import {Button, Modal, Text, Input, Row, Checkbox } from '@nextui-org/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext,handleUserContext } from "./GlobalProvider"
import useData from '../hooks/useData';


const LoginModal = ({loginModalCloseHandler,loginModalVisible,registerModalHandler}) =>{


    const {loggedUser ,handleUserContext} = useGlobalContext()
    const {getUserMeetings} = useData()

 const handleSubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")

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
        
        //cambio usuario en el contexto
        handleUserContext(updateLoggedUser)
        loginModalCloseHandler()
    }catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
    };
 }



    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={loginModalVisible}
            onClose={loginModalCloseHandler}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button auto color="primary" onClick={registerModalHandler}>
                       ¡Create an account!
                    </Button>
                    <Button auto flat color="error" onClick={loginModalCloseHandler}>
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












