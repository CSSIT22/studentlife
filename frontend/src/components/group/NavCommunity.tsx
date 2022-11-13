import { HStack, Box, Image, Text, Button, Flex, } from "@chakra-ui/react"
import React, { FC, } from "react"
import { TiWarning } from "react-icons/ti";
import { MdPublic, MdPublicOff } from "react-icons/md"
import { useParams, Link } from "react-router-dom";

const CommunityList: FC<{ activeBtn?: number; tags?: any; communityID: number; communityName: string; coverPhoto: string; isPrivate: boolean, description: string, isMember: boolean, members: number }> = ({
    communityID,
    communityName,
    coverPhoto,
    isPrivate,
    tags,
    description,
    isMember,
    members,
    activeBtn,
}) => {
    return (

        <Box  >
            <Image sx={{
                // backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // position: "absolute",
                marginTop: "-5rem",
                // left: 0,
                // top: 0,
                // right: 0,
                // bottom: 0,
                // backgroundPosition: "center",
                width: "100%",
                // height: "100px",
                // backgroundPosition: "bottom",
                // backgroundSize: "initial",
                objectFit: "cover",
                objectPosition: "center",
                height: "15rem",
                // height: "300px",

            }} src={coverPhoto}
                fallbackSrc='https://via.placeholder.com/800'
            />
            <Box p={4} borderBottomRadius="md" backgroundColor={"white"} boxShadow={'2xl'}>
                <HStack justify={"space-between"}>
                    <div>
                        <Text as="b">{communityName}</Text>
                        <Box display="flex" fontSize={"sm"} alignItems="center" gap={1}>
                            {isPrivate ? <MdPublicOff /> : <MdPublic />}
                            <Text>
                                {isPrivate ? "Private Community" : "Public Community"} • {members} {members > 1 ? "members" : "member"}
                            </Text>
                        </Box>
                    </div>
                    <div>
                        {isMember ? <Button size="sm" background={'orange.600'} color={'white'} >Invite</Button> : <Button size="sm" background={'orange.600'} color={'white'}>Join</Button>}
                    </div>
                </ HStack>

                <Flex mt={2} flexWrap={"wrap"} gap={1}>
                    {
                        tags.map((t: any) => <Box backgroundColor={"gray.100"} px={3} borderRadius={"lg"} fontSize="xs" key={t.tagID}>{t.tagName}</Box>)
                    }
                </Flex>

                <Text mt={2} fontSize="xs" padding={1}>{description}</Text>
                <Flex gap={2} mt={3}>
                    <Link to={`/groups/id/${communityID}/`} relative='path'><Button size={"sm"} isActive={(activeBtn == 1 && !isPrivate ? true : false)} disabled={isPrivate}>Discussion</Button></Link>
                    <Link to={`/groups/id/${communityID}/member`} relative='path'><Button size={"sm"} isActive={(activeBtn == 2 && !isPrivate ? true : false)} disabled={isPrivate}>Member</Button></Link>
                    <Link to={`/groups/id/${communityID}/file`} relative='path'><Button size={"sm"} isActive={(activeBtn == 3 && !isPrivate ? true : false)} disabled={isPrivate}>File</Button></Link>
                </Flex>

            </Box>

            <Flex direction="column" justify={"center"} align="center" mt={3}>
                {(isPrivate && (communityID != 1000)) ? (<Box borderRadius="md" backgroundColor="red.200" maxWidth={"700px"} width={"100%"}>
                    <HStack gap={2} p={2}>
                        <Box height={"55px"}></Box>
                        <div >
                            <Box display="flex" alignItems="center" gap={1}>
                                <TiWarning />
                                <Text as="b" fontSize="sm">
                                    This Community is Private :(
                                </Text>
                            </Box>
                            <Text fontSize="sm">Join this Community to view or participate in
                                discussions.</Text>
                        </div>
                    </HStack>
                </Box>) : ""}
            </Flex >

        </Box >

    )
}

export default CommunityList
