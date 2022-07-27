
import {Button, Modal, Text, Input, Row, Checkbox } from '@nextui-org/react';


const JoinModal = ({joinModalCloseHandler,joinModalVisible}) =>{

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={joinModalVisible}
            onClose={joinModalCloseHandler}
            css={{
                '@xs': {
                    width: '80vw'
                }
            }}
        >
            <form>
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
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={joinModalCloseHandler}>
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







