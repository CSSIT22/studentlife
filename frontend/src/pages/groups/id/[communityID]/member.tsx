import { Flex, Text, SimpleGrid, color, Box } from '@chakra-ui/react'
import NavCommunity from 'src/components/group/NavCommunity'
import AppBody from 'src/components/share/app/AppBody'
import { userData } from '../../data';
import { communityData } from '../../communityData';
import MemberBox from 'src/components/group/MemberBox';

const Member = () => {

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
            activeBtn={2}
        />
        <Flex direction={{ base: "column-reverse", md: "row" }} gap={2} align="flex-start" mb={4}>
            <Flex width="100%" gap={3} direction={"column"} >
                <MemberBox boxType='request' data={communityData} title="Request" subTitle="These people have been invited to join the goup" />
                <MemberBox boxType="admin" data={communityData} title="Admin" />
                <MemberBox boxType="moderator" data={communityData} title="Moderator" />
                <MemberBox boxType="member" data={communityData} title="Member" />
                <MemberBox boxType="blacklist" data={communityData} title="Blacklist" />
            </Flex>

            <SimpleGrid boxShadow={'2xl'} columns={{ base: 4, md: 2 }} spacing={{ base: 2, md: 1 }} maxWidth={{ base: "", md: "220px" }} width={"100%"} p={3} borderRadius={"md"} background={' white'} sx={{ borderColor: 'black solid 10px' }} >
                <Text as="b" fontSize={"sm"}>All </Text>
                <Text backgroundColor={"orange.600"} color={'white'} borderRadius={"md"} textAlign="center" as="b" fontSize={"sm"}>{communityData.communityMembers.length}</Text>
                <Text mt={{ base: 0, md: 2 }} as="b" fontSize={"sm"}>Admin</Text>
                <Text mt={{ base: 0, md: 2 }} backgroundColor={"orange.600"} color={'white'} borderRadius={"md"} textAlign="center" as="b" fontSize={"sm"}>{communityData.communityMembers.filter((member) => member.userRole == "admin").length}</Text>
                <Text as="b" fontSize={"sm"}>Moderator</Text>
                <Text backgroundColor={"orange.600"} color={'white'} borderRadius={"md"} textAlign="center" as="b" fontSize={"sm"}>{communityData.communityMembers.filter((member) => member.userRole == "moderator").length}</Text>
                <Text as="b" fontSize={"sm"}>Member</Text>
                <Text backgroundColor={"orange.600"} color={'white'} borderRadius={"md"} textAlign="center" as="b" fontSize={"sm"}>{communityData.communityMembers.filter((member) => member.userRole == "member").length}</Text>
                <Text as="b" fontSize={"sm"}>Blacklist</Text>
                <Text backgroundColor={"orange.600"} color={'white'} borderRadius={"md"} textAlign="center" as="b" fontSize={"sm"}>{communityData.communityMembers.filter((member) => member.userRole == "blacklist").length}</Text>
                <Text mt={{ base: 0, md: 2 }} as="b" fontSize={"sm"}>Request</Text>
                <Text mt={{ base: 0, md: 2 }} backgroundColor={"orange.600"} color={'white'} borderRadius={"md"} textAlign="center" as="b" fontSize={"sm"}>{communityData.communityMembers.filter((member) => member.userRole == "request").length}</Text>
            </SimpleGrid>

        </Flex>
    </AppBody >

}

export default Member