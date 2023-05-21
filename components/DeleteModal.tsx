import React from 'react'
import { AlertDialog, Button, Text, useDisclose } from "native-base";


interface DeleteModalProps {
  handleAction: () => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
  driver: IDriver
} 

const DeleteModal:React.FC<DeleteModalProps> = ({ handleAction, driver, isOpen, onClose }) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Driver</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to <Text fontWeight={"medium"}>{driver?.name}</Text>. This action cannot be
            reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handleAction}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
  )
}

export default DeleteModal