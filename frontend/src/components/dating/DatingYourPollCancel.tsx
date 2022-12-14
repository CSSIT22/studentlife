import {
    Box,
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
    useDisclosure,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"
import Lottie from "lottie-react"
import DatingLoading from "./lottie/DatingLoading.json"
import { motion } from "framer-motion"

const DatingYourPollCancel: FC<{ pollId: string }> = ({ pollId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    function handleClick() {
        setIsLoading(true)
        API.put<{ pollId: string }>("/dating/yourpoll/deleteYourPoll", { pollId: pollId }).then(() => navigate("/dating/poll/yourpoll"))
    }
    return (
        <>
            <Box display="flex" justifyContent="center" pt={{ base: "5px", md: "20px" }} pb={{ base: "80px", md: "25px" }}>
                <motion.div
                    initial={
                        { cursor: "pointer" }
                    }
                    whileHover={{ scale: 1.1, }}
                    whileTap={{
                        scale: 0.9,
                    }}
                    onClick={onOpen}
                >
                    <Button
                        colorScheme="orange"
                        w={{ base: "167px", md: "380px" }}
                        h="36px"
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        onClick={onOpen}
                    >
                        <Text fontWeight="700" fontSize="14px" lineHeight="120%" color="white">
                            Cancel the activity
                        </Text>
                    </Button>
                </motion.div>
            </Box>

            <Modal isCentered isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "lg" }} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {isLoading ? <></> : <Heading
                            textAlign="center"
                            color="#E53E3E"
                            fontWeight="700"
                            fontSize={{ base: "30px", md: "48px" }}
                            mt={{ base: "37px", md: "60px" }}
                            lineHeight="133%"
                        >
                            Cancel the activity
                        </Heading>}
                    </ModalHeader>
                    <ModalBody>
                        {isLoading ? <><Box display="block" mb={{ base: "140px", md: "180px" }}>
                            <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.8" }} />
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: `0.25em`
                                }}
                                animate={{
                                    opacity: 1,
                                    y: `0em`,
                                    transition: {
                                        duration: 1,
                                        ease: [0.2, 0.65, 0.3, 0.9],
                                    }
                                }}
                            >
                                <Text mt="-20%" textAlign="center" color="black" fontWeight="700" fontSize={{ base: "20px", md: "2xl" }} lineHeight="120%" pl="18px" >
                                    DELETING THE POLL&nbsp;.&nbsp;.&nbsp;.
                                </Text>
                            </motion.div>

                        </Box></> : <><Box ml="40px" mr="40px" mt={{ base: "5px", md: "31px" }} mb={{ base: "24px", md: "50px" }}>
                            <Text textAlign="center" fontWeight="700" fontSize={{ base: "16px", md: "24px" }} lineHeight="120%" color="black">
                                Are you sure you want to cancel the activity?
                            </Text>
                        </Box>
                            <Center>
                                <ModalFooter>
                                    <Button
                                        colorScheme="green"
                                        w={{ base: "132px", md: "200px" }}
                                        h={{ base: "54px", md: "70px" }}
                                        mr={{ base: "10px", md: "40px" }}
                                        mb={{ base: "40px", md: "100px" }}
                                        onClick={handleClick}
                                    >
                                        <Text fontWeight="700" fontSize={{ base: "20px", md: "24px" }} lineHeight="133%">
                                            Yes
                                        </Text>
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        w={{ base: "132px", md: "200px" }}
                                        h={{ base: "54px", md: "70px" }}
                                        mb={{ base: "40px", md: "100px" }}
                                        onClick={onClose}
                                    >
                                        <Text fontWeight="700" fontSize={{ base: "20px", md: "24px" }} lineHeight="133%">
                                            No
                                        </Text>
                                    </Button>
                                </ModalFooter>
                            </Center></>}
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </>
    )
}

export default DatingYourPollCancel
