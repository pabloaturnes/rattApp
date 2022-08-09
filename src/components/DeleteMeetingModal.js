
import {Button, Modal, Text, Input } from '@nextui-org/react';
import useData from '../hooks/useData';
import { useGlobalContext } from './GlobalProvider';



const DeleteMeetingModal = ({deleteMeetingModalCloseHandler,deleteMeetingModalVisible}) =>{

    const {deleteThisUserFromMeeting} = useData()

    const {loggedUser,handleUserContext} = useGlobalContext()

    
    const handleDelete = () =>{

        //actualizar en local y actualizar el contexto
        let updatedUser = Object.assign({},loggedUser)
        //elimino la meeting del array de userMeetings del estado global
        let updatedUserMeetings =  updatedUser.userMeetings.filter((meeting)=> meeting.id != deleteMeetingModalVisible.meetingId)
        updatedUser.userMeetings = updatedUserMeetings
        // consulto si la meeting actual es igual a la borrada. si es igual la limpio, si no, la dejo.
        if(updatedUser.actualMeeting.id == deleteMeetingModalVisible.meetingId){ 
            updatedUser.actualMeeting = null
        } 
        handleUserContext(updatedUser)

        //actualizar la reunion en la nube y borrar el usuario
        deleteThisUserFromMeeting(loggedUser.id,deleteMeetingModalVisible.meetingId)

        deleteMeetingModalCloseHandler()

    }


    

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={deleteMeetingModalVisible.visible}
            onClose={deleteMeetingModalCloseHandler}
            css={{
                '@xs': {
                    width: '80vw'
                }
            }}
        >
            
                <Modal.Header>
                    <Text id="modal-title" h3 size={18}>
                        {deleteMeetingModalVisible.owner == loggedUser.id && "Your are the owner of this meeting. ¿Are you sure you want to delete this meeting for all users?"}
                        {deleteMeetingModalVisible.owner != loggedUser.id && "¿Are you sure you want to delete this meeting of your list?"}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text id="modal-title" h4 size={18} align="center">
                        {deleteMeetingModalVisible.name}
                    </Text> 
                    <Text id="modal-title" h4 size={18} align="center">
                        {"id: "+deleteMeetingModalVisible.meetingId}
                    </Text> 
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={deleteMeetingModalCloseHandler}>
                        Cancel
                    </Button>
                    <Button auto onClick={handleDelete} >
                        Delete
                    </Button>
                </Modal.Footer>
            
        </Modal>
    )
}

export default DeleteMeetingModal







