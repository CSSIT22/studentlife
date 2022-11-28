import { SuggestionsCommunity } from "@apiType/group"
import { HStack, Box, Image, Text, Button, Flex } from "@chakra-ui/react"
import React, { FC } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"

const SuggestBox: FC<SuggestionsCommunity> = ({ communityName, communityMember, communityCoverPhoto, communityPrivacy }) => {
    return (
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
                    backgroundImage: `url(${communityCoverPhoto})`,
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
                    <Button _hover={{ background: "orange.200" }} background={"orange.500"} color="white" size="sm">
                        Join Community
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default SuggestBox
