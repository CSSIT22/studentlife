import { SuggestionsCommunity } from "@apiType/group"
import { HStack, Box, Image, Text, Button, Flex } from "@chakra-ui/react"
import React, { FC } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"
import { Link } from "react-router-dom"




const SuggestionsList: FC<SuggestionsCommunity> = ({ communityName, communityMember, communityPhoto, communityPrivacy, communityId }) => {
    return (
        <Link to={`/groups/id/${communityId}`}>
            <Box
                sx={{ transition: "transform ease 300ms" }}
                _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }}
                borderRadius="md"
                backgroundColor="white"
                boxShadow={"lg"}
                mt={2}
            >
                <Box
                    sx={{
                        background: "tomato",
                        width: "100%",
                        height: "20vh",
                        // backgroundImage: `url(${communityCoverPhoto})`,
                        backgroundImage: communityPhoto ? `data:image;base64,${btoa(String.fromCharCode(...new Uint8Array(communityPhoto?.data)))}` : `url(https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderTopRadius: "md",
                    }}
                ></Box>
                <Box p={3} borderRadius="md">
                    <Flex direction={"column"} gap={2} justify="space-between">
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                {communityPrivacy ? <MdPublicOff /> : <MdPublic />}
                                <Text as="b" fontSize="sm">
                                    {communityName}
                                </Text>
                            </Box>
                            <Text fontSize="sm">
                                {communityMember} {communityMember == 1 ? "Member" : "Members"}
                            </Text>
                        </div>
                        <Button
                            _hover={{ background: "orange.200" }}
                            _active={{ background: 'orange.200' }}
                            background={"orange.500"}
                            color="white"
                            size="sm"
                        >
                            Go to Community
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Link>
    )
}

export default SuggestionsList