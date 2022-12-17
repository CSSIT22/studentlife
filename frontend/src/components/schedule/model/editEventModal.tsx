import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, ModalFooter, Button, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import EditEventForm from '../Form/editEventForm'

const editEventModal: FC<{
    modal2: any
}> = ({ modal2 }) => {
    return (
        <Modal id="editEvent" isOpen={modal2.isOpen} onClose={modal2.onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="black">
                    <Text fontSize="3xl">Edit Event</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <EditEventForm />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" width="239px" height="40px" bg="#E1AB20">
                        Edit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default editEventModal