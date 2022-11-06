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
                lang_id: 1334,
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
    const [addMoreLang, setAddMoreLang] = React.useState(Array<any>)
    // console.log(expired);
    const addLang = (lang_id: number, topic: string, detail: string) => {
        setAddMoreLang([{ lang_id: lang_id, topic: topic, detail: detail }, ...addMoreLang])
    }
    const ALERT = () => {
        alert("Topic:" + topic + " detail:" + detail + " targetType:" + targetType + " targetValue:" + targetValue + " expired date:" + expired)
        window.history.go(-1)
    }
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
    const [count, setCount] = React.useState(0)
    const increaseCount = () => {
        setCount(count + 1)
        AddLang()
    }
    const decreaseCount = () => {
        setCount(count - 1)
        // decreaseLang()
    }
    console.log(count)
    const [moreLangField, setMoreLangField] = React.useState(Array<any>)
    const AddLang = () => {
        setMoreLangField([{ count: count }, ...moreLangField])
    }
    const decreaseLang = () => {
        setAddMoreLang(moreLangField.pop())
    }
    // console.log(moreLangField);

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
        >
            <Form>
                <Flex alignItems={"center"}>
                    <Text as={"b"} fontSize="xl">
                        {/* <Link to={"/announcement"}> */}
                        <GrClose />
                        {/* </Link> */}
                    </Text>
                    <Spacer />
                    {/* <Box textAlign={"right"}> */}
                    <Button
                        colorScheme="orange"
                        size="sm"
                        onClick={() => addPost(topic, detail, targetType, targetValue, expired, addMoreLang)}
                        type="submit"
                    >
                        {/* onClick={onOpen} */}
                        Announce
                    </Button>
                    {/* <ModalForEvent isOpen={isOpen} onClose={onClose} topic={modalCreate.topic} detail={modalCreate.detail} event={modalCreate.event} /> */}
                    {/* </Box> */}
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
                        {/* <FormLabel>Add More Language</FormLabel>
                        <Text as={"b"} fontSize="xl">
                            <BsPlusCircleFill />
                        </Text> */}
                        <>
                            {moreLangField.map((el) => {
                                return <MoreLang key={el.count} />
                            })}
                            <Tag size={"lg"} key={"lg"} variant="subtle" colorScheme="orange" onClick={increaseCount}>
                                <TagLeftIcon boxSize="1.5rem" as={IoAdd} />
                                <TagLabel>Add More Language</TagLabel>
                            </Tag>
                            {/* <Stack direction="row" h="100px" p={4}>
                            <Tag height={"1.5"} size={"lg"} key={"lg"} borderRadius="full" variant="solid" colorScheme="green">
                                <TagLabel>Second Language</TagLabel>
                                <TagCloseButton />
                            </Tag>
                        </Stack> */}
                        </>
                    </FormControl>

                    {/* <FormControl isRequired>
                        <FormLabel>Select Language</FormLabel>
                        <Select placeholder="Select language">
                            <option>Thai</option>
                            <option>Japanese</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Detail</FormLabel>
                        <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} />
                    </FormControl> 
                     <FormControl>
                        <FormLabel>Add More Language</FormLabel>
                        <Text as={"b"} fontSize="xl">
                            <BsPlusCircleFill />
                        </Text>
                    </FormControl>*/}
                </Stack>
            </Form>
        </AppBody>
    )
}

export default create
