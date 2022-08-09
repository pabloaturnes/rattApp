import {Grid,Button,Dropdown, Modal, Text, Input, Row, Checkbox } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import JoinModal from './JoinModal';
import RegisterModal from './RegisterModal';
import MeetingModal from './MeetingModal';
import DeleteMeetingModal from './DeleteMeetingModal';
import { useGlobalContext } from "./GlobalProvider"


const Menu = () =>{

    const {loggedUser,handleUserContext} = useGlobalContext()

    const handleSelectMeeting = (key) =>{

        if(key){
            let storage = window.localStorage
            let loggedUser = JSON.parse(storage.getItem("loggedUser"))
            
            let selectedMeeting = loggedUser.userMeetings.filter(meeting => meeting.id == key)
            selectedMeeting = selectedMeeting[0]
    
            let updateSelectedUser = Object.assign({},loggedUser)
            updateSelectedUser.actualMeeting = selectedMeeting
            
            handleUserContext(updateSelectedUser)
        }


    }

    const deleteMeetingHandler = (e) =>{
       const id = e.target.id

       //aca podrias filtrar y mandar mas informacion al modal. modificando el estado de aca abajo
       let meetingToDelete = loggedUser.userMeetings.filter(meeting => meeting.id == id)
       console.log(meetingToDelete[0])

       deleteMeetingModalHandler(id,meetingToDelete[0].owner,meetingToDelete[0].name)
    }

    const [deleteMeetingModalVisible, setDeleteMeetingModalVisible] = useState({visible: false, meetingId : null});
    const deleteMeetingModalHandler = (id,owner,name) => setDeleteMeetingModalVisible({visible: true, meetingId: id, owner: owner, name: name});
    const deleteMeetingModalCloseHandler = () => setDeleteMeetingModalVisible({visible: false, meetingId : null});



    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const loginModalHandler = () => setLoginModalVisible(true);
    const loginModalCloseHandler = () => setLoginModalVisible(false);

    const [meetingModalVisible, setMeetingModalVisible] = useState(false)
    const meetingModalHandler = () => setMeetingModalVisible(true);
    const meetingModalCloseHandler = () => setMeetingModalVisible(false);

    const newMeetingHandler = () =>{
        let storage = window.localStorage
        const localStorageData = JSON.parse(storage.getItem("loggedUser"))
        localStorageData.logged? meetingModalHandler() :  loginModalHandler();
    }

    const joinMeetingHandler = () =>{
        let storage = window.localStorage
        const localStorageData = JSON.parse(storage.getItem("loggedUser"))
        localStorageData.logged? joinModalHandler() :  loginModalHandler();
    }

    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const joinModalHandler = () => setJoinModalVisible(true);
    const joinModalCloseHandler = () => setJoinModalVisible(false);

    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const registerModalHandler = () =>{
        setLoginModalVisible(false)
        setRegisterModalVisible(true)
    } 
    const registerModalCloseHandler = () => setRegisterModalVisible(false);

    return (
        <Grid.Container direction="vertical" justify='center'>
            <Grid xs={0} sm={12} justify="center">
                <Button.Group color="secondary" >
                    <Button icon={<i className="bi bi-door-open"></i>} onClick={joinMeetingHandler}>Join Meeting</Button>
                    <Button icon={<i className="bi bi-plus-circle"></i>} onClick={newMeetingHandler}>  New Meeting</Button>
                    <JoinModal joinModalCloseHandler={joinModalCloseHandler} joinModalVisible={joinModalVisible}/>
                    <MeetingModal meetingModalCloseHandler={meetingModalCloseHandler} meetingModalVisible={meetingModalVisible} />
                    <LoginModal loginModalCloseHandler={loginModalCloseHandler} loginModalVisible={loginModalVisible} registerModalHandler={registerModalHandler}/>
                    <Dropdown>
                        <Dropdown.Button flat css={{color : "white", backgroundColor : "#7828C8"}}>
                            My Meetings
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions" onAction={(key)=>handleSelectMeeting(key)}>
                            {/*mira como hiciste en el componente MENU para hacerlo dinamico */}
                            {loggedUser.logged && loggedUser.userMeetings.map((meeting)=>{ return <Dropdown.Item key={meeting.id} command={<i className="bi bi-trash-fill"  id={meeting.id} onClick={(e)=>deleteMeetingHandler(e)}></i>} >{meeting.name}</Dropdown.Item>}) }
                            {loggedUser.userMeetings.length == 0 &&<Dropdown.Item key="nullBig">No meetings avalible</Dropdown.Item> }
      
                        </Dropdown.Menu>
                    </Dropdown>
                </Button.Group>
            </Grid>
            <Grid xs={6} sm={0} justify="center" direction="column">
                <Button.Group color="secondary" vertical  >
                <Button icon={<i className="bi bi-door-open"></i>} onClick={joinMeetingHandler}>Join Meeting</Button>
                    <Button icon={<i className="bi bi-plus-circle"></i>} onClick={newMeetingHandler}>  New Meeting</Button>
                    <JoinModal joinModalCloseHandler={joinModalCloseHandler} joinModalVisible={joinModalVisible}/>
                    <MeetingModal meetingModalCloseHandler={meetingModalCloseHandler} meetingModalVisible={meetingModalVisible} />
                    <LoginModal loginModalCloseHandler={loginModalCloseHandler} loginModalVisible={loginModalVisible} registerModalHandler={registerModalHandler}/>
                    <Dropdown>
                        <Dropdown.Button flat css={{color : "white", backgroundColor : "#7828C8"}}>
                            My Meetings
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions" onAction={(key)=>handleSelectMeeting(key)}>
                            {/*mira como hiciste en el componente MENU para hacerlo dinamico */}
                            {loggedUser.logged && loggedUser.userMeetings.map((meeting)=>{ return <Dropdown.Item key={meeting.id} command={<i className="bi bi-trash-fill"  id={meeting.id} onClick={(e)=>deleteMeetingHandler(e)}></i>} >{meeting.name}</Dropdown.Item>}) }
                            {!loggedUser.logged || loggedUser.userMeetings == null || loggedUser.userMeetings.length == 0 &&<Dropdown.Item key="nullSmall">No meetings avalible</Dropdown.Item> }
      
                        </Dropdown.Menu>
                    </Dropdown>
                </Button.Group>
            </Grid>
            <RegisterModal registerModalCloseHandler={registerModalCloseHandler} registerModalVisible={registerModalVisible}/>
            <DeleteMeetingModal  deleteMeetingModalCloseHandler={deleteMeetingModalCloseHandler} deleteMeetingModalVisible={deleteMeetingModalVisible} />           
        </Grid.Container>
    )
}

export default Menu
