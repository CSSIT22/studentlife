import { InvitedCommunity } from "@apiType/group"
import { Flex, HStack, Box, Image, Text, Button, Stack, VStack, useToast } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"
import { Link } from "react-router-dom"
import API from "src/function/API"

const PendingRequest: FC<InvitedCommunity> = ({
    ownerFname,
    ownerLname,
    communityName,
    communityMember,
    communityPhoto,
    communityPrivacy,
    communityId,
    userId,

    joined,
    userName, //name of the person who invited
    expired,
}) => {
    const [acceptBtn, setAcceptBtn] = useState(true)
    const [declinetBtn, setDeclinetBtn] = useState(true)

    const handleAcceptOnClick = () => {
        setAcceptBtn(false)
    }

    const handleDeclineOnClick = () => {
        setDeclinetBtn(false)
    }
    const toast = useToast()
    const cancelRequest = () => {
        API.delete("/group/declineRequest", {
            data: {
                userId: userId,
                communityId: communityId,
            }
        }).then((res) => {
            toast({
                title: "Success",
                description: "Request declined",
                status: "success",
                duration: 5000,
                position: 'top',
            })
        }).catch((err) => {
            console.log(err)
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 5000,
                position: 'top',
            })
        })
        setTimeout(() => {
            document.location.reload()
        }
            , 1000)

    }
    const joinedDate = new Date(joined || "")
    const joinedDateStr = `${joinedDate.getDate()}/${joinedDate.getMonth() + 1}/${joinedDate.getFullYear()} ${joinedDate.getHours()}:${joinedDate.getMinutes()}:${joinedDate.getSeconds()}`
    const fullName = `${ownerFname?.charAt(0)}${ownerFname?.slice(1).toLocaleLowerCase()} ${ownerLname?.charAt(0)}${ownerLname?.slice(1).toLocaleLowerCase()}`
    return (

        <Box
            sx={{ transition: "transform ease 300ms" }}
            _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }}
            borderRadius="md"
            backgroundColor="white"
            mt={2}
            boxShadow={"lg"}
        >
            <Box p={3} borderRadius="md">
                <Flex direction={{ base: "column-reverse", sm: "column-reverse", lg: "column" }}>
                    <Flex direction={{ base: "column", sm: "column", lg: "row" }} gap={2} justify="space-between">
                        <Link to={`/groups/id/${communityId}`}>
                            <HStack>
                                <Image
                                    ml={1}
                                    borderRadius="md"
                                    boxSize="55px"
                                    src={communityPhoto}
                                    fallbackSrc="https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg"
                                    alt="Cover Photo" />
                                <div>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {!communityPrivacy ? <MdPublic /> : <MdPublicOff />}
                                        <Text as="b" fontSize="sm">
                                            {communityName}
                                        </Text>
                                    </Box>
                                    <Text fontSize="sm">
                                        {fullName}
                                    </Text>
                                </div>
                            </HStack>
                        </Link>
                        <HStack justify={{ base: "flex-end", md: "flex-end" }}>
                            <Button
                                background="red"
                                _hover={{ background: "red.400" }}
                                color="white"
                                size="sm"
                                onClick={cancelRequest}>
                                Cancel Request
                            </Button>
                        </HStack>
                    </Flex>
                    <Box m={1}>
                        <Text fontSize="sm" as="b">
                            Private Community
                        </Text>
                        <Text fontSize="sm">You joined this community at {joinedDateStr}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>

    )
}

export default PendingRequest