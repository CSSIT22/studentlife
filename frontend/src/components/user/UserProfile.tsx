import { ReactElement } from "react"
import {
    Box,
    Avatar,
    VStack,
    textAlign,
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
        <Box maxW="95%" borderRadius="none" overflow="hidden">
            <Grid
                templateAreas={`
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={"150px 6fr 300px"}
                gridTemplateColumns={"150px 1fr"}
                h="300px"
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="lg"
            >
                <GridItem pl="2" bg="pink.300" area={"nav"}>
                    <VStack spacing={4} align="stretch">
                        <Avatar pt={2} size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
                        <Box textAlign="center" mb={4} fontSize={"1xl"} fontWeight={100} fontFamily={"body"}>
                            Rateing:9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" bg="green.300" area={"main"}>
                    <Box bg="tomato" w="30%" p={2} color="white">
                        Id: 64130500XXX
                    </Box>
                    <Box bg="tomato" w="30%" p={2} color="white">
                        Name: John Doe
                    </Box>
                    <Box bg="tomato" w="30%" p={2} color="white">
                        Fucuty: SIT Major: Computer Science
                    </Box>
                </GridItem>
                <GridItem pl="2" bg="blue.300" area={"footer"}>
                    <ButtonGroup variant="outline" spacing="6">
                        <Button pl={5}>Follow</Button>
                        <Button pl={5}>Message</Button>{" "}
                        <Popover placement="bottom" isLazy>
                            <PopoverTrigger>
                                <IconButton aria-label="More server options" icon={<BsThreeDotsVertical />} variant="outline" w="fit-content" />
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
