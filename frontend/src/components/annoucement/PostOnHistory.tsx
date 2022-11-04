import { Flex, Heading, Spacer,Box,Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import {HiCheckCircle,HiXCircle} from 'react-icons/hi';
import {TbLoader} from 'react-icons/tb';

const PostOnHistory:FC<{
    topic:string,
    sender:string,
    status:string
}> = ({topic,sender,status}) => {
    const state = (stat:string) =>{
        if(stat == "approve"){
            return  <HiCheckCircle fontSize={"2rem"}/>
        }else if (stat == "disapprove"){
            return <HiXCircle fontSize={"2rem"}/>
        }else {
            return <TbLoader fontSize={"2rem"}/>
        }
    }
  return (
    <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#D9D9D9" rounded="lg">
    <Flex alignItems={"center"}>
        <Box pr={"1rem"} width=''>{state(status)}</Box>
        <Box>
            <Heading size={"md"}>{topic}</Heading>
            <Heading size={"xs"}>{sender}</Heading>
        </Box>
    </Flex>
</Box>  )
}

export default PostOnHistory