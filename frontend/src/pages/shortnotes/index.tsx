import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    Spacer,
    HStack,
    SimpleGrid,
    VStack,
    Select,
    ButtonGroup,
    Divider,
    GridItem,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Textarea,
    useRadioGroup,
    useRadio,
    Center,
    InputGroup,
    InputRightElement,
    Stack,
} from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"
import ResentLists from "../../components/shortnotes/index/rsnList"
import ShortnoteLists from "../../components/shortnotes/index/snList"

const index = () => {
    return (
        <AppBody>
            {/*Recent view list section*/}
            <Flex>
                <Text alignSelf={"end"}>Recent view</Text>
                <Spacer />
                <Link to={"./library"}>
                    <Button boxShadow={"md"} colorScheme="orange" size={"md"}>
                        My library
                    </Button>
                </Link>
            </Flex>
            <Box mt={4} mb={12}>
                <SimpleGrid columns={3} gap={6} textAlign={"center"}>
                    <ResentLists topic={"Shortnote 001"}></ResentLists>
                    <ResentLists topic={"Shortnote 002"}></ResentLists>
                    <ResentLists topic={"Shortnote 003"}></ResentLists>
                </SimpleGrid>
            </Box>

            {/*Shortnote list section*/}
            <Flex alignItems={"end"}>
                <Link to={"./newShortnote"}>
                    <Button boxShadow={"md"} colorScheme="orange" size={"md"}>
                        New shortnote
                    </Button>
                </Link>
                <Spacer />
                <Stack direction={"row"}>
                    <VStack>
                        <Text alignSelf={"start"}>Sort by</Text>
                        <Select variant="filled" placeholder="None">
                            <option value="option1">Name</option>
                            <option value="option2">Date</option>
                        </Select>
                    </VStack>
                    <VStack>
                        <Text alignSelf={"start"}>Course</Text>
                        <Select variant="filled" placeholder="All">
                            <option value="option1">CSC218</option>
                            <option value="option2">CSC220</option>
                            <option value="option3">MTH110</option>
                        </Select>
                    </VStack>
                </Stack>
            </Flex>
            <VStack gap={2} pt={4}>
                <ShortnoteLists topic={"Shortnote 001"} course={"SNS001"} date={"16/04/46"} lock={"🔒"}></ShortnoteLists>
                <ShortnoteLists topic={"Datalink layer"} course={"CSC110"} date={"22/07/19"} lock={"🔒"}></ShortnoteLists>
                <ShortnoteLists topic={"Basic java programigng"} course={"course"} date={"05/12/22"} lock={"🔒"}></ShortnoteLists>
            </VStack>
        </AppBody>
    )
}

export default index
