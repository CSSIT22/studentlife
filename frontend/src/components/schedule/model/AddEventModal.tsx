import { Modal, ModalOverlay, ModalContent, ModalHeader, Text, Heading, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, ModalFooter, Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import AddModalForm from '../Form/AddModalForm'

const AddEventModal: FC<{
    initialRef: any, finalRef: any, modal1: any
}> = ({ initialRef, finalRef, modal1 }) => {
    return (
        <Modal id="addButton" initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={modal1.isOpen} onClose={modal1.onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading color="black">Add Event</Heading>
                    {/* <timetable getName = {setNameInput}/> */}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <AddModalForm />
                </ModalBody>

                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddEventModal