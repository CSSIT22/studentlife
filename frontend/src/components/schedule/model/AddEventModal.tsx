import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, Text, Heading, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, ModalFooter, Button, useBreakpointValue, Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import AddModalForm from '../Form/AddModalForm'

const AddEventModal: FC<{
    initialRef: any, finalRef: any, modal1: any
}> = ({ initialRef, finalRef, modal1 }) => {
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })
    return (
        <Modal id="addButton" 
        initialFocusRef={initialRef} 
        finalFocusRef={finalRef} 
        isOpen={modal1.isOpen} 
        onClose={modal1.onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Box display="flex" alignItems="center" >
                    {isMobile? <Box onClick={modal1.onClose}><ChevronLeftIcon/></Box>:<></> }
                    <Heading color="black" pl="1.5">Add Event</Heading></Box>
                    {/* <timetable getName = {setNameInput}/> */}
                </ModalHeader>
                {isMobile?<></> :<ModalCloseButton /> }
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