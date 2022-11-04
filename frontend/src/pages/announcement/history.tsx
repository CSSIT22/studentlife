import React from 'react'
import HeaderPage from '../../components/annoucement/HeaderPage'
import AppBody from '../../components/share/app/AppBody'
import PostOnHistory from '../../components/annoucement/PostOnHistory';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Stack,useDisclosure,Text } from '@chakra-ui/react';

const history = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <AppBody>
      <HeaderPage head='History'/>
      <PostOnHistory topic='Hello World' sender='SAMO-SIT' status=''/>
      <PostOnHistory topic='Hello World' sender='SAMO-SIT' status='approve'/>
      <PostOnHistory topic='Hello World' sender='SAMO-SIT' status='disapprove'/>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"xs"} isCentered>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>WARNING</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text>This announcement will be kept for 3 days. After these 3 days, you won't be able to recover this announcement.</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Delete
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Stack position={"fixed"} bottom="5rem" width="91%">
                <Button onClick={onOpen} height="3.5rem">Delete announcement</Button>
                <Button>Cancel</Button>
            </Stack>
    </AppBody>
  )
}

export default history