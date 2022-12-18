import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, ModalFooter, Button, Text, useBreakpointValue, Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import EditEventForm from '../Form/editEventForm'

const editEventModal: FC<{
    modal2: any
    eventId: any
}> = ({ modal2, eventId }) => {
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })
    return (
        <Modal id="editEvent" isOpen={modal2.isOpen} onClose={modal2.onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="black">
                    <Box display="flex" alignItems="center">
                        {isMobile ? <Box onClick={modal2.onClose}><ChevronLeftIcon /></Box> : <></>}
                    <Text fontSize="3xl" pl="1.5" fontWeight='bold'>
                        Edit Event
                    </Text>
                    <Box ml="3"><AiOutlineEdit size={30}/> </Box>
            
                    
                    </Box>
                    
                </ModalHeader>
                {isMobile ? <></> : <ModalCloseButton />}
                <ModalBody>
                    <EditEventForm eventId={eventId} />
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default editEventModal