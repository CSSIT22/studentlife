import { Box, Container, HStack, VStack } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { IconButton, Heading } from "@chakra-ui/react"
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"
import { CgProfile } from "react-icons/cg";
import { MdOutlineDriveFileRenameOutline, MdPostAdd, MdColorLens, MdFlag } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import React from "react"
import AppBody from "../../../components/share/app/AppBody"

const Property = () => {
    return (
        <AppBody>
            <HStack spacing="24px">
                <IconButton aria-label="Back to chat room" size="md" icon={<ArrowBackIcon />} />
                <Heading size="lg">Chat properties</Heading>
            </HStack>
            <VStack marginLeft={20} marginTop={10} spacing={12} align="flex-start" fontSize="20">
                <HStack><CgProfile></CgProfile><Box>View Profile</Box></HStack>
                <HStack><MdOutlineDriveFileRenameOutline></MdOutlineDriveFileRenameOutline><Box>Set room name</Box></HStack>
                <HStack><RiUserSettingsLine></RiUserSettingsLine><Box>Set nickname</Box></HStack>
                <HStack><MdPostAdd></MdPostAdd><Box>Add quote</Box></HStack>
                <HStack><MdColorLens></MdColorLens><Box>Change room color</Box></HStack>
                <HStack><MdFlag></MdFlag><Box>Report user</Box></HStack>
            </VStack>
        </AppBody>
    )
}
export default Property
