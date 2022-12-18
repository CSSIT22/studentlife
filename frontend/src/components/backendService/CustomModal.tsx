import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CustomModal: React.FC<{ modalHeader: string; token: string; isCurrentDevice: boolean; onClick: Function }> = ({
  modalHeader,
  token,
  isCurrentDevice,
  onClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => {
          console.log(token)
          console.log(isCurrentDevice)
          onOpen()
        }}
        bg={"gray.700"}
        color={"white"}
        w={"100%"}
        _hover={{ color: "black", bg: "gray.500" }}
      >
        Revoke
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isCurrentDevice ? (
              <p>
                This is your <b>current device</b>.
              </p>
            ) : (
              <p>This will logout you out from selected device.</p>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"red"} variant={"solid"} color={"white"} backgroundColor={"red.400"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onClick(token)
                onClose()
                if (isCurrentDevice) navigate("/auth")
              }}
              colorScheme={"green"}
              variant={"solid"}
              color={"white"}
              backgroundColor={"green.400"}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal