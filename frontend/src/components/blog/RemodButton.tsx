import { CloseIcon } from "@chakra-ui/icons"
import {
    Button,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { Center } from "@chakra-ui/react"
import PostType_modal from "./PostType_modal"

// const RemodButton = () => {
//     return (
//         <Box>
//             <Button colorScheme="orange" size="lg">
//                 Remod
//             </Button>
//         </Box>
//     )
// }

function RemodButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLDivElement>(null)

    return (
        <>
            <Box>
                <Button onClick={onOpen} colorScheme="orange" size="lg" >
                    Remod
                </Button>
            </Box>
            <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Center>reMod: Sharing</Center>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Center>
                            <PostType_modal />
                        </Center>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>No</Button>
                        <Button colorScheme="red" ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default RemodButton
