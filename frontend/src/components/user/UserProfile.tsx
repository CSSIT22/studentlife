import { ReactElement } from "react"
import {
    Box,
    Avatar,
    VStack,
    Grid,
    GridItem,
    Button,
    ButtonGroup,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Stack,
    Flex,
} from "@chakra-ui/react"

import { BsThreeDotsVertical } from "react-icons/bs"

export default function SimpleThreeColumns() {
    return (
        <Box maxW="95%" borderRadius="none" overflow="hidden" p="5">
            <Grid
                templateAreas={`
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={"150px 6fr 300px"}
                gridTemplateColumns={"150px 1fr"}
                h="200px"
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="md"
            >
                <GridItem pl="2" rounded="xl" bg="orange.400" area={"nav"}>
                    <VStack spacing={4} align="stretch">
                        <Avatar pt={2} size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
                        <Box textAlign="center" color="white" mb={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" rounded="xl" bg="orange.400" area={"main"}>
                    <Box my="3" p={2} color="white">
                        Id: 64130500XXX
                    </Box>

                    <Box p={2} color="white">
                        Name: John Doe
                    </Box>
                    <Box p={2} color="white">
                        Fucuty: SIT Major: Computer Science
                    </Box>
                </GridItem>
                <GridItem pl="2" area={"footer"}>
                    <ButtonGroup color="white" variant="outline" spacing="6">
                        <Button pl={5} bg="orange.400">
                            Follow
                        </Button>
                        <Button pl={5} bg="orange.400">
                            Message
                        </Button>{" "}
                        <Popover placement="bottom" isLazy>
                            <PopoverTrigger>
                                <IconButton
                                    color="orange.400"
                                    aria-label="More server options"
                                    icon={<BsThreeDotsVertical />}
                                    variant="outline"
                                    w="fit-content"
                                />
                            </PopoverTrigger>
                            <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
                                <PopoverArrow />
                                <PopoverBody>
                                    <Stack>
                                        <Button
                                            w="194px"
                                            variant="ghost"
                                            justifyContent="space-between"
                                            fontWeight="normal"
                                            colorScheme="red"
                                            fontSize="sm"
                                        >
                                            Report
                                        </Button>
                                        <Button
                                            w="194px"
                                            variant="ghost"
                                            justifyContent="space-between"
                                            fontWeight="normal"
                                            colorScheme="red"
                                            fontSize="sm"
                                        >
                                            Block
                                        </Button>
                                        <Button
                                            w="194px"
                                            variant="ghost"
                                            justifyContent="space-between"
                                            fontWeight="normal"
                                            colorScheme="red"
                                            fontSize="sm"
                                        >
                                            Poke
                                        </Button>
                                    </Stack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </ButtonGroup>
                </GridItem>
            </Grid>
        </Box>

        // Help me goddddd it almost finish but my eyes can handle much any more sorry for what i done this is the end of me nowww thank you everyone for support me and help me love you mom dad and my bro sry to be a
        // croward is sorry

        // <Center py={6}>
        //     <Flex maxW={"95%"} w={"full"} bg={useColorModeValue("red", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
        //         <VStack spacing={4} align="stretch">
        //             <Avatar size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
        //             <Heading mb={4} fontSize={"1xl"} fontWeight={100} fontFamily={"body"}>
        //                 Rateing:9999
        //             </Heading>
        //         </VStack>
        //         <SimpleGrid paddingLeft={25} columns={1} spacingX="10px" spacingY="20px">
        //             <Box textAlign="left" fontSize={"2xl"} height="25px">
        //                 Name: John Doe
        //             </Box>
        //             <Box textAlign="left" fontSize={"2xl"} height="25px">
        //                 ID: 64130500XXX
        //             </Box>
        //             <Box textAlign="left" fontSize={"2xl"} height="25px">
        //                 Facuty: SIT
        //             </Box>
        //         </SimpleGrid>
        //     </Flex>
        // </Center>
    )
}
