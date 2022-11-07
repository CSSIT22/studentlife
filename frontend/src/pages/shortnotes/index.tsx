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
    Square,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    RadioGroup,
    Radio,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"
import Rsn from "../../components/shortnotes/index/rsnList"
import Sn from "../../components/shortnotes/index/snList"
import Li from "../../components/shortnotes/library/liList"
import BtnMl from "../../components/shortnotes/index/btnMyLibrary"
import BtnNs from "../../components/shortnotes/index/btnNewShortnote"
const index = () => {
    const { isOpen: mlIsOpen, onOpen: mlOnOpen, onClose: mlOnClose } = useDisclosure()
    const { isOpen: nlIsOpen, onOpen: nlOnOpen, onClose: nlOnClose } = useDisclosure()
    const { isOpen: nsIsOpen, onOpen: nsOnOpen, onClose: nsOnClose } = useDisclosure()

    const btnRef = React.useRef()

    const [useRadio, setRadio] = useState("Public")

    const closeSnModal = () => {
        nsOnClose()
        setRadio("Public")
    }
    return (
        <AppBody>
            {/*Recent view list section*/}
            <Flex mt={10}>
                <Text alignSelf={"end"}>Recent view</Text>
                <Spacer />
                <BtnMl />
            </Flex>
            <Box mt={4} mb={12}>
                <SimpleGrid columns={3} gap={6} textAlign={"center"}>
                    <Rsn topic={"Shortnote 001"}></Rsn>
                    <Rsn topic={"Shortnote 002"}></Rsn>
                    <Rsn topic={"Shortnote 003"}></Rsn>
                </SimpleGrid>
            </Box>

            {/*Shortnote list section*/}
            <Flex alignItems={"end"}>
                <BtnNs />
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
                <Sn topic={"Shortnote 001"} course={"SNS001"} date={"16/04/46"} lock={"🔒"}></Sn>
                <Sn topic={"Datalink layer"} course={"CSC220"} date={"22/07/19"} lock={""}></Sn>
                <Sn topic={"Basic java programigng"} course={"CSC110"} date={"05/12/22"} lock={""}></Sn>
                <Sn topic={"Shortnote 001"} course={"SNS001"} date={"16/04/46"} lock={"🔒"}></Sn>
                <Sn topic={"Datalink layer"} course={"CSC220"} date={"22/07/19"} lock={"🔒"}></Sn>
                <Sn topic={"Basic java programigng"} course={"CSC110"} date={"05/12/22"} lock={""}></Sn>
            </VStack>
        </AppBody>
    )
}

export default index
