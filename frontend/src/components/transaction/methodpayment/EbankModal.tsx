import { Button, useDisclosure, Text } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import React from "react"
import BankButton from "./BankButton"

const EbankModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Button onClick={onOpen} colorScheme="whiteAlpha" shadow={"lg"}>
                <Text fontSize="lg" fontWeight={"bold"} color="black">
                    Ebanking
                </Text>
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="lg" fontWeight={"bold"} color="black">
                        EBanking Selection
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <BankButton bank={"Bankok Bank"} link="#" />
                        <BankButton bank={"Kasikorn Bank"} link="#" />
                        <BankButton bank={"Krungthai Bank"} link="#" />
                        <BankButton bank={"Siam Commercial Bank"} link="#" />

                        <BankButton bank={"Krungsri Bank"} link="#" />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={onClose} mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose} colorScheme="red">
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EbankModal
