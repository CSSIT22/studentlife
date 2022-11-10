import {Button,Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalCloseButton,
        useDisclosure, 
} from "@chakra-ui/react"
import React, { FC } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"



const CommunityBtn: FC<{ ButtonType: string; }> = ({ButtonType}) => {

    let button;
    const { isOpen, onOpen, onClose } = useDisclosure()

    if(ButtonType == "Create"){
        button = <Button colorScheme='orange'>+ Craete New Community</Button>
    }
    else if(ButtonType == "Edit"){
        button = <Button colorScheme='blue'>Edit Community</Button>
    }
    else if(ButtonType == "Delete"){
        button = 
        <>
            <Button colorScheme='red' onClick={onOpen} >Delete Community</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Delete Community</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure to delete this community ?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button variant='red'>Delete it</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    }
    else if(ButtonType == "Leave"){
        button = <Button colorScheme='red'>Leave Community</Button>
    }
    else if(ButtonType == "Join"){
        button = <Button colorScheme='blue'>Join</Button>
    }
    else if(ButtonType == "UAccept"){
        button = <Button colorScheme='blue'>Accept Invite</Button>
    }
    else if(ButtonType == "UDecline"){
        button = <Button colorScheme='blue'>Decline Invite</Button>
    }
    else if(ButtonType == "AAccept"){
        button = <Button colorScheme='blue'>Accept Request</Button>
    }
    else if(ButtonType == "ADecline"){
        button = <Button colorScheme='blue'>Decline Request</Button>
    }
    else if(ButtonType == "Upload"){
        button = <Button colorScheme='Gray'>Upload File</Button>
    }

    return button;
    
}

export default CommunityBtn