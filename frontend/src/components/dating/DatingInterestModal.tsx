import {
    Button,
    Center,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react"
import { FC } from "react"

const DatingInterestModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        // Modal to be used for Interest Page when you select more than 5 tags of interest
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xs">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent alignItems="center">
                    <ModalHeader>
                        <Heading pt="32px" textAlign="center" color="#E53E3E" fontWeight="700" fontSize="20px" lineHeight="120%">
                            You can only select up
                        </Heading>
                        <Heading pb="21px" textAlign="center" color="#E53E3E" fontWeight="700" fontSize="20px" lineHeight="120%">
                            to 5 interests!
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text color="black" textAlign="center" fontWeight="700" fontSize="16px" lineHeight="120%">
                            To add more, deselect some of
                        </Text>
                        <Text color="black" textAlign="center" fontWeight="700" fontSize="16px" lineHeight="120%">
                            your chosen interests
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Center>
                            <Button
                                mt="21px"
                                mb="87px"
                                colorScheme="orange"
                                onClick={onClose}
                                borderRadius="5px"
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                            >
                                I understand!
                            </Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DatingInterestModal
