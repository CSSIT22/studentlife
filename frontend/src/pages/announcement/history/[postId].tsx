import { Flex, Spacer, Button, Stack, FormControl, FormLabel, Select, Input, Textarea, Tag, TagLeftIcon, TagLabel,Text,Box } from '@chakra-ui/react'
import React from 'react'
import { GrClose } from 'react-icons/gr'
import { IoAdd } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import index from '..'
import ModalForEvent from '../../../components/annoucement/ModalForEvent'
import MoreLang from '../../../components/annoucement/MoreLang'
import MoreLangForEdit from '../../../components/annoucement/MoreLangForEdit'
import AppBody from '../../../components/share/app/AppBody'
import detail from '../detail/[postId]'
import { postInfoTest } from '../postInfoTest'

const history = () => {
    const params = useParams()
    // console.log(params.postId);
    const [allPost,setAllPost] = React.useState(postInfoTest);
    const postParams = allPost.filter((el) => {return el.postId == parseInt(params.postId+"")})
    console.log(postParams[0].addMoreLang.length);
    
    const tgType = postParams.map((el) => {return el.targetType})
    // console.log(tgType[0]);
    const tgValue = postParams.map((el) => {return el.targetValue})
    // console.log(tgValue[0]);
    const tp = postParams.map((el) => {return el.topic})
    // console.log(tp[0]);
    const dt = postParams.map((el) => {return el.detail})
    const epd = postParams.map((el) => {return el.expiredOfPost})
    const st = postParams.map((el) => {return el.status})
// console.log(postParams);
    const moreLangLength = postParams[0].addMoreLang.length;


    const selectTargetValue = (targetType: string) => {
        if (targetType == "Faculty") {
            return (
                <Select placeholder="Select Faculty" onChange={(el) => setTargetValue(el.target.value)} defaultValue={tgValue[0]}>
                    <option>Science</option>
                    <option>Engineering</option>
                    <option>Information Technology</option>
                    <option>Economics</option>
                </Select>
            )
        } else if (targetType == "Major") {
            return (
                <Select placeholder="Select Major" onChange={(el) => setTargetValue(el.target.value)} defaultValue={tgValue[0]}>
                    <option>Computer Science</option>
                    <option>Math</option>
                    <option>Biology</option>
                    <option>Chemistry</option>
                </Select>
            )
        } else if (targetType == "Year") {
            return (
                <Select placeholder="Select Year" onChange={(el) => setTargetValue(el.target.value)} defaultValue={tgValue[0]}>
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
    const modalEdit = {
        topic: "Sent announcement",
        detail: " The announcement request has been sent.",
        status:"edit"
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
    // remain this part
    const [addMoreLang, setAddMoreLang] = React.useState<any[]>([])
    // console.log(expired);
    const updatePost = () => {
        setAllPost(
            allPost.map((el) => {
                if(el.postId == parseInt(params.postId+"")){
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
    const [add, setAdd] = React.useState(false)
    const onAdd = () =>{
        setAdd(true);
    }
    console.log(allPost);
    console.log(addMoreLang);
    
    const addLang = (lang: string, topic: string, detail: string) => {
        setAddMoreLang([...addMoreLang,{ lang: lang, topic: topic, detail: detail } ])
    }
    console.log(addMoreLang);
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
    
    // ยังแก้ไม่ได้
   const updateMoreLang = (add:boolean) =>{
    if(add){
        return addMoreLang.map((el) => {
            return <MoreLangForEdit onDecrease={decreaseCount} addLang={addLang} selectLang={el.lang} title={el.topic} dt={el.detail} key={Math.random()} onAdd={onAdd} add={add}/>
        })
    }else  {
        return postParams[0].addMoreLang.map((el) => {
            return <MoreLangForEdit onDecrease={decreaseCount} addLang={addLang} selectLang={el.lang} title={el.topic} dt={el.detail} key={Math.random()} onAdd={onAdd} add={add}/>
        })
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
                onClick={() => {addPost(topic, detail, targetType, targetValue, expired, addMoreLang),onOpen(),updatePost()}}
                type="submit"
                color="white"
            >
                
                Announce
            </Button>
            <ModalForEvent isOpen={isOpen} onClose={onClose} topic={modalEdit.topic} detail={modalEdit.detail} status={modalEdit.status} />
            </Box>
        </Flex>
        <Stack spacing={3} p="5">
            <FormControl>
                <FormLabel>Language</FormLabel>
                <Select isDisabled placeholder="English"></Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" onChange={(e) => setTopic(e.target.value)} defaultValue={tp[0]}/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Detail</FormLabel>
                <Textarea placeholder="Detail" size="sm" onChange={(e) => setDetail(e.target.value)} defaultValue={dt[0]}/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Target Group</FormLabel>
                <Flex>
                    <Select placeholder="Select Type" pr={"2"} onChange={(el) => setTargetType(el.target.value)} defaultValue={tgType[0]}>
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
                <Input placeholder="Select expired date" size="md" type="date" onChange={(e) => setExpired(e.target.value)} defaultValue={epd[0]}/>
            </FormControl>
            <FormControl>
                <>

                    {updateMoreLang(add)}
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

export default history