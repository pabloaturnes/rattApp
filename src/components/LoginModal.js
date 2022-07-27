
import {Button, Modal, Text, Input, Row, Checkbox } from '@nextui-org/react';


const LoginModal = ({loginModalCloseHandler,loginModalVisible}) =>{

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
            <form>
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
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        aria-labelledby="password"
                    />
                    <Row justify="space-between">
                        <Checkbox>
                        <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14}>Forgot password?</Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
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












