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
} from "@chakra-ui/react"
import React from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { Link, To } from "react-router-dom"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import AppBody from "../../components/share/app/AppBody"
import { IoAdd } from "react-icons/all"
import MoreLang from "../../components/annoucement/MoreLang"
import { postInfoTest } from "./postInfoTest"

const create = () => {
    const selectTargetValue = (targetType: string) => {
        if (targetType == "Faculty") {
            return (
                <Select placeholder="Select Faculty" onChange={(el) => setTargetValue(el.target.value)}>
                    <option>Science</option>
                    <option>Engineering</option>
                    <option>Information Technology</option>
                    <option>Economics</option>
                </Select>
            )
        } else if (targetType == "Major") {
            return (
                <Select placeholder="Select Major" onChange={(el) => setTargetValue(el.target.value)}>
                    <option>Computer Science</option>
                    <option>Math</option>
                    <option>Biology</option>
                    <option>Chemistry</option>
                </Select>
            )
        } else if (targetType == "Year") {
            return (
                <Select placeholder="Select Year" onChange={(el) => setTargetValue(el.target.value)}>
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
    const [allPost,setAllPost] = React.useState(postInfoTest);
    const addPost = (title: string, detail: string, targetType: string, targetValue: string, expired: string, addMoreLang: Array<any>) => {
        setAllPost([
            ...allPost, {
                postId: allPost.length,
                lang:"English",
                topic:title,
                detail:detail,
                sender:"1234",
                status:"waiting",
                pinStatus:false,
                isApprove:false,
                targetType:targetType,
                targetValue:targetValue,
                postAt: new Date(),
                expiredOfPost:expired, 
                expiredAfterDelete:"",
                addMoreLang:addMoreLang,
            }
        ])
    }
    console.log(allPost)

    const [topic, setTopic] = React.useState(String)
    const [detail, setDetail] = React.useState(String)
    const [targetType, setTargetType] = React.useState(String)
    const [targetValue, setTargetValue] = React.useState(String)
    const [expired, setExpired] = React.useState(Date)
    const [addMoreLang, setAddMoreLang] = React.useState<any[]>([])
    // console.log(expired);
    const addLang = (lang: string, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang, { lang: lang, topic: topic, detail: detail }])
    }
    // console.log(addMoreLang)

    const ALERT = () => {
        alert("Topic:" + topic + " detail:" + detail + " targetType:" + targetType + " targetValue:" + targetValue + " expired date:" + expired)
        window.history.go(-1)
    }

    const [count, setCount] = React.useState(0)
    const increaseCount = () => {
        setCount(count + 1)
        AddLang()
    }
    const decreaseCount = () => {
        setCount(count - 1)
        decreaseLang()
        setAddMoreLang(addMoreLang.pop())
    }
    // console.log(count)
    const [moreLangField, setMoreLangField] = React.useState<any[]>([])
    const AddLang = () => {
        setMoreLangField([...moreLangField, { count: count }])
    }
    // console.log(moreLangField)

    const decreaseLang = () => {
        setAddMoreLang(moreLangField.pop())
    }
    // console.log(moreLangField);
    // console.log(post);
    // const submit =useSubmit()
    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    // }
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
                    addPost(topic, detail, targetType, targetValue, expired, addMoreLang)
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
                        <Input type={"submit"} value="Announce" backgroundColor={"#E65300"} color="white" cursor="pointer" />
                        <ModalForEvent
                            isOpen={isOpen}
                            onClose={onClose}
                            topic={modalCreate.topic}
                            detail={modalCreate.detail}
                            status={modalCreate.event}
                            allPost={allPost}
                            setAllPost={setAllPost}
                        />
                    </Box>
                </Flex>
                <Stack spacing={3} p="5">
                    <FormControl>
                        <FormLabel>Language</FormLabel>
                        <Select isDisabled placeholder="English"></Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Detail</FormLabel>
                        <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Target Group</FormLabel>
                        <Flex>
                            <Select placeholder="Select Type" pr={"2"} onChange={(el) => setTargetType(el.target.value)}>
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
                        <Input placeholder="Select expired date" size="md" type="date" onChange={(e) => setExpired(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <>
                            {moreLangField.map((el) => {
                                return <MoreLang key={el.count} onClick={decreaseCount} addLang={addLang} />
                            })}
                            <Tag size={"lg"} key={"lg"} variant="subtle" colorScheme="orange" onClick={increaseCount} cursor={"pointer"}>
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
