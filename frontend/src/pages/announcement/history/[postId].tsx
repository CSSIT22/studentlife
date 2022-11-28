import {
    Flex,
    Spacer,
    Stack,
    FormControl,
    FormLabel,
    Select,
    Input,
    Textarea,
    Tag,
    TagLeftIcon,
    TagLabel,
    Text,
    Box,
    Show,
    useBoolean,
    Heading,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { GrClose } from "react-icons/gr"
import { IoAdd } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import { addMoreLangType, post } from "@apiType/announcement"
import API from "src/function/API"
import MoreLangForEdit from "src/components/annoucement/MoreLangForEdit"
import AppBody from "src/components/share/app/AppBody"
import ModalForEvent from "src/components/annoucement/ModalForEvent"
import MoreLang from "src/components/annoucement/MoreLang"
import { postInfoTest } from "../postInfoTest"

const history = () => {
    // const [isError, {on}] = useBoolean()
    const params = useParams()
    // console.log(params.postId);
    const [allPost, setAllPost] = React.useState(postInfoTest)
    const postParams = allPost.filter((el) => {
        return el.postId == parseInt(params.postId + "")
    })
    const [topic, setTopic] = React.useState<string>()
    const [detail, setDetail] = React.useState<string>()
    const [targetType, setTargetType] = React.useState<string | undefined>()
    const [targetValue, setTargetValue] = React.useState<string>()
    const [expired, setExpired] = React.useState<string | undefined>()
    const [toggle, settoggle] = useState(false)
    const [post, setpost] = React.useState<post[]>([])
    const [moreLangField, setMoreLangField] = React.useState<any[]>([])
    const [addMoreLang, setAddMoreLang] = React.useState<addMoreLangType[]>([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [add, setAdd] = React.useState(0)
    const [exmoreLang, setexMoreLang] = React.useState<addMoreLangType[]>([])
    const [count, setCount] = React.useState(0)
    const [disable, setdisable] = useState(true)

    const tog = () => {
        settoggle(!toggle)
    }

    let d: Date

    const [tt, settt] = useState<addMoreLangType[]>([])

    async function getPost() {
        const getData = await API.get("/announcement/getdetailedit/" + params.postId)
        setpost(getData.data)
        setTopic(getData.data.topic)
        setDetail(getData.data.detail)
        setTargetType(getData.data.targetType)
        setTargetValue(getData.data.targetValue)
        d = new Date(getData.data.expiredOfPost)
        setExpired(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())
        setexMoreLang(getData.data.addMoreLang)
    }
    console.log(post)
    const moreLangLength = exmoreLang.length

    useEffect(() => {
        getPost()
    }, [toggle])

    const onOpen = () => {
        setIsOpen(true)
    }
    const onClose = () => {
        setIsOpen(false)
    }
    const modalEdit = {
        topic: "Sent announcement",
        detail: " The announcement request has been sent.",
        status: "edit",
    }

    const selectTargetValue = (tgType: string | undefined) => {
        if (tgType == "Faculty") {
            return (
                <Select placeholder="Select Faculty" onChange={(el) => setTargetValue(el.target.value)} value={targetValue} bg="white">
                    <option>Science</option>
                    <option>Engineering</option>
                    <option>Information Technology</option>
                    <option>Economics</option>
                </Select>
            )
        } else if (tgType == "Major") {
            return (
                <Select placeholder="Select Major" onChange={(el) => setTargetValue(el.target.value)} value={targetValue} bg="white">
                    <option>Computer Science</option>=<option>Math</option>
                    <option>Biology</option>
                    <option>Chemistry</option>
                </Select>
            )
        } else if (tgType == "Year") {
            return (
                <Select placeholder="Select Year" onChange={(el) => setTargetValue(el.target.value)} value={targetValue} bg="white">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </Select>
            )
        } else {
            return ""
        }
    }

    // console.log(addMoreLang);
    // const updatePost = () => {
    //     setAllPost(
    //         allPost.map((el) => {
    //             if (el.postId == parseInt(params.postId + "")) {
    //                 el.topic = topic
    //                 el.detail = detail
    //                 el.targetType = targetType
    //                 el.targetValue = targetValue
    //                 el.expiredOfPost = new Date(expired)
    //                 el.addMoreLang = addMoreLang
    //             }
    //             return el
    //         })
    //     )
    // }
    // console.log(allPost)

    const onAdd = () => {
        setAdd(add + 1)
    }

    const addLang = (lang: number, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang, { id: addMoreLang.length, lang_id: lang, topic: topic, detail: detail }])
    }

    const increaseCount = () => {
        setCount(count + 1)
        AddLang()
    }
    const decreaseCount = (id: number) => {
        setCount(count - 1)
        decreaseLang()
        setAddMoreLang(addMoreLang.filter((el) => el.id != id))
    }
    // console.log(count)

    const AddLang = () => {
        setMoreLangField([...moreLangField, { count: count }])
    }
    // console.log(moreLangField);

    const decreaseLang = () => {
        setAddMoreLang(moreLangField.pop())
    }
    console.log(moreLangLength)
    console.log(addMoreLang.length)
    const onDisable = () => {
        setdisable(!disable)
    }
    // console.log(disable);

    const updateMoreLang = (add: Number) => {
        if (add == moreLangLength) {
            return addMoreLang.map((el) => {
                return (
                    <MoreLangForEdit
                        id={el.id}
                        onDecrease={decreaseCount}
                        addLang={addLang}
                        selectLang={el.lang_id}
                        title={el.topic}
                        dt={el.detail}
                        key={el.id}
                        onAdd={onAdd}
                        add={true}
                    />
                )
            })
        } else {
            return exmoreLang.map((el) => {
                return (
                    <MoreLangForEdit
                        onDecrease={decreaseCount}
                        id={el.id}
                        addLang={addLang}
                        selectLang={el.lang_id}
                        title={el.topic}
                        dt={el.detail}
                        key={el.id}
                        onAdd={onAdd}
                        add={false}
                    />
                )
            })
        }
    }
    const showMoreLang = (moreLangLength: Number, add: Number) => {
        if (moreLangLength > 0) {
            return (
                <>
                    <Text fontSize={"0.8rem"} color="red.300" mt="5">
                        if you sure about the the more lang that you edit, you need to click add both origin more lang. Then it will be disabled
                    </Text>
                    {updateMoreLang(add)}
                    <Text fontSize={"0.8rem"} color="red.300" mt="5">
                        if you sure about the the more lang that you edit, you need to click add both origin more lang. Then it will be disabled
                    </Text>
                </>
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
    const submit = () => {
        API.post<post>("/announcement/editdetailpost", {
            postid: parseInt(params.postId + ""),
            topic: topic,
            detail: detail,
            targetType: targetType,
            targetValue: targetValue,
            postat: new Date(),
            expiredpost: expired,
            addMoreLang: addMoreLang,
        })
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
            <form
                onSubmit={(e) => {
                    tog()
                    onOpen()
                    e.preventDefault()
                    submit()
                }}
            >
                <Flex alignItems={"center"}>
                    <Show below="lg">
                        <Text as={"b"} fontSize="xl">
                            <Link to={"/announcement/history"}>
                                <GrClose />
                            </Link>
                        </Text>
                    </Show>
                    <Spacer />
                    <Box textAlign={"right"}>
                        <Input type={"submit"} value="Announce" backgroundColor={"#E65300"} color="white" cursor="pointer" />
                        <ModalForEvent
                            isOpen={isOpen}
                            onClose={onClose}
                            topic={modalEdit.topic}
                            detail={modalEdit.detail}
                            status={modalEdit.status}
                            allPost={allPost}
                            setAllPost={setAllPost}
                            //onclick not use in edit post
                            onClick={tog}
                        />
                    </Box>
                </Flex>
                <Stack spacing={3} p="5" color="black">
                    <FormControl>
                        <FormLabel>Language</FormLabel>
                        <Select isDisabled placeholder="English" bg="white"></Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} value={topic} bg="white" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Detail</FormLabel>
                        <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} value={detail} bg="white" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Target Group</FormLabel>
                        <Flex>
                            <Select
                                placeholder="Select Type"
                                pr={"2"}
                                onChange={(el) => setTargetType(el.target.value)}
                                value={targetType}
                                bg="white"
                            >
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
                            value={expired}
                            bg="white"
                        />
                    </FormControl>
                    <FormControl>
                        <>
                            {showMoreLang(moreLangLength, add)}
                            {disable &&
                                moreLangField.map((el) => {
                                    return <MoreLang key={el.count} onClick={decreaseCount} addLang={addLang} onDisable={onDisable} />
                                })}
                            <Tag
                                size={"lg"}
                                key={"lg"}
                                variant="subtle"
                                backgroundColor={"#DD6B20"}
                                color="white"
                                onClick={() => {
                                    increaseCount()
                                }}
                                cursor={"pointer"}
                                mt="5"
                            >
                                <TagLeftIcon boxSize="1.5rem" as={IoAdd} />
                                <TagLabel>Add More Language</TagLabel>
                            </Tag>
                        </>
                    </FormControl>
                </Stack>
            </form>
        </AppBody>
    )
}

export default history
