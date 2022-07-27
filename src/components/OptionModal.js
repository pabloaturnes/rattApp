
import {Button, Modal, Text } from '@nextui-org/react';


const OptionModal = ({optionModalCloseHandler,optionModalVisible,handleByIndividuals,handleByEquals}) =>{




    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={optionModalVisible}
            onClose={optionModalCloseHandler}
            css={{
                '@xs': {
                    width: '80vw'
                }
            }}
        >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        ¡Choose how to divide the count!
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Button color="success" size="xl" iconRight={<i className="bi bi-grid"></i>} onClick={handleByEquals }  >
                        ¡As equal parts!
                    </Button>
                    <Button color="error" size="xl" iconRight={<i className="bi bi-grid-1x2"></i>} onClick={handleByIndividuals}  >
                        ¡As separated checks!
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={optionModalCloseHandler}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default OptionModal