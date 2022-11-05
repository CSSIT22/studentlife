import { Box, Button, ButtonGroup, Flex, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { AiOutlineClose } from "react-icons/ai";

const FavoriteContent: FC <{
    resName: string,
    open: string,
    phone: string,
    website: string
   }> = ({resName, phone, open, website}) => {
  return (
    <Box width={"100%"} mt={"25px"}>
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
    <Box textAlign={"end"} mb={"15px"}>
      <Popover placement='top'>
        <PopoverTrigger>
            <Button  colorScheme='red' variant='solid' size={"xs"}>
                <AiOutlineClose/> Delete
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign={"center"}>ARE YOU SURE</PopoverHeader>
            <PopoverBody> you want to unfavorite this restaurant?</PopoverBody>
            <PopoverFooter display='flex' justifyContent='center'>
            <ButtonGroup size='sm'>
              <Button  colorScheme='green'>Yes</Button>
              <Button colorScheme='red'>No</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
    <hr/>
</Box>
  );
}

export default FavoriteContent;
