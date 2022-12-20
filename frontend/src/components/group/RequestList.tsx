import { Avatar, Flex, HStack, Box, Text, Button, background, Badge, Stack, useToast } from "@chakra-ui/react"
import React, { FC } from "react"
import API from "src/function/API";

const RequestList: FC<{
    firstName?: string;
    lastName?: string;
    joined?: Date;
    majorId?: string;
    avatar?: string;
    communityId?: string;
    userId?: string;


    userProfile?: string;
    userRole?: string;
    userName?: string
}> = ({ userId, communityId, firstName, lastName, joined, majorId, avatar }) => {
    // let Role = (): string => userRole.charAt(0).toUpperCase() + userRole.slice(1)
    // const acceptRequest = () => {
    //     API.post("/group/acceptRequest", {

    //     }
    const toast = useToast()
    const declineRequest = () => {
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
    }
    const acceptRequest = () => {
        API.post('/group/acceptRequest',
            {
                communityId: communityId,
                userId: userId,
            }).then((res) => {
                toast({
                    title: "Success",
                    description: "You have accepted the request",
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
        }, 2000)
    }
    const joinedDate = new Date(joined || "")
    const joinedDateStr = `${joinedDate.getDate()}/${joinedDate.getMonth() + 1}/${joinedDate.getFullYear()}`
    const fullName = `${firstName?.charAt(0)}${firstName?.slice(1).toLocaleLowerCase()} ${lastName?.charAt(0)}${lastName?.slice(1).toLocaleLowerCase()}`
    return (
        <Stack
            direction={{ base: "column", sm: "row" }}
            minWidth={"265px"}
            maxWidth={"700px"}
            p={2}
            borderRadius="md"
            width='full'
            bg='white'
            justifyContent='space-between'
        >
            <HStack>
                <Avatar src={avatar} name={fullName} />
                <Box ml='3'>
                    <Text fontWeight='bold' fontSize='md'>
                        {fullName}
                        <Badge ml='1' colorScheme='green'>
                            {joinedDateStr}
                        </Badge>
                    </Text>
                    <Text fontSize='sm'>{majorId}</Text>
                </Box>
            </HStack>
            <HStack justifyContent={{ base: 'flex-end' }}>
                <Button
                    onClick={acceptRequest}
                    background='green.500'
                    _hover={{ background: "green.600" }}
                    color='white'
                    size='sm'>
                    Accept
                </Button>
                <Button
                    onClick={declineRequest}
                    background='red.500'
                    _hover={{ background: "red.600" }}
                    color='white'
                    size='sm'>
                    Decline
                </Button>
            </HStack>
        </Stack >
    )
}

export default RequestList
