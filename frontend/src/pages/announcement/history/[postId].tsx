import { Flex, Spacer, Button, Stack, FormControl, FormLabel, Select, Input, Textarea, Tag, TagLeftIcon, TagLabel, Text, Box } from "@chakra-ui/react"
import React from "react"
import { GrClose } from "react-icons/gr"
import { IoAdd } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import index from ".."
import ModalForEvent from "../../../components/annoucement/ModalForEvent"
import MoreLang from "../../../components/annoucement/MoreLang"
import MoreLangForEdit from "../../../components/annoucement/MoreLangForEdit"
import AppBody from "../../../components/share/app/AppBody"
import detail from "../detail/[postId]"
import { postInfoTest } from "../postInfoTest"

const history = () => {
    const params = useParams()
    // console.log(params.postId);
    const [allPost, setAllPost] = React.useState(postInfoTest)
    const postParams = allPost.filter((el) => {
        return el.postId == parseInt(params.postId + "")
    })
    // console.log(postParams[0].addMoreLang.length)

    const tgType = postParams.map((el) => {
        return el.targetType
    })
    // console.log(tgType[0]);
    const tgValue = postParams.map((el) => {
        return el.targetValue
    })
    // console.log(tgValue[0]);
    const tp = postParams.map((el) => {
        return el.topic
    })
    // console.log(tp[0]);
    const dt = postParams.map((el) => {
        return el.detail
    })
    const epd = postParams.map((el) => {
        return el.expiredOfPost
    })
    const st = postParams.map((el) => {
        return el.status
    })
    // console.log(postParams);
    const moreLangLength = postParams[0].addMoreLang.length

    //  ยังเคลียร์ field value ตอนเลือก type ใหม่ไม่ได้

    const [isOpen, setIsOpen] = React.useState(false)
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
    const [topic, setTopic] = React.useState(tp[0])
    const [detail, setDetail] = React.useState(dt[0])
    const [targetType, setTargetType] = React.useState(tgType[0])
    const [targetValue, setTargetValue] = React.useState(tgValue[0])
    const [expired, setExpired] = React.useState(epd[0])
    // console.log("origin: "+tgType[0]+" new: "+targetType);
    // console.log("target value "+targetValue);

    const selectTargetValue = (tgType: string) => {
        if (tgType == "Faculty") {
            return (
                <Select placeholder="Select Faculty" onChange={(el) => setTargetValue(el.target.value)} value={targetValue}>
                    <option>Science</option>
                    <option>Engineering</option>
                    <option>Information Technology</option>
                    <option>Economics</option>
                </Select>
            )
        } else if (tgType == "Major") {
            return (
                <Select placeholder="Select Major" onChange={(el) => setTargetValue(el.target.value)} value={targetValue}>
                    <option>Computer Science</option>=<option>Math</option>
                    <option>Biology</option>
                    <option>Chemistry</option>
                </Select>
            )
        } else if (tgType == "Year") {
            return (
                <Select placeholder="Select Year" onChange={(el) => setTargetValue(el.target.value)} value={targetValue}>
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
    // remain this part
    const [addMoreLang, setAddMoreLang] = React.useState<any[]>([])
    // console.log(expired);
    const updatePost = () => {
        setAllPost(
            allPost.map((el) => {
                if (el.postId == parseInt(params.postId + "")) {
                    el.topic = topic
                    el.detail = detail
                    el.targetType = targetType
                    el.targetValue = targetValue
                    el.expiredOfPost = expired
                    el.addMoreLang = addMoreLang
                }
                return el
            })
        )
    }
    // console.log(allPost)

    const [add, setAdd] = React.useState(0)
    const onAdd = () => {
        setAdd(add + 1)
    }
    // console.log(allPost)
    // console.log(addMoreLang)

    const addLang = (lang: string, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang, { lang: lang, topic: topic, detail: detail }])
    }
    // console.log(addMoreLang)
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
    // console.log(moreLangField);

    const decreaseLang = () => {
        setAddMoreLang(moreLangField.pop())
    }
    // const lang = () =>{
    // const morelang = [];
    // for(let i =0;i<moreLangLength;i++){
    //     morelang.push(<MoreLang onClick={decreaseCount} addLang={addLang}/>)
    // }
    // console.log(morelang);

    // }
    // console.log(add);

    const updateMoreLang = (add: Number) => {
        if (add == moreLangLength) {
            return addMoreLang.map((el) => {
                return (
                    <MoreLangForEdit
                        onDecrease={decreaseCount}
                        addLang={addLang}
                        selectLang={el.lang}
                        title={el.topic}
                        dt={el.detail}
                        key={Math.random()}
                        onAdd={onAdd}
                        add={true}
                    />
                )
            })
        } else {
            return postParams[0].addMoreLang.map((el) => {
                return (
                    <MoreLangForEdit
                        onDecrease={decreaseCount}
                        addLang={addLang}
                        selectLang={el.lang}
                        title={el.topic}
                        dt={el.detail}
                        key={Math.random()}
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
                    onOpen()
                    e.preventDefault()
                    updatePost()
                }}
            >
                <Flex alignItems={"center"}>
                    <Text as={"b"} fontSize="xl" opacity={{ base: 100, lg: 0 }}>
                        <Link to={"/announcement"}>
                            <GrClose />
                        </Link>
                    </Text>
                    <Spacer />
                    <Box textAlign={"right"}>
                        <Input type={"submit"} value="Announce" backgroundColor={"#E65300"} color="white" cursor="pointer" />
                        <ModalForEvent
                            isOpen={isOpen}
                            onClose={onClose}
                            topic={modalEdit.topic}
                            detail={modalEdit.detail}
                            status={modalEdit.status}
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
                        <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} value={topic} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Detail</FormLabel>
                        <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} value={detail} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Target Group</FormLabel>
                        <Flex>
                            <Select placeholder="Select Type" pr={"2"} onChange={(el) => setTargetType(el.target.value)} value={targetType}>
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
                        <Input placeholder="Select expired date" size="md" type="date" onChange={(e) => setExpired(e.target.value)} value={expired} />
                    </FormControl>
                    <FormControl>
                        <>
                            {showMoreLang(moreLangLength, add)}
                            {moreLangField.map((el) => {
                                return <MoreLang key={el.count} onClick={decreaseCount} addLang={addLang} />
                            })}
                            <Tag size={"lg"} key={"lg"} variant="subtle" colorScheme="orange" onClick={increaseCount} cursor={"pointer"} mt="5">
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
