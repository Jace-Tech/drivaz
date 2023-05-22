import React from 'react'
import { AlertDialog, Button} from "native-base";


interface ExitModalProps {
  handleAction: () => void;
  onClose: () => void;
  isOpen: boolean;
} 

const ExitModal:React.FC<ExitModalProps> = ({ handleAction, isOpen, onClose }) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog size={"xl"} leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Exit Screen</AlertDialog.Header>
          <AlertDialog.Body>
            You may have unsaved changes. Are you sure you want to leave screen?.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="warning" onPress={handleAction}>
                Yes Leave
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
  )
}

export default ExitModal