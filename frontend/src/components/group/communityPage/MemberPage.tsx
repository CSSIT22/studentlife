import { Box, Center, Heading, HStack, Text, useBoolean, VStack, } from "@chakra-ui/react"
import { useState, useEffect, FC } from "react"
import { useParams } from "react-router-dom"
import API from "src/function/API"
import UserList from "../communityPage/UserList"

const MemberPage: FC<{
    checkRole: string
    checkId: string
}> = ({ checkRole, checkId }) => {
    let { communityID }: any = useParams()
    const [member, setMember] = useState<any>()

    //get community form backend
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    const fetchMember = async () => {
        try {
            const communityMemberResult = (await API.get('/group/getCommunityMember/' + communityID)).data
            setMember(communityMemberResult)
        } catch (err) {
            on()
        } finally {
            off()
        }
    }
    useEffect(() => {
        fetchMember()
        console.log("member: ", member)
    }, [])
    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }
    if (isError) {
        return (
            <Text>Error</Text>
        )
    }
    //Using for map member
    const memberMap = [
        {
            //Render pending request for owner and admin
            title: "Requests",
            subTitle: "These people have requested to join the community",
            data: member?.pending,
            length: member?.pending.length,
            conditions: checkId == "OWNER" || checkId == "ADMIN"
        },
        {
            //Render admin and coAdmin for all
            title: "Admins and moderators",
            subTitle: "",
            data: [...[member?.owner], ...member?.admin, ...member?.coAdmin],
            length: member?.admin.length + member?.coAdmin.length + 1,
            conditions: true
        },
        {
            //Render member for all
            title: "Members",
            subTitle: "",
            data: member?.member,
            length: member?.member.length,
            conditions: true
        },
        {
            //Render blacklist for owner and admin
            title: "Blacklists",
            subTitle: "These people are banned from the community",
            data: member?.blacklist,
            length: member?.blacklist.length,
            conditions: checkId == "OWNER" || checkId == "ADMIN"
        },

    ]


    return (
        <Center>
            <VStack mb='4' width='100%' maxW='760px'>
                {
                    //Map role
                    memberMap?.filter((role) => role.length > 0).map((role: any) => {
                        return (
                            <Box
                                key={role.title}
                                bg='#E67F45'
                                color='white'
                                width='full'
                                p='4'
                                borderRadius='md'
                                shadow='lg'
                            >
                                <HStack>
                                    <Heading fontSize='lg'>
                                        {role.title}
                                    </Heading>
                                    <Text
                                        fontSize='sm'
                                        fontWeight='bold'
                                    >
                                        · {role.length}
                                    </Text>
                                </HStack>
                                <Text
                                    fontSize='md'
                                    mb='2'
                                >
                                    {role?.subTitle}
                                </Text>
                                <VStack>
                                    {
                                        //Map member in each role
                                        role?.data?.map((member: any) => {
                                            return (
                                                <UserList
                                                    key={member.id}
                                                    fetchMember={fetchMember}
                                                    communityId={communityID}
                                                    checkId={checkId} //userId
                                                    userId={member.id} //memberId
                                                    checkRole={checkRole}
                                                    name={member.name}
                                                    image={member.avatar}
                                                    role={member.role}
                                                    majorId={member.majorId}
                                                    isBlacklisted={member.isBlacklisted}
                                                    isPending={member.isPending}
                                                    joined={member.joined}
                                                />
                                            )
                                        })
                                    }
                                </VStack>
                            </Box>
                        )
                    })
                }
            </VStack >
        </Center>
    )
}

export default MemberPage