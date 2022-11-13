import { Flex, Heading, Button, Box, Text } from '@chakra-ui/react'
import React from 'react'
import NavCommunity from 'src/components/group/NavCommunity'
import AppBody from 'src/components/share/app/AppBody'
import { BrowserRouter, BrowserRouter as Router, useParams, Link } from "react-router-dom";
import { userData } from '../../data';

const headCommunity = () => {
    let { communityID }: any = useParams<{ communityID: string }>()
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
            activeBtn={1}
        /><Text>community</Text>
    </AppBody>

}

export default headCommunity