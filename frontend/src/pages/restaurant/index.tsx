import React from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Image } from "@chakra-ui/react"
import AppBody from "../../components/share/app/AppBody"
import ExtarSecondaryNav from "../../components/share/navbar/ExtarSecondaryNav"

function likeOrNope() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <AppBody 
            secondarynav={[ 
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            
            //likeOrNope Here
            <br/>
            <br/>
            <br/>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal  isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={'3xl'} textAlign={'center'}>Restaurant Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Image src="https://cdn.discordapp.com/attachments/900658140704559116/1025051073842532412/received_1863984997105459.jpg"></Image>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme="red" mr={255} onClick={onClose}>
                            Add to fav
                        </Button>
                        <Button variant="ghost">GO</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </AppBody>
    )
}

export default likeOrNope
