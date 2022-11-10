import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Show,
    Text,
} from "@chakra-ui/react"
import React, { FC } from "react"
import { AiOutlineClose } from "react-icons/ai"

const Historycontent: FC<{
    resName: string
    date: string
    status: boolean
}> = ({ resName, date, status }) => {
    return (
        <>
            <Show below="sm">
                <Box
                    width={{ base: "100%", lg: "100%" }}
                    height={{ base: "9rem", lg: "13rem" }}
                    mt={"25px"}
                    backgroundColor={"white"}
                    p={"5"}
                    borderRadius="lg"
                    boxShadow={"lg"}
                    mb={"6rem"}
                >
                    <Flex mb={"15px"}>
                        <Box width={"30%"} ml={"1rem"}>
                            <Image boxSize="5rem" src="https://bit.ly/dan-abramov" alt="Dan Abramov" borderRadius={"10px"} />
                        </Box>
                        <Box width={"60%"} height={"6rem"} color={"black"}>
                            <Flex direction={"column"} justifyContent={"center"} height={"80%"}>
                                <Text fontSize={"sm"}>
                                    <span style={{ fontWeight: "bold" }}>Name:</span> {resName}
                                </Text>
                                <Text fontSize={"sm"}>
                                    <span style={{ fontWeight: "bold" }}>Date:</span> {date}
                                </Text>
                                <Text fontSize={"sm"}>
                                    <span style={{ fontWeight: "bold" }}>Status:</span> {status ? "Liked" : "Nope"}
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Show>

            <Show above="sm">
                <Box width={"100%"} p={5} shadow="md" borderWidth="1px" mt={"35px"} borderRadius={"lg"}>
                    <Popover placement="bottom">
                        {({ isOpen, onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Flex justifyContent={"end"} height={3}>
                                        <AiOutlineClose />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"}>ARE YOU SURE</PopoverHeader>
                                    <PopoverBody> you want to unfavorite this restaurant?</PopoverBody>
                                    <PopoverFooter display="flex" justifyContent="center">
                                        <ButtonGroup size="sm">
                                            <Button colorScheme="green" onClick={onClose} mr={2}>
                                                Yes
                                            </Button>

                                            <Button colorScheme="red" onClick={onClose} ml={2}>
                                                No
                                            </Button>
                                        </ButtonGroup>
                                    </PopoverFooter>
                                </PopoverContent>
                            </>
                        )}
                    </Popover>
                    <Flex direction={"column"} alignItems={"center"} gap={"4"}>
                        <Heading fontSize="xl">{resName}</Heading>
                        <Image
                            boxSize={"12.5rem"}
                            // height={{ lg: "9.5rem" }}
                            src="https://bit.ly/dan-abramov"
                            alt="Dan Abramov"
                            borderRadius={"10px"}
                        />
                    </Flex>
                    <Box ml={{ lg: "2rem" }} mt={"1rem"} gap={"4"} textAlign={{ sm: "center", lg: "left" }}>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Date:</span> {date}
                        </Text>
                        <Text>
                          
                            <span style={{ fontWeight: "bold" }}>Status:</span>{status ? "Liked" : "Nope"}
                        </Text>
                    </Box>
                </Box>
            </Show>
        </>
    )
}

export default Historycontent
