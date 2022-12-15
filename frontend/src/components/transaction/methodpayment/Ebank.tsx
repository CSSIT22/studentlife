import { Button, useDisclosure, Text } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import React from "react"
import BankButton from "./BankButton"

const EbankModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Text fontSize="lg" fontWeight={"bold"} color="white">
                EBanking Selection
            </Text>
            <BankButton bank={"Bankok Bank"} link="#" />
            <BankButton bank={"Kasikorn Bank"} link="#" />
            <BankButton bank={"Krungthai Bank"} link="#" />
            <BankButton bank={"Siam Commercial Bank"} link="#" />
            <BankButton bank={"Krungsri Bank"} link="#" />
        </div>
    )
}

export default EbankModal
