import { OwnCommunity } from "@apiType/group"
import { HStack, Box, Image, Text, Badge } from "@chakra-ui/react"
import React, { createElement, FC, useEffect } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"
import { Link } from "react-router-dom"
const CommunityList: FC<OwnCommunity> = ({ pendingRequest, communityName, communityPhoto, communityPrivacy, communityId ,communityMember}) => {



    

    return (
        <Link to={`/groups/id/${communityId}`}>
            <Box
                position='relative'
                sx={{ transition: "transform ease 300ms" }}
                _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }}
                borderRadius="md"
                backgroundColor="white"
                boxShadow={"lg"}
                mt={2}
                color="black"
            >
                <Box p={2} borderRadius="md">

                    <HStack gap={2}>
                        <Image ml={1} borderRadius="md" boxSize="55px" src={communityPhoto ? `data:image;base64,${btoa(String.fromCharCode(...new Uint8Array(communityPhoto?.data)))}` : "https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg"} alt="Cover Photo" />
                        <div>
                            <HStack >
                                {communityPrivacy ? <MdPublicOff /> : <MdPublic />}
                                <Text display={{ base: 'block', md: 'none' }} as="b" fontSize="sm">
                                    {communityName}
                                </Text>

                                <Text display={{ base: 'none', md: 'block' }} as="b" fontSize="sm">
                                    {communityName.length > 16 ? communityName.slice(0, 14) + "..." : communityName}
                                </Text>

                            </HStack>
                            <Text fontSize="sm">{communityMember} {communityMember == 1 ? "Member" : "Members"} </Text>
                            
                        </div>
                    </HStack>
                </Box>
                <Badge
                    display={pendingRequest ? 'block' : 'none'}
                    colorScheme='red'
                    position='absolute'
                    top='5px'
                    right='5px'
                    padding='1'
                    // padding='2px 8px'
                    // fontSize='10px'
                    borderRadius='50%'
                    background='red'
                // color='white'
                ></Badge>
            </Box>
        </Link>
    )
}

export default CommunityList