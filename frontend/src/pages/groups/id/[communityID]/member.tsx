import { Flex, Text, SimpleGrid, color, Box, useBoolean, HStack, VStack } from "@chakra-ui/react"
import NavCommunity from "src/components/group/NavCommunity"
import AppBody from "src/components/share/app/AppBody"
import { userData } from "../../data"
import { communityData } from "../../communityData"
import MemberBox from "src/components/group/MemberBox"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import API from "src/function/API"
import PrivateContent from "src/components/group/PrivateContent"
import UserList from "src/components/group/UserList"
const Member = () => {
    let { communityID }: any = useParams()
    const [community, setCommunity] = useState<any>()
    const [tag, setTag] = useState<any>()
    // const [isError, { on }] = useBoolean()
    // const [isLoading, { off }] = useBoolean(true)


    //get community form backend
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const status = 0
    // const [community, setCommunity] = useState<any>()
    useEffect(() => {
        API.get('/group/getCommunityMember/' + communityID,)
            .then((res) => {
                setCommunity(res.data)
                console.log(res.data)
            }).catch((err) => on())
            .finally(() => off())
    }, [])
    if (isLoading) {
        return (
            // will fix the design later
            <AppBody>
                <Text>Loading...</Text>
            </AppBody>
        )
    }
    if (isError) {
        // will fix the design later
        return (
            <AppBody>
                <Box>
                    <Text>There was no community found.</Text>
                </Box>
            </AppBody>
        )
    }
    let owner = community?.communityMember?.owner

    return (
        <AppBody>
            <NavCommunity
                communityName={community?.communityName}
                communityId={community?.communityId}
                communityCoverPhoto={community?.communityCoverPhoto}
                communityPrivacy={community?.communityPrivacy}
                communityDesc={community?.communityDesc}
                isMember={community?.isMember}
                isOwner={community?.isOwner}
                isPending={community?.isPending}
                communityMembers={community?.memberCount + 1}
                activeBtn={2}
                tags={community?.tags}

            />
            {/* <Text>{community?.communityId}</Text> */}
            <Box>
                <PrivateContent
                    communityId={community?.communityId}
                    communityPrivacy={community?.communityPrivacy}
                    isMember={community?.isMember} />
            </Box>

            <Flex
                width='100%'
                mt='2'
                direction={{ base: "column-reverse", md: "row" }}
                gap={2}
                justifyContent='center'
                alignItems='center'
                mb={4}>
                <VStack
                    justifyContent='center'
                    alignItems='center'
                    // align='center'
                    maxWidth='580px'
                    width="100%"
                    gap={3}
                >
                    <MemberBox
                        displayBox={community.pendingRequest != 0 && community?.isOwner}
                        boxType="request"
                        pendingRequest={community.pendingRequest}
                        title="Request"
                        subTitle="These people have been invited to join the group" />


                    <Box
                        display={community?.isMember || !community?.communityPrivacy ? "block" : 'none'}
                        boxShadow={"2xl"} width={"100%"}
                        backgroundColor="orange.400"
                        p={4}
                        borderRadius="md"
                    >
                        <HStack align='flex-end'>
                            <Text as="b" color={"white"}>
                                Admins & moderators
                            </Text>
                            <Text as='p' fontSize='sm' color='white'>
                                {
                                    ` · ${community?.communityMember.admin.length + community?.communityMember.coAdmin.length + 1} `
                                }
                            </Text>
                        </HStack>
                        <Flex mt={3} gap={2} direction="column" justify={"center"} align="center" width={"100%"}>
                            <UserList
                                key={owner.userId}
                                isHigherPriority={community?.isOwner}
                                userId={owner.userId}
                                avatar={owner.image}
                                firstName={owner.fName}
                                lastName={owner.lName}
                                majorId={owner.majorId}
                                role={'owner'}
                            />
                            {community?.communityMember?.admin.map((member: any) => (
                                <UserList
                                    key={member.user.userId}
                                    isHigherPriority={community?.isOwner}
                                    userId={member.user.userId}
                                    avatar={member.user.image}
                                    firstName={member.user.fName}
                                    lastName={member.user.lName}
                                    majorId={member.user.majorId}
                                    role={'member'}
                                />))}
                            {community?.communityMember?.coAdmin.map((member: any) => (
                                <UserList
                                    key={member.user.userId}
                                    isHigherPriority={community?.isOwner}
                                    userId={member.user.userId}
                                    avatar={member.user.image}
                                    firstName={member.user.fName}
                                    lastName={member.user.lName}
                                    majorId={member.user.majorId}
                                    role={'member'}
                                />))}
                        </Flex>
                        <HStack
                            display={community?.communityMember?.member.length > 0 ? "flex" : "none"}
                            align='flex-end' mt={3}>
                            <Text as="b" color={"white"}>
                                Members
                            </Text>
                            <Text as='p' fontSize='sm' color='white'>
                                {
                                    community?.memberCount - community?.pendingRequest.length > 0
                                        ? (` · ${community?.memberCount - community?.pendingRequest.length}`)
                                        : ""
                                }
                            </Text>
                        </HStack>
                        <Flex mt={3} gap={2} direction="column" justify={"center"} align="center" width={"100%"}>
                            {community?.communityMember?.member.map((member: any) => (
                                <UserList
                                    key={member.user.userId}
                                    isHigherPriority={community?.isOwner}
                                    userId={member.user.userId}
                                    avatar={member.user.image}
                                    firstName={member.user.fName}
                                    lastName={member.user.lName}
                                    majorId={member.user.majorId}
                                    role={'member'}
                                />))}
                        </Flex>
                    </Box>
                </VStack>
            </Flex>
        </AppBody>
    )
}

export default Member