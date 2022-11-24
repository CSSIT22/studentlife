import { Box, Button, Center, Heading, Link, Portal, StackDivider, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { Input } from "@chakra-ui/react"
import AppBody from "../../share/app/AppBody"
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
const shortlink = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()

    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} height={"300px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"10%"}>
                    <Box>
                        <Heading
                            width={"300px"}
                            height={"50px"}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"#f2f2f2"}
                            borderRadius={"10px"}
                            fontSize={"xl"}
                            border={"3px solid white"}
                            textAlign={"center"}
                        >
                            SHORTLINK CUSTOMIZE
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <Input placeholder="intregate.modules.com" w={"50%"} height={"60px"} />
                                </Center>
                            </Box>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Input placeholder="https:bit.ly/asniteft228f" w={"50%"} height={"60px"} />
                            </Center>
                        </Box>
                    </VStack>
                </Box>
            </Center>

            {/*  */}

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
                                            <Button ref={cancelRef} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme="red" onClick={onClose} ml={3}>
                                                SAVE
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                            <Box width={"100%"}>
                                <Center>
                                    <Button colorScheme="yellow" w={"50%"} height={"60px"} onClick={onOpen}>
                                        SAVE
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button colorScheme="green" w={"50%"} height={"60px"}>
                                            ADD
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Confirmation!</PopoverHeader>
                                        <PopoverBody>Are you sure you want to have that milkshake</PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Center>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default shortlink
