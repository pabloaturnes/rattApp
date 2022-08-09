
import {Button, Modal, Text, Input, Row, Checkbox, Loading } from '@nextui-org/react';
import { useState } from 'react';
import useData from '../hooks/useData';
import { useGlobalContext } from './GlobalProvider';



const JoinModal = ({joinModalCloseHandler,joinModalVisible}) =>{

    const {addThisUserToAMeeting,getUserMeetings} = useData()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {loggedUser,handleUserContext} = useGlobalContext()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.target)
        const newMeetingId =  formData.get("meetingId")

        //actualizar la reunion en la nube
       const result = await addThisUserToAMeeting(loggedUser.id,newMeetingId)

       if(result){

        //pedir todas las reuniones del usuario nuevamente
        const updatedUserMeetings = await getUserMeetings(loggedUser.id)

        //actualizo la variable de estado
        let updatedLoggedUser = Object.assign({},loggedUser)
        updatedLoggedUser.userMeetings = updatedUserMeetings
        handleUserContext(updatedLoggedUser)
        setLoading(false)
        setError(false)
        joinModalCloseHandler()

       }else{
        setLoading(false)
        setError(true)

       }

    }

    const handleClose = () =>{
        setError(false)
        joinModalCloseHandler()

    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={joinModalVisible}
            onClose={handleClose}
            css={{
                '@xs': {
                    width: '80vw'
                }
            }}
        >
            <form onSubmit={(e)=>handleSubmit(e)}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        ¡Enter your meeting id!
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Meeting Id"
                        aria-labelledby="Meeting"
                        name="meetingId"
                    />
                    {error &&
                    
                        <Text id="modal-title" size={18} color="error">
                            {"Error: Meeting not found"}
                        </Text>

                    }
                    
                </Modal.Body>
                <Modal.Footer>

                    {loading  && <Loading  size="md" color="warning">Loading</Loading>}

                    <Button auto flat color="error" onClick={handleClose}>
                        Close
                    </Button>
                    <Button auto type="submit">
                        Join!
                    </Button>
                </Modal.Footer>
            </form>
            
        </Modal>
    )
}

export default JoinModal







