import { Box, Button, Center, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const DatingYourPollClose = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    function handleClick() {
        navigate("/dating/poll/yourpoll")
    }
    return (<>
        <Button
            colorScheme="orange"
            w={{ base: "167px", md: "172px" }}
            h="36px"
            mr={{ base: "5px", md: "47px" }}
            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
            onClick={onOpen}
        >
            <Text fontWeight="700" fontSize="14px" lineHeight="120%" color="white">
                Close now
            </Text>
        </Button>

        <Modal isCentered isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "lg" }} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading textAlign="center" color="black" fontWeight="700"
                        fontSize={{ base: "30px", md: "48px" }}
                        mt={{ base: "37px", md: "60px" }}
                        lineHeight="133%">Close Now</Heading>
                </ModalHeader>
                <ModalBody>
                    <Box ml="40px"
                        mr="40px"
                        mt={{ base: "5px", md: "31px" }}
                        mb={{ base: "24px", md: "50px" }}>
                        <Text textAlign="center" fontWeight="700"
                            fontSize={{ base: "16px", md: "24px" }}
                            lineHeight="120%"
                            color="black"
                        >
                            Are you sure you want to close this poll now?
                        </Text>
                    </Box>
                    <Center>
                        <ModalFooter>
                            <Button colorScheme="green" w={{ base: "132px", md: "200px" }} h={{ base: "54px", md: "70px" }} mr={{ base: "10px", md: "40px" }} mb={{ base: "40px", md: "100px" }} onClick={handleClick}>
                                <Text fontWeight="700"
                                    fontSize={{ base: "20px", md: "24px" }}
                                    lineHeight="133%">Yes</Text></Button>
                            <Button colorScheme="red" w={{ base: "132px", md: "200px" }} h={{ base: "54px", md: "70px" }} mb={{ base: "40px", md: "100px" }} onClick={onClose}>
                                <Text fontWeight="700"
                                    fontSize={{ base: "20px", md: "24px" }}
                                    lineHeight="133%">No</Text></Button>

                        </ModalFooter>
                    </Center>
                </ModalBody>
                <ModalCloseButton />
            </ModalContent>
        </Modal>
    </>
    )
}

export default DatingYourPollClose