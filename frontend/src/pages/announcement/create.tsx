import {
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
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { GrClose } from "react-icons/gr"
import { Link } from "react-router-dom"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import { IoAdd } from "react-icons/all"
import MoreLang from "../../components/annoucement/MoreLang"
import { addMoreLangType, post, post_to_language2, tgType } from "@apiType/announcement"
import API from "src/function/API"
import AnnounceError from "src/components/annoucement/AnnounceError"
import AnnounceLoading from "src/components/annoucement/AnnounceLoading"
import AnnounceNav from "src/components/annoucement/AnnounceNav"
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
    const [event, setEvent] = React.useState(Date)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [tv, settv] = useState<tgType[]>([])
    const value = API.get("/announcement/gettypetarget")
    const [formState, setFormState] = useState<
        "unchanged" | "modified" | "saving"
    >("unchanged");


    useEffect(() => {
        value.then((res) => settv(res.data)).catch(err => on()).finally(off)

        const handler = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
        };
        if (formState == "modified") {
            window.addEventListener("beforeunload", handler);
            return () => {
                window.removeEventListener("beforeunload", handler);
            }
        }
    }, [formState])


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


    const [navi, setNav] = useState(true);
    useEffect(() => {
        const history = window.history as any;
        var pushState = window.history.pushState;
        history.pushState = function (state: any) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({ state: state });
            }
            // const nav = true;
            // false cannot navigate

            if (navi) {
                return pushState.apply(history, arguments as any);
            } else {
                const cancelRef = useRef()
            }
        };

        return () => {
            window.history.pushState = pushState
        }
    }, [navi])


    const disabledDates = () => {
        var today, dd, mm, yyyy
        today = new Date()
        dd = today.getDate()
        mm = today.getMonth() + 1
        yyyy = today.getFullYear()
        return yyyy + "-" + mm + "-" + dd
    }
    const [addMoreLang, setAddMoreLang] = React.useState<post_to_language2[]>([])


    const addPost = (title: string, detail: string, targetType: string, targetValue: string, event: string, expired: Date, addMoreLang: post_to_language2[]) => {
        API.post<post>("/announcement/createpost", {
            topic: title,
            detail: event + "~" + detail,
            targetType: targetType,
            targetValue: targetValue,
            expiredPost: expired,
            addmorelang: addMoreLang,
        })
    }



    const addLang = (lang: number, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang, { languageId: lang, annTopic: topic, annDetail: detail }])
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
    const isErrorForm: boolean = topic.length > 120
    console.log(isErrorForm);


    return (
        <AnnounceNav>
            {(() => {
                if (isLoading && !isError) {
                    return <AnnounceLoading />
                } else {
                    if (isError) {
                        return <AnnounceError />
                    } else {
                        return (
                            <>
                                <form
                                    onSubmit={(e) => {
                                        onOpen()
                                        e.preventDefault()
                                        addPost(topic, detail, targetType, targetValue, event, new Date(expired), addMoreLang)
                                        setFormState("saving")
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
                                        <FormControl isRequired isInvalid={isErrorForm}>
                                            <FormLabel>Title</FormLabel>
                                            <Input placeholder="Title" maxLength={120} onChange={(e) => {
                                                if (e.target.value !== "") {
                                                    setFormState("modified");
                                                    setNav(false);
                                                } else {
                                                    setFormState("unchanged");
                                                    setNav(true)
                                                }
                                                setTopic(e.target.value)
                                            }} bg="white" />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Detail</FormLabel>
                                            <Textarea placeholder="Detail" rows={10} onChange={(e) => {
                                                if (e.target.value !== "") {
                                                    setFormState("modified");
                                                    setNav(false);
                                                } else {
                                                    setFormState("unchanged");
                                                    setNav(true)
                                                } setDetail(e.target.value)
                                            }} bg="white" />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Target Group</FormLabel>
                                            <Flex>
                                                <Select placeholder="Select Type" pr={"2"} onChange={(el) => {
                                                    if (el.target.value !== "") {
                                                        setFormState("modified");
                                                        setNav(false);
                                                    } else {
                                                        setFormState("unchanged");
                                                        setNav(true)
                                                    } setTargetType(el.target.value)
                                                }} bg="white">
                                                    <option>Everyone</option>
                                                    <option>Year</option>
                                                    <option>Major</option>
                                                    <option>Faculty</option>
                                                </Select>
                                                {selectTargetValue(targetType)}
                                            </Flex>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Event Date</FormLabel>
                                            <Input
                                                placeholder="Select expired date"
                                                size="md"
                                                type="date"
                                                min={disabledDates()}
                                                onChange={(e) => {
                                                    if (e.target.value !== "") {
                                                        setFormState("modified");
                                                        setNav(false);
                                                    } else {
                                                        setFormState("unchanged");
                                                        setNav(true)
                                                    } setEvent(e.target.value)
                                                }}
                                                bg="white"
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Expired Date</FormLabel>
                                            <Input
                                                placeholder="Select expired date"
                                                size="md"
                                                type="date"
                                                min={disabledDates()}
                                                onChange={(e) => {
                                                    if (e.target.value !== "") {
                                                        setFormState("modified");
                                                        setNav(false);
                                                    } else {
                                                        setFormState("unchanged");
                                                        setNav(true)
                                                    } setExpired(e.target.value)
                                                }}
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
                            </>
                        )
                    }
                }
            })()}
        </AnnounceNav>

    )
}

export default create