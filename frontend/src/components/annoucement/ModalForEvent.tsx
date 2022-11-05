import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const ModalForEvent: FC<{
    isOpen: boolean
    onClose: Function
    topic: string
    detail: string
    event: string
}> = ({ isOpen, onClose, topic, detail, event }) => {
    const checkEvent = (event:string) => {
        if (event == "OK") {
            return ""
        } else {
            return (
                <Button colorScheme="blue" mr={3}>
                    {event}
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
                    {checkEvent(event)}
                <ModalFooter>
                    <Button onClick={() => onClose()}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalForEvent
