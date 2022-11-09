import { FormControl, FormLabel, Select, Input, Textarea, Box, Text, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsPlusCircleFill } from "react-icons/bs"

const MoreLang= () => {
    return (
        <Box pl={"1rem"} borderLeft="1px" borderLeftColor={"#DDDDDD"} my="10">
            <Tag height={"1.5"} size={"lg"} key={"lg"} borderRadius="full" variant="solid" colorScheme="blackAlpha" mb="2rem">
                <TagLabel>Other Languages</TagLabel>
                <TagCloseButton />
            </Tag>
            <FormControl isRequired>
                <FormLabel>Select Language</FormLabel>
                <Select placeholder="Select language">
                    <option>Thai</option>
                    <option>Japanese</option>
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Detail</FormLabel>
                <Textarea placeholder="Detail" size="sm" />
            </FormControl>
        </Box>
    )
}

export default MoreLang
