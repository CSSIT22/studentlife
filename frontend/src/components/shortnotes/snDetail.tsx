import React, { FC } from "react"
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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    IconButton,
} from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi"

const liList: FC<{
    topic: String
    course: String
    desc: String
    link: String
}> = ({ topic, course, desc, link }) => {
    return (
        <Box>
            <HStack>
                <Heading size={"lg"} mb={1}>
                    {topic}
                </Heading>
                <Spacer />
                <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<HiDotsHorizontal />} variant="ghost" />
                    <MenuList>
                        <MenuItem>Add to library</MenuItem>
                        <MenuItem>Upload file</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>

            <Heading size={"sm"} bg={"orange"} rounded={8} w={20} py={1} textAlign={"center"} mb={4} boxShadow={"xl"}>
                {course}
            </Heading>
            <Box mb={4}>
                <Heading size={"md"}>Description</Heading>
                <Text>{desc}</Text>
            </Box>
            <Box>
                <Heading size={"md"}>Link</Heading>
                <Text>{link}</Text>
            </Box>
        </Box>
    )
}

export default liList
