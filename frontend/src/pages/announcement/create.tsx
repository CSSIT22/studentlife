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
} from "@chakra-ui/react"
import React from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { Form, Link, To } from "react-router-dom"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import AppBody from "../../components/share/app/AppBody"
import { IoAdd } from "react-icons/all"
import MoreLang from "../../components/annoucement/MoreLang"

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
    const [post, setPost] = React.useState(Array<any>)
    const addPost = (title: string, detail: string, targetType: string, targetValue: string, expired: string, addMoreLang: Array<any>) => {
        setPost([
            {
                postId: Math.random(),
                userId: "123456",
                lang: "English",
                topic: title,
                detail: detail,
                targetType: targetType,
                targetValue: targetValue,
                postAt: Date.now(),
                expired: expired,
                status: "waiting",
                isApprove: false,
                addMoreLang: addMoreLang,
            },
            ...post,
        ])
    }
    // console.log(post);

    const [topic, setTopic] = React.useState(String)
    const [detail, setDetail] = React.useState(String)
    const [targetType, setTargetType] = React.useState(String)
    const [targetValue, setTargetValue] = React.useState(String)
    const [expired, setExpired] = React.useState(Date)
    const [addMoreLang, setAddMoreLang] = React.useState<any[]>([])
    // console.log(expired);
    const addLang = (lang: string, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang,{ lang: lang, topic: topic, detail: detail } ])
    }
    console.log(addMoreLang);
    
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
    console.log(count)
    const [moreLangField, setMoreLangField] = React.useState <any[]>([])
    const AddLang = () => {
        setMoreLangField([...moreLangField,{ count: count }])
    }
    console.log(moreLangField);
    
    const decreaseLang = () => {
        setAddMoreLang(moreLangField.pop())
    }
    // console.log(moreLangField);
// console.log(post);

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
        >
            {/* <Form> */}
                <Flex alignItems={"center"}>
                    <Text as={"b"} fontSize="xl">
                        <Link to={"/announcement"}>
                        <GrClose />
                        </Link>
                    </Text>
                    <Spacer />
                    <Box textAlign={"right"}>
                    <Button
                        size="sm"
                        bg="#E65300"
                        onClick={() => {addPost(topic, detail, targetType, targetValue, expired, addMoreLang),onOpen()}}
                        type="submit"
                        color="white"
                    >
                        
                        Announce
                    </Button>
                    <ModalForEvent isOpen={isOpen} onClose={onClose} topic={modalCreate.topic} detail={modalCreate.detail} status={modalCreate.event} />
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
                                return <MoreLang key={el.count} onClick={decreaseCount} addLang={addLang}/>
                            })}
                            <Tag size={"lg"} key={"lg"} variant="subtle" colorScheme="orange" onClick={increaseCount} cursor={"pointer"}>
                                <TagLeftIcon boxSize="1.5rem" as={IoAdd} />
                                <TagLabel>Add More Language</TagLabel>
                            </Tag>
                        </>
                    </FormControl>
                </Stack>
            {/* </Form> */}
        </AppBody>
    )
}

export default create
