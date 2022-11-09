import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { FC } from "react"

const DatingInterestModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        // Modal to be used for Interest Page when you select more than 5 tags of interest
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent alignItems="center">
                    <ModalHeader>Max Selection Reached</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Text>You can only select up to 5 interests!</Text>
                        </Center>
                        <Center>
                            <Text>To add more, deselect some of your chosen interests</Text>
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="orange" mr={3} onClick={onClose} borderRadius="full">
                            I understand!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DatingInterestModal
