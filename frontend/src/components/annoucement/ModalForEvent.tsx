import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const ModalForEvent: FC<{
    isOpen: boolean
    onClose: Function
    topic: string
    detail: string
    status: string
    allPost: Array<any>
    setAllPost: React.Dispatch<React.SetStateAction<Array<any>>>,
    selectPost:number
}> = ({ isOpen, onClose, topic, detail, status,allPost,setAllPost,selectPost }) => {
    const toggle = () => {
        setAllPost(
            allPost.map((el) => {
                if (el.id == selectPost) {
                    el.status = "delete"
                }
                return el
            })
        )
    }
    console.log(allPost);
    console.log(selectPost);
    
    
    const checkstatus = (status:string) => {
        if (status == "OK") {
            return ""
        } else if(status == 'disapprove' || status == 'approve'){
            return (
                <Button colorScheme="blue" mr={3} onClick={toggle}>
                    Delete
                </Button>
            )
        } 
    }
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => onClose()} size={"xs"} isCentered>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
            <ModalContent>
                <ModalHeader>{topic}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>{detail}</Text>
                </ModalBody>
                <ModalFooter>
                    {checkstatus(status)}
                    <Button onClick={() => onClose()}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalForEvent
