import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const Historycontent: FC <{
    resName: string,
    date: string,
    status: boolean
}> = ({resName, date, status}) => {
  return (
    <Box width={"100%"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" shadow={"lg"}>
    <Flex  mb={"15px"}>
        <Box  width={"30%"}>
            <Image boxSize='100px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' borderRadius={"lg"}/>
        </Box>
        <Box width={"70%"} ml={"20px"} height={"100px"}>
          <Flex direction={"column"} justifyContent={"center"} height={"100%"}>
            <Text fontSize={"sm"}><span style={{fontWeight: "bold"}}>Name:</span> {resName}</Text>
            <Text fontSize={"sm"}><span style={{fontWeight: "bold"}}>Date:</span> {date}</Text>
            <Text fontSize={"sm"}><span style={{fontWeight: "bold"}}>Status:</span> {status ? "Liked" : "Nope"}</Text>

          </Flex>
        </Box>
    </Flex>
    
</Box>
  );
}

export default Historycontent;
