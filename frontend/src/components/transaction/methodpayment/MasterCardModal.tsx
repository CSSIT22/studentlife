import { Button, useDisclosure, Text, Link } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import MasterCardInfo from "./MasterCardInfo"

const SelectMasterCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const ShowUserCard = () =>{

    // }

    return (
        <div>
            <Button onClick={onOpen} colorScheme="whiteAlpha" shadow={"lg"}>
                <Text fontSize="lg" fontWeight={"bold"} color="black">
                    MasterCard
                </Text>
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="lg" fontWeight={"bold"} color="black">
                        MasterCard Selection
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <MasterCardInfo name="Dan Abrahmov" card={123456789} />
                        <MasterCardInfo name="Dan Abrahmov" card={123456789} />{" "}
                        <Link href="shoptransaction/addcard">
                            <Button w={"100%"} bg={"#e67f45"} borderRadius="lg" p={"20px"} mb="10px">
                                <Text fontSize="md" fontWeight={"bold"} color="white">
                                    Add a new MasterCard
                                </Text>
                            </Button>
                        </Link>
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

export default SelectMasterCard
