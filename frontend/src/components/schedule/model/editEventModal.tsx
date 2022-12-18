import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, ModalFooter, Button, Text, useBreakpointValue, Box } from '@chakra-ui/react'
import React, { FC } from 'react'
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
                    {isMobile ? <Box onClick={modal2.onClose}><ChevronLeftIcon /></Box> : <></>}
                    <Text fontSize="3xl" fontWeight='bold'>
                        Edit Event
                    </Text>
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