import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Center,
    Box,
    Image,
    MenuDivider,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Menu,
    MenuButton,
} from "@chakra-ui/react"
import React, { FC } from "react"

function PostType_modal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box>
                <Button onClick={onOpen} colorScheme="orange">
                    Post Type
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Which place do you want to post?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Menu>
                            <MenuOptionGroup type="checkbox">
                                <MenuItemOption value="public">Public</MenuItemOption>
                            </MenuOptionGroup>
                            <MenuDivider />
                            <MenuOptionGroup title="Community Group" type="checkbox">
                                <MenuItemOption value="Group_1">G1</MenuItemOption>
                                <MenuItemOption value="Group_2">G2</MenuItemOption>
                                <MenuItemOption value="Group_3">G3</MenuItemOption>
                                <MenuItemOption value="Group_4">G4</MenuItemOption>
                                <MenuItemOption value="Group_5">G5</MenuItemOption>
                                <MenuItemOption value="Group_6">G6</MenuItemOption>
                                <MenuItemOption value="Group_7">G7</MenuItemOption>
                                <MenuItemOption value="Group_8">G8</MenuItemOption>
                                <MenuItemOption value="Group_9">G9</MenuItemOption>
                                <MenuItemOption value="Group_10">G10</MenuItemOption>
                            </MenuOptionGroup>
                        </Menu>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="orange" mr={3} onClick={onClose}>
                            Select
                        </Button>
                        {/* <Button variant="ghost">Close</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostType_modal
