import {Grid,Button,Dropdown, Modal, Text, Input, Row, Checkbox } from '@nextui-org/react';
import { useState } from 'react';
import LoginModal from './LoginModal';
import JoinModal from './JoinModal';

const Menu = () =>{
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const loginModalHandler = () => setLoginModalVisible(true);
    const loginModalCloseHandler = () => setLoginModalVisible(false);

    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const joinModalHandler = () => setJoinModalVisible(true);
    const joinModalCloseHandler = () => setJoinModalVisible(false);

    return (
        <Grid.Container direction="vertical" justify='center'>
            <Grid xs={0} sm={12} justify="center">
                <Button.Group color="secondary" >
                    <Button icon={<i className="bi bi-door-open"></i>} onClick={joinModalHandler}>Join Meeting</Button>
                    <JoinModal joinModalCloseHandler={joinModalCloseHandler} joinModalVisible={joinModalVisible}/>
                    <Button icon={<i className="bi bi-plus-circle"></i>} onClick={loginModalHandler}>  New Meeting</Button>
                    <LoginModal loginModalCloseHandler={loginModalCloseHandler} loginModalVisible={loginModalVisible}/>
                    <Dropdown>
                        <Dropdown.Button flat css={{color : "white", backgroundColor : "#7828C8"}}>
                            My Meetings
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions">
                            <Dropdown.Item key="new">AJ35KSIDO</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Button.Group>
            </Grid>
            <Grid xs={6} sm={0} justify="center" direction="column">
                <Button.Group color="secondary" vertical  >
                <Button icon={<i className="bi bi-door-open"></i>} onClick={joinModalHandler}>Join Meeting</Button>
                    <JoinModal joinModalCloseHandler={joinModalCloseHandler} joinModalVisible={joinModalVisible}/> 
                    <Button icon={<i className="bi bi-plus-circle"></i>} onClick={loginModalHandler}>  New Meeting</Button>
                    <LoginModal loginModalCloseHandler={loginModalCloseHandler} loginModalVisible={loginModalVisible}/>
                    <Dropdown>
                        <Dropdown.Button flat css={{color : "white", backgroundColor : "#7828C8"}}>
                            My Meetings
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions">
                            <Dropdown.Item key="new">AJ35KSIDO</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Button.Group>
            </Grid>           
        </Grid.Container>
    )
}

export default Menu
