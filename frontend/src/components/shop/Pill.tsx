import { Flex, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { BsStarFill } from 'react-icons/bs'
import rating from 'src/pages/dating/rating'

const Pill = (props:any) => {
  return (
    <Box p={props.p ? props.p : 1} ml = {props.ml ? props.ml : null} rounded={"full"} background={props.bg ? props.bg : "#4D608C"} border="1px solid #ccc" shadow={"md"}>
        <Flex justify="center" align="center" gap={2} px={2} py={1}>
            {props.children}
        </Flex>
    </Box>
  )
}

export default Pill