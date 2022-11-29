import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Spacer,
    Stack,
    Tag,
    TagCloseButton,
    TagLabel,
    TagLeftIcon,
    Text,
    Textarea,
    Box,
    Show,
    Heading,
    useBoolean,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { Link, To } from "react-router-dom"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import AppBody from "../../components/share/app/AppBody"
import { IoAdd } from "react-icons/all"
import MoreLang from "../../components/annoucement/MoreLang"
import { postInfoTest } from "./postInfoTest"
import { addMoreLangType, post, post_to_language2, tgType } from "@apiType/announcement"
import API from "src/function/API"

const create = () => {



    const [isOpen, setIsOpen] = React.useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }
    const onClose = () => {
        setIsOpen(false)
    }
    const modalCreate = {
        topic: "Sent announcement",
        detail: " The announcement request has been sent.",
        event: "OK",
    }

    const [topic, setTopic] = React.useState(String)
    const [detail, setDetail] = React.useState(String)
    const [targetType, setTargetType] = React.useState(String)
    const [targetValue, setTargetValue] = React.useState("")
    const [expired, setExpired] = React.useState(Date)

    const [tv, settv] = useState<tgType[]>([])
    const value = API.get("/announcement/gettypetarget")
    useEffect(() => {
        value.then((res) => settv(res.data))
        // console.log(value);
    }, [])
    // console.log(targetValue);
    // const b = tv.map((el:string[]) => {return el.Faculty})







    const selectTargetValue = (targetType: string) => {
        if (targetType == "Faculty") {
            return (
                <Select placeholder="Select Faculty" onChange={(el) => setTargetValue(el.target.value)} bg="white">
                    {tv[0]?.Faculty.map((el, index) => {
                        return <option key={index}>{el}</option>
                    })}
                </Select>
            )
        } else if (targetType == "Major") {
            return (
                <Select placeholder="Select Major" onChange={(el) => setTargetValue(el.target.value)} bg="white">
                    {tv[0]?.Major.map((el, index) => {
                        return <option key={index}>{el}</option>
                    })}
                </Select>
            )
        } else if (targetType == "Year") {
            return (
                <Select placeholder="Select Year" onChange={(el) => setTargetValue(el.target.value)} bg="white">
                    {tv[0]?.Year.map((el, index) => {
                        return <option key={index}>{el}</option>
                    })}
                </Select>
            )
        } else {
            return ""
        }
    }


    const disabledDates = () => {
        var today, dd, mm, yyyy
        today = new Date()
        dd = today.getDate()
        mm = today.getMonth() + 1
        yyyy = today.getFullYear()
        return yyyy + "-" + mm + "-" + dd
    }
    const [addMoreLang, setAddMoreLang] = React.useState<post_to_language2[]>([])
    // const [allPost, setAllPost] = React.useState<post[]>(postInfoTest)
    // console.log(addMoreLang);

    const addPost = (title: string, detail: string, targetType: string, targetValue: string, expired: Date, addMoreLang: post_to_language2[]) => {
        // setAllPost([
        //     ...allPost,
        //     {
        //         postId: allPost.length,
        //         userId: "0" + allPost.length + 1,
        //         lang_id: 1000,
        //         topic: title,
        //         detail: detail,
        //         sender: "SAMO-SIT",
        //         status: "waiting",
        //         pinStatus: false,
        //         isApprove: false,
        //         targetType: targetType,
        //         targetValue: targetValue,
        //         postAt: new Date(),
        //         expiredOfPost: expired,
        //         expiredAfterDelete: null,
        //         addMoreLang: addMoreLang,
        //     },
        // ])
        API.post<post>("/announcement/createpost", {
            topic: title,
            detail: detail,
            targetType: targetType,
            targetValue: targetValue,
            expiredPost: expired,
            addmorelang: addMoreLang,
        })


    }
    // console.log(allPost)

    // console.log(expired);
    const addLang = (lang: number, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang, { languageId: lang, annTopic: topic, annDetail: detail }])
    }
    // console.log(addMoreLang)

    const ALERT = () => {
        alert("Topic:" + topic + " detail:" + detail + " targetType:" + targetType + " targetValue:" + targetValue + " expired date:" + expired)
        window.history.go(-1)
    }
    const AddLang = () => {
        setMoreLangField([...moreLangField, { count: count }])
    }
    const [count, setCount] = React.useState(0)
    const increaseCount = () => {
        setCount(count + 1)
        AddLang()
    }

    const decreaseCount = () => {
        setCount(count - 1)
        setMoreLangField(moreLangField.filter((el) => el.count != count - 1))
    }

    const [moreLangField, setMoreLangField] = React.useState<any[]>([])


    const [disable, setdisable] = useState(true)
    const onDisable = () => {
        setdisable(!disable)
    }
    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{ md: "3rem" }}
        >
            {/* <Form> */}
            <form
                onSubmit={(e) => {
                    onOpen()
                    e.preventDefault()
                    addPost(topic, detail, targetType, targetValue, new Date(expired), addMoreLang)
                }}
            >
                <Flex alignItems={"center"}>
                    <Show below="lg">
                        <Text as={"b"} fontSize="xl">
                            <Link to={"/announcement"}>
                                <Box>
                                    <GrClose />
                                </Box>
                            </Link>
                        </Text>
                    </Show>
                    <Spacer />
                    <Box textAlign={"right"}>
                        <Input type={"submit"} value="Announce" backgroundColor={"#DD6B20"} color="white" cursor="pointer" shadow={"md"} />
                        <ModalForEvent
                            isOpen={isOpen}
                            onClose={onClose}
                            topic={modalCreate.topic}
                            detail={modalCreate.detail}
                            status={modalCreate.event}
                            allPost={""}
                            setAllPost={""}
                            onClick={onClose}
                        />
                    </Box>
                </Flex>
                <Stack spacing={3} p="5" color="black">
                    <FormControl>
                        <FormLabel>Language</FormLabel>
                        <Select isDisabled placeholder="English" value={1000} bg="white"></Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} bg="white" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Detail</FormLabel>
                        <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} bg="white" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Target Group</FormLabel>
                        <Flex>
                            <Select placeholder="Select Type" pr={"2"} onChange={(el) => setTargetType(el.target.value)} bg="white">
                                <option>Everyone</option>
                                <option>Year</option>
                                <option>Major</option>
                                <option>Faculty</option>
                            </Select>
                            {selectTargetValue(targetType)}
                        </Flex>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Expired Date</FormLabel>
                        <Input
                            placeholder="Select expired date"
                            size="md"
                            type="date"
                            min={disabledDates()}
                            onChange={(e) => setExpired(e.target.value)}
                            bg="white"
                        />
                    </FormControl>
                    <FormControl>
                        <>
                            {moreLangField.map((el) => {
                                return <MoreLang key={el.count} onClick={decreaseCount} addLang={addLang} onDisable={onDisable} addMoreLang={addMoreLang} />
                            })}
                            <Tag
                                size={"lg"}
                                key={"lg"}
                                variant="subtle"
                                backgroundColor={"#DD6B20"}
                                color="white"
                                onClick={increaseCount}
                                cursor={"pointer"}
                            >
                                <TagLeftIcon boxSize="1.5rem" as={IoAdd} />
                                <TagLabel>Add More Language</TagLabel>
                            </Tag>
                        </>
                    </FormControl>
                </Stack>
            </form>
            {/* </Form> */}
        </AppBody>
    )
}

export default create