import { FormControl, FormLabel, Select, Input, Textarea, Box, Text, Tag, TagCloseButton, TagLabel, Button } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsPlusCircleFill } from "react-icons/bs"

const MoreLang: FC<{
    onClick: Function
    addLang: Function
    onDisable: Function
}> = ({ onClick, addLang, onDisable }) => {
    const [otherLang, setOtherLang] = React.useState(String)
    const [topic, setTopic] = React.useState(String)
    const [detail, setDetail] = React.useState(String)
    const [disable, setDisable] = React.useState(false)
    return (
        <Box pl={"1rem"} borderLeft="1px" borderLeftColor={"#000"} my="10">
            <Tag
                height={"1.5"}
                size={"lg"}
                key={"lg"}
                borderRadius="full"
                variant="solid"
                colorScheme="blackAlpha"
                mb="2rem"
                onClick={() => onClick()}
            >
                <TagLabel>Other Languages</TagLabel>
                <TagCloseButton />
            </Tag>
            <FormControl isRequired>
                <FormLabel>Select Language</FormLabel>
                <Select placeholder="Select language" onChange={(e) => setOtherLang(e.target.value)} disabled={disable} bg="white">
                    <option value={1001}>Thai</option>
                    <option value={1002}>Korea</option>
                    <option value={1003}>Japanese</option>
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} disabled={disable} bg="white" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Detail</FormLabel>
                <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} disabled={disable} bg="white" />
            </FormControl>
            <Text color={"red.300"} fontSize={"0.8rem"} my={"2"}>
                Note: if you added, you can't change it anymore
            </Text>
            <Button
                onClick={() => {
                    addLang(parseInt(otherLang), topic, detail), setDisable(true), onDisable()
                }}
                disabled={disable}
                bg="blue.700"
                color="white"
            >
                Add
            </Button>
        </Box>
    )
}

export default MoreLang
