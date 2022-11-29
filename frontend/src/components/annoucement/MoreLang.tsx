import { addMoreLangType, announcement_language } from "@apiType/announcement"
import {
    FormControl,
    FormLabel,
    Select,
    Input,
    Textarea,
    Box,
    Text,
    Tag,
    TagCloseButton,
    TagLabel,
    Button,
    CloseButton,
    Grid,
    GridItem,
} from "@chakra-ui/react"
import React, { FC, useEffect, useMemo, useState } from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { useLocation, useNavigate, useSearchParams, createSearchParams } from "react-router-dom"
import API from "src/function/API"

const MoreLang: FC<{
    onClick: Function
    addLang: Function
    onDisable: Function
    addMoreLang: addMoreLangType[]
}> = ({ onClick, addLang, onDisable, addMoreLang }) => {
    const [otherLang, setOtherLang] = React.useState(String)
    const [topic, setTopic] = React.useState(String)
    const [detail, setDetail] = React.useState(String)
    const [disable, setDisable] = React.useState(false)
    const [lang, setlang] = useState<announcement_language[]>([])
    const newData = API.get("/announcement/getotherlang")

    const usedLangs = useMemo(() => {
        const langs: any = {}
        addMoreLang.forEach((item: addMoreLangType) => {
            langs[item.languageId.toString()] = true
        })
        return langs
    }, [addMoreLang])

    //console.log(addMoreLang)
    //console.log(usedLangs)

    useEffect(() => {
        newData.then((res) => setlang(res.data))
    }, [])
    // console.log(lang);
    const cutENG = lang.filter((el) => {
        return el.languageId != 1000
    })
    // console.log(cutENG);
    // console.log(otherLang);

   // const navigate = useNavigate()
    const toCreate = (e:any) => {
        setOtherLang(e.target.value)
        //const a = parseInt(otherLang)
        //cutENG.filter((el) => {
        //    if (a == el.languageId) {
        //        return navigate("/announcement/create", { state: { value: el.language } });
        //    }
        //})
        // navigate({
        //     pathname: "/announcement/create",
        //     search: createSearchParams({
        //         id: e.target.value,
        //     }).toString(),
        // })
    }

    return (
        <Box pl={"1rem"} borderLeft="1px" borderLeftColor={"#000"} my="10">
            <Tag height={"1.5"} size={"lg"} key={"lg"} borderRadius="full" variant="solid" backgroundColor={"blue.600"} mb="2rem">
                <TagLabel>Other Languages</TagLabel>
                <CloseButton disabled={disable} onClick={() => onClick()} />
            </Tag>
            <FormControl isRequired>
                <FormLabel>Select Language</FormLabel>
                <Select placeholder="Select language" onChange={toCreate} disabled={disable} bg="white">
                    {cutENG.map((el, index) => {
                        return (
                            <option key={index} value={el.languageId} disabled={usedLangs[el.languageId]}>
                                {el.language}
                            </option>
                        )
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
