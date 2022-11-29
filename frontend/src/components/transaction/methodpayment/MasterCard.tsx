import { Button, useDisclosure, Text } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import MasterCardInfo from "./MasterCardInfo"
import { Link } from 'react-router-dom';

const SelectMasterCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const ShowUserCard = () =>{

    // }

    return (
        <div>
            <Text fontSize="lg" fontWeight={"bold"} color="white">
                MasterCard Selection
            </Text>
            <MasterCardInfo name="Dan Abrahmov" card={123456789} />
            <MasterCardInfo name="Dan Abrahmov" card={123456789} />
            <Link to="/transaction/shoptransaction/addcard">
                <Button w={"100%"} bg={"#fff2e5"}  borderRadius="lg" p={"20px"} mb="10px">
                    <Text fontSize="md" fontWeight={"bold"} color="black">
                        Add a new MasterCard
                    </Text>
                </Button>
         </Link>
        </div>
    )
}

export default SelectMasterCard
