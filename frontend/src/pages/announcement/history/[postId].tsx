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
    const [disable, setdisable] = useState(true)

    const tog = () => {
        settoggle(!toggle)
    }

    let d: Date
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [tt, settt] = useState<addMoreLangType[]>([])
    const [tv, settv] = useState<tgType[]>([])
    const [exlang2 , setexlang2] = useState<addMoreLangType[]>([])

    async function getPost() {
        const getData = await API.get("/announcement/getdetailedit/" + params.postId)
        setpost(getData.data)
        setTopic(getData.data[0].annLanguage[0].annTopic)
        setDetail(getData.data[0].annLanguage[0].annDetail)
        setTargetType(getData.data[0].annFilter.filterType)
        setTargetValue(getData.data[0].annFilter.value)
        d = new Date(getData.data[0].annExpired)
        // get date มาแค่ 1 หลัก แต่ date require 2 หลัก
        if (d.getMonth() < 10) {
            const nm = "0" + (d.getMonth() + 1)
            if (d.getDate() < 10) {
                const nd = "0" + (d.getDate())
                setExpired(d.getFullYear() + "-" + nm + "-" + nd)
            } else {
                setExpired(d.getFullYear() + "-" + nm + "-" + d.getDate())
            }

        } else if (d.getDate() < 10) {3
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

        // setExpired(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())
        // setAddMoreLang(getData.data[0].annLanguage.filter((el:any) => el.languageId > 1000))

        setexMoreLang(getData.data[0].annLanguage.filter((el: any) => el.languageId > 1000))

        setmorelanglength(getData.data[0].annLanguage.filter((el: any) => el.languageId > 1000).length)
        const value = await API.get("/announcement/gettypetarget");
        settv(value.data)
        // for(let i=0;i<getData.data[0].annLanguage.filter((el: any) => el.languageId > 1000).length;i++){
        //     exlang2.push( {id:Date.now(),languageId:getData.data[0].annLanguage.filter((el: any) => el.languageId > 1000)[i].languageId,annTopic:getData.data[0].annLanguage.filter((el: any) => el.languageId > 1000)[i].annTopic,annDetail:getData.data[0].annLanguage.filter((el: any) => el.languageId > 1000)[i].annDetail})
        // }
        // getData.data[0].annLanguage.filter((el: any) => el.languageId > 1000).forEach((el:any) => {
        //    exlang2.push( {id:Date.now(),languageId:el.languageId,annTopic:el.annTopic,annDetail:el.annDetail})
        // })
    }
    // console.log(exlang2.slice(0,exmoreLang.length));
    // setexMoreLang(exmoreLang) 
   
   


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

    const increaseCount = () => {
        setCount(count + 1)
        AddLang()
    }

    // console.log(morelanglength);
    
    const decreaseCount = (id: number) => {
        setCount(count - 1)
        setAddMoreLang(addMoreLang.filter((el) => el.languageId != id))
        setMoreLangField(moreLangField.filter((el) => el.count != count-1))
        // setexMoreLang(exmoreLang.filter((el) => el.languageId != id))
    }


    const decreaseForEdit = (langid:number) => {
        console.log(langid);
        setmorelanglength(morelanglength - 1)
        setexMoreLang(exmoreLang.filter((el) => {return el.languageId != langid}))
    }

    
    console.log(exmoreLang)

    const AddLang = () => {
        setMoreLangField([...moreLangField, { count: count }])
    }
    // console.log(moreLangField);


    // console.log(moreLangLength)
    // console.log(addMoreLang)
    const onDisable = () => {
        setdisable(!disable)
    }
    // console.log(exmoreLang);
    // console.log(count);
    

    const updateMoreLang = (add: Number) => {
        if(add == morelanglength){
            return addMoreLang.map((el,index) => {
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
        }else {
            // ลบจากด้านล่างลำดับได้ปกติ
            // ลบจากด้านบน ค่าที่เปลี่ยนแปลงไป ถูกต้องแต่ render ผิด
            
           return exmoreLang?.map((el) => {
            // wtf log ค่าถูกตามที่ต้องการถูกทุกอย่าง ที่frontend ไม่ได้ re render ตามนั้น?????
            console.log(el.languageId);
            console.log(el.annTopic);
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
       
    // if (add == morelanglength) {
    //     return addMoreLang.map((el) => {
    //         return (
    //             <MoreLangForEdit
    //                 id={el.id}
    //                 onDecrease={decreaseCount}
    //                 addLang={addLang}
    //                 selectLang={el.languageId}
    //                 title={el.annTopic}
    //                 dt={el.annDetail}
    //                 key={el.id}
    //                 onAdd={onAdd}
    //                 add={true}
    //             />
    //         )
    //     })
    // } else if(exmoreLang.length != 0){
    //     return exmoreLang?.map((el) => {
    //         return (
    //             <MoreLangForEdit
    //                 onDecrease={decreaseCount}
    //                 id={el.id}
    //                 addLang={addLang}
    //                 selectLang={el.languageId}
    //                 title={el.annTopic}
    //                 dt={el.annDetail}
    //                 key={el.id}
    //                 onAdd={onAdd}
    //                 add={false}
    //             />
    //         )
    //     })
    // }
    // }

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
    // console.log(expired);
    // console.log(exmoreLang)
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
                            {showMoreLang(morelanglength, add)}
                            {disable &&
                                moreLangField?.map((el) => {
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