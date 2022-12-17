import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Input, Box } from "@chakra-ui/react"
import { useState } from "react"
import { BiGroup } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"
import API from "src/function/API"

function GroupFrom() {
    let param = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const [text , setText] = useState("");

    function onSend(){
        API.post(`/chat/createGroup?name=${text}`)
        setText("")
        navigate(`/chat`)
    }
    return (
        <>
            <Button
                borderRadius="md"
                bg="peachpuff"
                color="orange.700"
                px={5}
                h={"80%"}
                _active={{ background: "transparent" }}
                _hover={{ background: "transparent", transform: "scale(1.2)" }}
                onClick = {onOpen}
            >
                <BiGroup size={"40px"} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box paddingY={"2"}>Room name</Box>
                        <Input onChange={(e)=>setText(e.target.value)}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={onSend}>
                            Accept
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default GroupFrom
