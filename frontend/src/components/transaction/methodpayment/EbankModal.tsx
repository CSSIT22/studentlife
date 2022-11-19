import { Button, useDisclosure, Text, Link, Box, Collapse } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import React from "react"
import BankButton from "./BankButton"

const EbankModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = React.useState(false)

    const handleToggle = () => setShow(!show)
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
                        <BankButton bank={"Bankok Bank"} />
                        <BankButton bank={"Kasikorn Bank"} />
                        <BankButton bank={"Krungthai Bank"} />
                        <BankButton bank={"Siam Commercial Bank"} />
                        <Collapse in={show}>
                            <BankButton bank={"Krungsri Bank"} />
                            <BankButton bank={"Bank of Ayudhya"} />
                            <BankButton bank={"TTB"} />
                        </Collapse>

                        <Button w={"100%"} size="sm" onClick={handleToggle}>
                            Show {show ? "Less" : "More"}
                        </Button>
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
