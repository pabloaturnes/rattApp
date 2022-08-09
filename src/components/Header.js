import {Row, Col, Image, Dropdown } from '@nextui-org/react';
import logo from "../images/logo512.png"
import { useGlobalContext } from './GlobalProvider';
import UserOptionsModal from './UserOptionsModal';
import { useState } from 'react';
import LogoutModal from './LogoutModal';


const Header = () =>{

  const {handleUserContext} = useGlobalContext()
  const defaultUser = {
    displayName : null,
    id : null,
    userMeetings : [],
    actualMeeting: null,
    logged : false,
    offlineData : [] 
}

const [userOptionsModalVisible, setUserOptionsModalVisible] = useState(false)
const userOptionsModalHandler = () => setUserOptionsModalVisible(true);
const userOptionsModalCloseHandler = () => setUserOptionsModalVisible(false);

const [logoutModalVisible, setLogoutModalVisible] = useState(false)
const logoutModalHandler = () => setLogoutModalVisible(true);
const logoutModalCloseHandler = () => setLogoutModalVisible(false);

  const handleActions = (key) =>{
    
    if(key == "logout"){
      logoutModalHandler()
    }

    if(key == "profile"){
      userOptionsModalHandler()
    }

  }

  const handleLogout = () =>{
    let storage = window.localStorage
    storage.removeItem("loggedUser")
    handleUserContext(defaultUser)
    logoutModalCloseHandler()
  }

 

  return (
    <Row justify="center" align="center" css={{height: "12vh"}}  >
        <Col >
            <Image src={logo} height={40} width={40} containerCss={{display : "inline-block"}} />
        </Col>

        <Col  justify="center">
            <Dropdown >
              <Dropdown.Button flat css={{color : "white", backgroundColor : "#7828C8", marginLeft: "auto"}}>
                <i className="bi bi-gear-fill"></i>
              </Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions" onAction={(key)=>handleActions(key)} >
                  <Dropdown.Item key="profile" icon={<i className="bi bi-person-circle"></i>}>Profile</Dropdown.Item>
                  <Dropdown.Item key="logout" icon={<i className="bi bi-door-open-fill"></i>} >Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Col>
        <UserOptionsModal userOptionsModalVisible={userOptionsModalVisible} userOptionsModalCloseHandler={userOptionsModalCloseHandler}  />
        <LogoutModal logoutModalVisible={logoutModalVisible} handleLogout={handleLogout} logoutModalCloseHandler={logoutModalCloseHandler} />
    </Row>
  );
}

export default Header;
