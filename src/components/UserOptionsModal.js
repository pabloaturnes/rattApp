
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

const UserOptionsModal = ({userOptionsModalVisible, userOptionsModalCloseHandler}) => {




  return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={userOptionsModalVisible}
        onClose={userOptionsModalCloseHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            This section its not avalible yet! 
          </Text>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={userOptionsModalCloseHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}


export default UserOptionsModal
