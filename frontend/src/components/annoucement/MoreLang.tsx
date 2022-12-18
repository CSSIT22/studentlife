import { announcement_language, post_to_language2 } from "@apiType/announcement"
import { FormControl, FormLabel, Select, Input, Textarea, Box, Text, Tag, TagCloseButton, TagLabel, Button, CloseButton, Grid, GridItem } from "@chakra-ui/react"
import React, { FC, useEffect, useMemo, useState } from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import API from "src/function/API"

const MoreLang: FC<{
    onClick: Function
    addLang: Function
    onDisable: Function
    addMoreLang:post_to_language2[]
}> = ({ onClick, addLang, onDisable ,addMoreLang}) => {
    const [otherLang, setOtherLang] = React.useState(String)
    const [topic, setTopic] = React.useState(String)
    const [detail, setDetail] = React.useState(String)
    const [disable, setDisable] = React.useState(false)
    const [lang, setlang] = useState<announcement_language[]>([])
    const newData = API.get("/announcement/getotherlang")
    useEffect(() => {
        newData.then(res => setlang(res.data))
    }, [])
    const cutENG = lang.filter((el) => { return el.languageId != 1000 })

    const usedLangs = useMemo(() => {
        const langs: any = {};
        addMoreLang.forEach((item: post_to_language2) => {
          langs[item.languageId.toString()] = true;
        });
        return langs;
      }, [addMoreLang]);


    return (
        <form target="javascript:void())" >
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
                    <CloseButton disabled={disable} onClick={() => onClick()} />
                </Tag>
                <FormControl isRequired>
                    <FormLabel>Select Language</FormLabel>
                    <Select placeholder="Select language" onChange={(e) => setOtherLang(e.target.value)} disabled={disable} bg="white">
                        {cutENG.map((el, index) => {
                            return <option key={index} value={el.languageId} disabled={usedLangs[el.languageId]}>{el.language}</option>
                        })}
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
                    type={"submit"}
                    disabled={disable}
                    bg="blue.700"
                    color="white"
                    onClick={(e) => {
                        if (!otherLang || !topic || !detail) {
                            return;
                        }
                        addLang(parseInt(otherLang), topic, detail), setDisable(true), onDisable()
                    }}
                >
                    Add
                </Button>
            </Box>
        </form >

    )
}

export default MoreLang