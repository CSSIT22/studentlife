import { Flex, HStack, Box, Image, Text, Button, Stack, VStack } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { MdPublic, MdPublicOff } from "react-icons/md"

const InvitationBox: FC<{
    userName: string
    communityName: string
    memberNumber: number
    coverPhoto: any
    isPrivate: boolean
    expireDate: string
}> = ({
    communityName,
    memberNumber,
    coverPhoto,
    isPrivate,
    userName, //name of the person who invited
    expireDate,
}) => {
    const [acceptBtn, setAcceptBtn] = useState(true)
    const [declinetBtn, setDeclinetBtn] = useState(true)

    const handleAcceptOnClick = () => {
        setAcceptBtn(false)
    }

    const handleDeclineOnClick = () => {
        setDeclinetBtn(false)
    }
    return (
        <Box
            sx={{ transition: "transform ease 300ms" }}
            _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }}
            borderRadius="md"
            backgroundColor="white"
            mt={2}
            boxShadow={"lg"}
        >
            {acceptBtn && declinetBtn ? (
                <Box p={3} borderRadius="md">
                    <Flex direction={{ base: "column-reverse", sm: "column-reverse", lg: "column" }}>
                        <Flex direction={{ base: "column", sm: "column", lg: "row" }} gap={2} justify="space-between">
                            <HStack>
                                <Image ml={1} borderRadius="md" boxSize="55px" src={coverPhoto} alt="Cover Photo" />
                                <div>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {isPrivate ? <MdPublicOff /> : <MdPublic />}
                                        <Text as="b" fontSize="sm">
                                            {communityName}
                                        </Text>
                                    </Box>
                                    <Text fontSize="sm">
                                        {memberNumber} {memberNumber == 1 ? "Member" : "Members"}
                                    </Text>
                                </div>
                            </HStack>
                            <HStack justify={{ base: "flex-start", md: "flex-end" }}>
                                <Button
                                    background="green.500"
                                    _hover={{ background: "green.400" }}
                                    color="white"
                                    size="sm"
                                    onClick={handleAcceptOnClick}
                                >
                                    Join Community
                                </Button>
                                <Button background="red" _hover={{ background: "red.400" }} color="white" size="sm" onClick={handleDeclineOnClick}>
                                    Decline Invite
                                </Button>
                            </HStack>
                        </Flex>
                        <Box m={1}>
                            <Text fontSize="sm" as="b">
                                {userName} invited you to join this community
                            </Text>
                            <Text fontSize="sm">Invite will be expired within {expireDate} days</Text>
                        </Box>
                    </Flex>
                </Box>
            ) : (
                <div></div>
            )}
        </Box>
    )
}

export default InvitationBox