
import { announcement_language } from "@apiType/announcement"
import { FormControl, FormLabel, Select, Input, Textarea, Box, Text, Tag, TagCloseButton, TagLabel, Button, CloseButton } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import API from "src/function/API"

const MoreLangAdded: FC<{
    addLang: Function
    selectLang: number
    title: string
    dt: string
    onAdd: Function
    add:boolean
}> = ({ addLang, selectLang, title, dt, onAdd,add}) => {
    const [otherLang, setOtherLang] = React.useState<number>(selectLang)
    const [topic, setTopic] = React.useState(title)
    const [detail, setDetail] = React.useState(dt)
    const [lang,setlang] = useState<announcement_language[]>([])
    const newData = API.get("/announcement/getotherlang")
    useEffect(() => {
        newData.then(res => setlang(res.data))
    },[])
    // console.log(lang);
    const cutENG = lang.filter((el) => {return el.languageId != 1000})
    // console.log(selectLang);
    

    return (
        <Box pl={"1rem"} borderLeft="1px" borderLeftColor={"#000"} my="10">
           <Tag
                height={"1.5"}
                size={"lg"}
                key={"lg"}
                borderRadius="full"
                variant="solid"
                backgroundColor={"blue.600"}
                mb="2rem"
            >
                <TagLabel>Other Languages</TagLabel>
                <CloseButton disabled={add}/>
            </Tag>
            <FormControl isRequired>
                <FormLabel>Select Language</FormLabel>
                <Select
                    placeholder="Select language"
                    onChange={(e) => setOtherLang(parseInt(e.target.value + ""))}
                    disabled={add}
                    value={otherLang}
                    bg="white"
                >
                   {cutENG.map((el,index) => {
                        return <option key={index} value={el.languageId}>{el.language}</option>
                    })}
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} disabled={add} value={topic} bg="white" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Detail</FormLabel>
                <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} disabled={add} value={detail} bg="white" />
            </FormControl>
            <Text color={"red.300"} fontSize={"0.8rem"} my={"2"}>
                Note: if you added, you can't change it anymore
            </Text>
            <Button
                onClick={() => {
                    addLang(parseInt(otherLang + ""), topic, detail), onAdd()
                }}
                disabled={add}
                bg="blue.700"
                color="white"
            >
                Add
            </Button>
        </Box>
    )
}

export default MoreLangAdded
