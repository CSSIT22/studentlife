import { FormControl, FormLabel, Select, Input, Textarea, Box, Text, Tag, TagCloseButton, TagLabel, Button } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsPlusCircleFill } from "react-icons/bs"

const MoreLangForEdit: FC<{
    onDecrease: Function
    addLang: Function
    selectLang: string
    title: string
    dt: string
    onAdd:Function
    add:boolean
}> = ({ onDecrease, addLang, selectLang, title, dt,onAdd,add }) => {
    const [otherLang, setOtherLang] = React.useState(selectLang)
    const [topic, setTopic] = React.useState(title)
    const [detail, setDetail] = React.useState(dt)
    const [disable, setDisable] = React.useState(false)
    console.log(disable)

    return (
        <Box pl={"1rem"} borderLeft="1px" borderLeftColor={"#DDDDDD"} my="10">
            <Tag
                height={"1.5"}
                size={"lg"}
                key={"lg"}
                borderRadius="full"
                variant="solid"
                colorScheme="blackAlpha"
                mb="2rem"
                onClick={() => onDecrease()}
            >
                <TagLabel>Other Languages</TagLabel>
                <TagCloseButton />
            </Tag>
            <FormControl isRequired>
                <FormLabel>Select Language</FormLabel>
                <Select placeholder="Select language" onChange={(e) => setOtherLang(e.target.value)} disabled={add} value={otherLang}>
                    <option>Thai</option>
                    <option>Korea</option>
                    <option>Japanese</option>
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} disabled={add} value={topic}/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Detail</FormLabel>
                <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} disabled={add} value={detail}/>
            </FormControl>
            <Text color={"red.300"} fontSize={"0.8rem"} my={"2"}>
                Note: if you added, you can't change it anymore
            </Text>
            <Button
                onClick={() => {
                    addLang(otherLang, topic, detail), setDisable(true), onAdd()
                }}
                disabled={disable}
            >
                Add
            </Button>
        </Box>
    )
}

export default MoreLangForEdit
