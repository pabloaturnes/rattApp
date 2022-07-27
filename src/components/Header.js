import {Row, Col, Image, Dropdown } from '@nextui-org/react';
import logo from "../images/logo512.png"



const Header = () =>{
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
              <Dropdown.Menu aria-label="Static Actions">
                  <Dropdown.Item key="profile" icon={<i className="bi bi-person-circle"></i>}>Profile</Dropdown.Item>
                  <Dropdown.Item key="logout" icon={<i className="bi bi-door-open-fill"></i>}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Col>
    </Row>
  );
}

export default Header;
