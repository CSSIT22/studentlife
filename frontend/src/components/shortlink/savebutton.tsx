import { Box, Button, Center, Heading, Link, Portal, StackDivider, useDisclosure, VStack, Text } from "@chakra-ui/react"
import React from "react"
import { Input } from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from "@chakra-ui/react"
const savebutton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()

    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }
    return (
        <Center>
            {" "}
            <Box width={"80%"} height={"200px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"1%"}>
                <VStack spacing={4} align="stretch" marginTop={"5%"}>
                    <Box h="70px">
                        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                        SAVE
                                    </AlertDialogHeader>

                                    <AlertDialogBody>Are you sure?</AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button colorScheme="green" onClick={onClose} ml={3}>
                                            SAVE
                                        </Button>
                                        <Button ref={cancelRef} onClick={onClose} ml={3}>
                                            Cancel
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                        <Box width={"100%"}>
                            <Center>
                                <Button colorScheme="orage.200" w={"50%"} height={"60px"} onClick={onOpen}>
                                    SAVE
                                </Button>
                            </Center>
                        </Box>
                    </Box>
                    <Box h="70px">
                        <Center></Center>
                    </Box>
                </VStack>
            </Box>
        </Center>
    )
}
export default savebutton
