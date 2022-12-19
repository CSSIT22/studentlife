import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    IconButton,
    useDisclosure,
    chakra,
} from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"

// const CancelButton = () => {
//     return (
//         <Box alignSelf={"center"}>
//             <IconButton colorScheme="red" aria-label="Open post option" size="lg" icon={<CloseIcon />} />
//         </Box>
//     )
// }

function CancelButton() {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLDivElement>(null)
    const submit = () => {

        let path = "/";
        navigate(path);
    }

    return (
        <>
            <Box alignSelf={"center"}>
                <IconButton onClick={onOpen} colorScheme="orange" aria-label="Open post option" size="lg" icon={<CloseIcon />} />
            </Box>
            <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard this posting?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of this post? <br />
                        All texts, images and video will be discarded.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>No</Button>
                        <Button onClick={submit} colorScheme="red" ml={3} >
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default CancelButton
