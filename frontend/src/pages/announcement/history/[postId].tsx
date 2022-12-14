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
import { addMoreLangType, announcement, post, post_to_language, post_to_language2, tgType } from "@apiType/announcement"
import API from "src/function/API"
import MoreLangForEdit from "src/components/annoucement/MoreLangForEdit"
import AppBody from "src/components/share/app/AppBody"
import ModalForEvent from "src/components/annoucement/ModalForEvent"
import MoreLang from "src/components/annoucement/MoreLang"
import { postInfoTest } from "../postInfoTest"
import MoreLangAdded from "src/components/annoucement/MoreLangAdded"
import AnnounceError from "src/components/annoucement/lotties/AnnounceError"
import AnnounceNav from "src/components/annoucement/AnnounceNav"

const history = () => {
    const params = useParams()
    const [allPost, setAllPost] = React.useState(postInfoTest)
    const [topic, setTopic] = React.useState<string>()
    const [detail, setDetail] = React.useState<string>()
    const [targetType, setTargetType] = React.useState<string>()
    const [targetValue, setTargetValue] = React.useState<string>()
    const [expired, setExpired] = React.useState<string | undefined>()
    const [toggle, settoggle] = useState(false)
    const [morelanglength, setmorelanglength] = useState(Number)
    const [post, setpost] = React.useState<announcement[]>([])

    const [moreLangField, setMoreLangField] = React.useState<any[]>([])
    const [addMoreLang, setAddMoreLang] = React.useState<post_to_language2[]>([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [add, setAdd] = React.useState(0)
    const [exmoreLang, setexMoreLang] = React.useState<post_to_language2[]>([])
    const [count, setCount] = React.useState(0)
    const [disable, setdisable] = useState(false)

    const tog = () => {
        settoggle(!toggle)
    }

    let d: Date
    const [isError, { on }] = useBoolean()
    const [tv, settv] = useState<tgType[]>([])

    async function getPost() {
        await API.get("/announcement/getdetailedit/" + params.postId).then((item) => {
            setpost(item.data)
            setTopic(item.data[0].annLanguage[0].annTopic)
            setDetail(item.data[0].annLanguage[0].annDetail)
            setTargetType(item.data[0].annFilter.filterType)
            setTargetValue(item.data[0].annFilter.value)
            d = new Date(item.data[0].annExpired)
            if (d.getMonth() < 10) {
                const nm = "0" + (d.getMonth() + 1)
                if (d.getDate() < 10) {
                    const nd = "0" + (d.getDate())
                    setExpired(d.getFullYear() + "-" + nm + "-" + nd)
                } else {
                    setExpired(d.getFullYear() + "-" + nm + "-" + d.getDate())
                }

            } else if (d.getDate() < 10) {
                const nd = "0" + d.getDate()
                if (d.getMonth() < 10) {
                    const nm = "0" + (d.getMonth() + 1)
                    setExpired(d.getFullYear() + "-" + nm + "-" + nd)
                } else {
                    setExpired(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + nd)
                }
            } else {
                setExpired(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())
            }


            setexMoreLang(item.data[0].annLanguage.filter((el: any) => el.languageId > 1000))

            setmorelanglength(item.data[0].annLanguage.filter((el: any) => el.languageId > 1000).length)
        }).catch(err => on())

        await API.get("/announcement/gettypetarget").then(item => settv(item.data))
    }





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
                    {tv[0]?.Faculty.map((el, index) => {
                        return <option key={index}>{el}</option>
                    })}
                </Select>
            )
        } else if (tgType == "Major") {
            return (
                <Select placeholder="Select Major" onChange={(el) => setTargetValue(el.target.value)} value={targetValue} bg="white">
                    {tv[0]?.Major.map((el, index) => {
                        return <option key={index}>{el}</option>
                    })}
                </Select>
            )
        } else if (tgType == "Year") {
            return (
                <Select placeholder="Select Year" onChange={(el) => setTargetValue(el.target.value)} value={targetValue} bg="white">
                    {tv[0]?.Year.map((el, index) => {
                        return <option key={index}>{el}</option>
                    })}
                </Select>
            )
        } else {
            return ""
        }
    }

    const onAdd = () => {
        setAdd(add + 1)
    }

    const addLang = (lang: number, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang, { languageId: lang, annTopic: topic, annDetail: detail }])
    }

    const AddLang = () => {
        setMoreLangField([...moreLangField, { count: count }])
    }

    const increaseCount = () => {
        setCount(count + 1)
        AddLang()
        setdisable(true)
    }


    const decreaseCount = () => {
        setCount(count - 1)
        setMoreLangField(moreLangField.filter((el) => el.count != count - 1))
    }


    const decreaseForEdit = (langid: number) => {
        setmorelanglength(morelanglength - 1)
        setexMoreLang(exmoreLang.filter((el) => { return el.languageId != langid }))
    }

    const onDisable = () => {
        setdisable(false)
        setMoreLangField(moreLangField.filter((el) => el.count == count))
    }


    const updateMoreLang = (add: Number) => {
        if (add == morelanglength) {
            return addMoreLang.map((el, index) => {
                return (
                    <MoreLangAdded
                        title={el.annTopic}
                        dt={el.annDetail}
                        selectLang={el.languageId}
                        key={index}
                        addLang={addLang}
                        onAdd={onAdd}
                        add={true}
                    />
                )
            })
        } else {

            return exmoreLang?.map((el) => {

                return (
                    <MoreLangForEdit
                        // id={Date.now()}
                        onDecrease={decreaseForEdit}
                        addLang={addLang}
                        selectLang={el.languageId}
                        title={el.annTopic}
                        dt={el.annDetail}
                        key={el.languageId}
                        onAdd={onAdd}
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
                        if you sure about the the more lang that you edit, you need to click add then you can't edit anymore
                    </Text>
                    {updateMoreLang(add)}
                    <Text fontSize={"0.8rem"} color="red.300" mt="5">
                        if you sure about the the more lang that you edit, you need to click add then you can't edit anymore
                    </Text>
                </>
            )
        } else {
            return (
                updateMoreLang(add)
            )
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
            postid: params.postId,
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
        <AnnounceNav>
            {(() => {
                if (isError) {
                    return <AnnounceError />
                } else {
                    return (
                        <>
                            <form
                                onSubmit={(e) => {
                                    tog()
                                    onOpen()
                                    // e.preventDefault()
                                    e.stopPropagation()
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
                                            {showMoreLang(morelanglength, add)}
                                            {disable && moreLangField?.map((_, index) => {
                                                return <MoreLang key={index} onClick={decreaseCount} addLang={addLang} onDisable={onDisable} addMoreLang={addMoreLang} />
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
                        </>
                    )
                }
            })()}
        </AnnounceNav>

    )
}

export default history