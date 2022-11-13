import { Flex, Heading, Button, Box, Text, HStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import NavCommunity from 'src/components/group/NavCommunity'
import AppBody from 'src/components/share/app/AppBody'
import { BrowserRouter, BrowserRouter as Router, useParams, Link } from "react-router-dom";
import { userData } from '../../data';
import { FaSearch } from 'react-icons/fa';

const file = () => {
    let { communityID }: any = useParams<{ communityID: string }>()
    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)

    // const tags = [{ tagID: 1, tagName: "#Sport" }, { tagID: 2, tagName: "#Music" }, { tagID: 3, tagName: "#Gaming" }]
    return <AppBody>
        <NavCommunity
            communityName='Passakorn group'
            isPrivate={false}
            isMember={false}
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum cumque nemo veniam amet fugiat beatae, quo magni eum voluptatem eligendi nesciunt numquam odio autem ex quaerat totam. At, facilis."}
            coverPhoto="https://picsum.photos/id/400/800"
            members={10}
            communityID={1000}
            tags={userData.Tag}
            activeBtn={3}
        /><HStack justify={"space-between"} borderRadius={"md"} p={3} pl={4} pr={4} backgroundColor={"gray.300"}><Text as={"b"}>File</Text>
            <HStack justify={"flex-end"} width={"100%"}><Input
                // width={"100%"}
                // display={searchBtn ? "" : "none"}
                variant={"filled"}
                maxWidth={"200px"}
                type={"search"}
                value={searchValue}
                onChange={handleChange}
                placeholder="Seacrh File"
                focusBorderColor="gray.200"
            ></Input><Button>Upload</Button></HStack></HStack>
    </AppBody>

}

export default file