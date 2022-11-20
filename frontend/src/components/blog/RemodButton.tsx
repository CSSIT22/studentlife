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
    Spacer,
    Input,
} from "@chakra-ui/react"
import React from "react"
import { Center } from "@chakra-ui/react"
import PostType_modal from "./PostType_modal"
import PostType_modal_reMOD from "./PostType_modal_reMOD"
import CopyLinkToast from "./CopyLinkToast"

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
                <Button onClick={onOpen} colorScheme="orange" size="lg">
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
                        <Box>
                            <Center>
                                <PostType_modal_reMOD />
                            </Center>
                        </Box>
                        <Input placeholder="Basic usage" marginTop={5} />
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Box display="flex" gap={5}>
                            <Button colorScheme="orange" onClick={onClose}>
                                Comfirm
                            </Button>
                            <CopyLinkToast />
                        </Box>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default RemodButton
