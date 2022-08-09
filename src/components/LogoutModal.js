
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

const LogoutModal = ({logoutModalVisible, logoutModalCloseHandler, handleLogout}) => {




  return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={logoutModalVisible}
        onClose={logoutModalCloseHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Are you sure you want to log out?
          </Text>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={logoutModalCloseHandler}>
            Close
          </Button>
          <Button auto flat color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
  );
}


export default LogoutModal
