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
            <Modal isCentered isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "lg" }}>
                <ModalOverlay />
                <ModalContent alignItems="center">
                    <ModalHeader>
                        <Heading
                            pt="34px"
                            textAlign="center"
                            color="#E53E3E"
                            fontWeight="700"
                            fontSize={{ base: "24px", md: "48px" }}
                            lineHeight="133%"
                        >
                            Max selection reached
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text color="black" textAlign="center" fontWeight="700" fontSize={{ base: "16px", md: "20px" }} lineHeight="120%">
                            You can only select up to 5 interests!
                        </Text>
                        <Text color="black" textAlign="center" fontWeight="700" fontSize={{ base: "16px", md: "20px" }} lineHeight="120%">
                            <br />
                            To add more, deselect some of your
                        </Text>
                        <Text color="black" textAlign="center" fontWeight="700" fontSize={{ base: "16px", md: "20px" }} lineHeight="120%">
                            chosen interests
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Center>
                            <Button
                                mt="23.5px"
                                mb="93.5px"
                                colorScheme="orange"
                                onClick={onClose}
                                borderRadius="5px"
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                w={{ md: "200px" }}
                                h={{ base: "40px", md: "70px" }}
                            >
                                <Text fontWeight="700" fontSize={{ base: "16px", md: "24px" }} lineHeight="120%">
                                    I understand!!!
                                </Text>
                            </Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DatingInterestModal
