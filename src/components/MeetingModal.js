
import {Button, Modal, Text, Input} from '@nextui-org/react';
import { useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import useData from '../hooks/useData';
import { useGlobalContext } from './GlobalProvider';




const MeetingModal = ({meetingModalCloseHandler,meetingModalVisible}) =>{


    const {createMeeting,getUserMeetings} = useData()
    const {loggedUser,handleUserContext} = useGlobalContext()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get("name")

        let storage = window.localStorage
        const localStorageData = JSON.parse(storage.getItem("loggedUser"))
        

        const newMeetingData = {
            name : name,
            id : localStorageData.id
        }

        await createMeeting(newMeetingData)



        //pedir todas las reuniones del usuario nuevamente
       const updatedUserMeetings = await getUserMeetings(loggedUser.id)

       //actualizo la variable de estado
       let updatedLoggedUser = Object.assign({},loggedUser)
       updatedLoggedUser.userMeetings = updatedUserMeetings
       handleUserContext(updatedLoggedUser)

        meetingModalCloseHandler()


    }


    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={meetingModalVisible}
            onClose={meetingModalCloseHandler}
            css={{
                '@xs': {
                    width: '80vw'
                }
            }}
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                       ¡Create a new meeting!
                    </Text>
                </Modal.Header>
                <Modal.Body>
                <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Meeting Name"
                        aria-labelledby="Meeting Name"
                        name="name"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={meetingModalCloseHandler}>
                        Close
                    </Button>
                    <Button auto type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default MeetingModal






