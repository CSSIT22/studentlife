import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const Searchcontent:FC<{
    resName: string,
    open: string,
    phone: string,
    website: string,
   }> = ({resName, phone, open, website}) => {
  return (
  
    <Box width={"100%"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" shadow={"lg"}>
        <Flex  mb={"15px"}>
            <Box  width={"30%"}>
                <Image boxSize='100px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' borderRadius={"lg"}/>
            </Box>
            <Box width={"70%"} ml={"20px"}>
                <Text fontSize={"sm"}><span style={{fontWeight: "bold"}}>Name:</span> {resName}</Text>
                <Text fontSize={"sm"}><span style={{fontWeight: "bold"}}>Open:</span> {open}</Text>
                <Text fontSize={"sm"}><span style={{fontWeight: "bold"}}>Phone Number:</span> {phone}</Text>
                <Text fontSize={"sm"}><span style={{fontWeight: "bold"}}>Website:</span> <a href={website}>www.{resName}.com</a></Text>
            </Box>
        </Flex>

       
    </Box>
    
  );
}

export default Searchcontent;
