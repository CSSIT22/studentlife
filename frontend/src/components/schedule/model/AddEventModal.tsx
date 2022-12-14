import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, Text, Heading, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, ModalFooter, Button, useBreakpointValue, Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import { AiOutlineSchedule } from 'react-icons/ai'
import AddModalForm from '../Form/AddModalForm'

const AddEventModal: FC<{
    initialRef: any, finalRef: any, modal1: any, reload:Function
}> = ({ initialRef, finalRef, modal1,reload }) => {
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
                        {isMobile ? <Box onClick={modal1.onClose}><ChevronLeftIcon /></Box> : <></>}
                        <Heading color="black" pl="1.5">Add Event</Heading>
                        <Box ml="3"><AiOutlineSchedule size={30} /> </Box></Box>
                    {/* <timetable getName = {setNameInput}/> */}
                </ModalHeader>
                {isMobile ? <></> : <ModalCloseButton />}
                <ModalBody pb={6}>
                    <AddModalForm modal1={modal1} reload={reload}/>
                </ModalBody>

                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddEventModal