import { Show, Box, HStack, Button, Input, Stack, Text, Flex, Grid, useBoolean } from "@chakra-ui/react"
import React, { Suspense, useEffect, useState } from "react"
import AppBody from "../../components/share/app/AppBody"
import { FaSearch, FaPlus } from "react-icons/fa"
import { TiWarning } from "react-icons/ti"
import { userData } from "./data"
import CommunityList from "../../components/group/CommunityList"
import SuggestBox from "../../components/group/SuggestBox"
import InvitationBox from "../../components/group/InvitationBox"
import useWindowDimensions from 'src/components/group/hooks/useWindowDimensions'
import { Link } from "react-router-dom"
import API from "src/function/API"

const index = () => {
    const [searchBtn, setSearchBtn] = useState(false) //for close/open seach bar
    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)
    const handleSearchBtn = () => {
        setSearchBtn(!searchBtn)
        setSearchValue("")
    }

    //for mobile
    const [{ allBtn, inviteBtn, suggestBtn }, setBtn] = useState({ allBtn: true, inviteBtn: false, suggestBtn: false })
    //md: 768px
    const { height, width } = useWindowDimensions()
    let isMobile = (width || 0) > 768

    //get community form backend
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [communitys, setCommunitys] = useState<any>([])

    useEffect(() => {
        API.get("/group/getcommunitys")
            .then(res => setCommunitys(res.data))
            .catch((err) => on()).finally(() => off())
    }, [])
    if (isLoading) {
        return (
            // will fix the design later
            <AppBody>
                {/* <Box sx={{
                    display: "inline - block",
                    position: "relative",
                    width: "80px",
                    height: "80px",
                }}>
                    <Box sx={{
                        position: "absolute",
                        top: "33px",
                        width: "13px",
                        height: "13px",
                        borderRadius: "50%",
                        background: "#fff",
                        animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",
                    }}>

                    </Box> */}
                <Text>Loading...</Text>
                {/* </Box> */}
            </AppBody >
        )
    }
    if (isError) {
        // will fix the design later
        return (
            <AppBody>
                <Box>
                    <Text>Something went wrong...</Text>
                </Box>
            </AppBody>
        )
    }
    return (
        <AppBody>
            {/* <div>
                width: {width} ~ height: {height}
            </div> */}

            <Flex gap={2} direction={{ base: "column", md: "row" }} mb={4}>
                <Box>
                    <Show below="md">
                        <HStack justify={"space-between"}>
                            <HStack gap={1} display={searchBtn ? "none" : "flex"}>
                                <Button
                                    borderRadius='xl'
                                    _hover={allBtn ? { background: 'gray.400' } : { background: 'orange.200' }}
                                    size='sm'
                                    color="#FFFFFF"
                                    backgroundColor={allBtn ? "#6b7999" : "#e65300"}
                                    onClick={() => setBtn({ allBtn: true, inviteBtn: false, suggestBtn: false })}
                                    sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 2px 3px 5px" }}
                                >
                                    All
                                </Button>
                                <Button
                                    sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 2px 3px 5px" }}
                                    borderRadius='xl'
                                    size='sm'
                                    _hover={inviteBtn ? { background: 'gray.400' } : { background: 'orange.200' }}
                                    color="#FFFFFF"
                                    backgroundColor={inviteBtn ? "#6b7999" : "#e65300"}
                                    onClick={() => setBtn({ allBtn: false, inviteBtn: true, suggestBtn: false })}>
                                    Invited
                                </Button>
                                <Button
                                    sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 2px 3px 5px" }}
                                    borderRadius='xl'
                                    size='sm'
                                    _hover={suggestBtn ? { background: 'gray.400' } : { background: 'orange.200' }}
                                    color="#FFFFFF"
                                    backgroundColor={suggestBtn ? "#6b7999" : "#e65300"}
                                    onClick={() => setBtn({ allBtn: false, inviteBtn: false, suggestBtn: true })}>
                                    Suggested
                                </Button>
                            </HStack>{" "}
                            {allBtn ? (
                                <Stack direction={"row"} justify="end" width={"100%"} gap={1}>
                                    <Link to="/groups/create">
                                        <Button
                                            _hover={{ background: 'gray.50' }}
                                            sx={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 3px 5px 0px" }}
                                            borderRadius='xl'
                                            size='sm'
                                            bg='#FFFFFF'
                                            display={searchBtn ? "none" : "flex"}>
                                            <FaPlus />
                                        </Button>
                                    </Link>
                                    <Input
                                        bg='#FFFFFF'
                                        _hover={{ background: 'gray.50' }}
                                        sx={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 2px 3px 0px" }}
                                        borderRadius='xl'
                                        size='sm'
                                        width={"100%"}
                                        display={searchBtn ? "" : "none"}
                                        variant={"filled"}
                                        type={"search"}
                                        value={searchValue}
                                        onChange={handleChange}
                                        placeholder="Seacrh Community"
                                        focusBorderColor="gray.200"
                                    ></Input>
                                    <Button
                                        _hover={{ background: 'gray.50' }}
                                        sx={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 3px 5px 0px" }}
                                        bg='#FFFFFF'
                                        borderRadius='xl'
                                        size='sm'
                                        onClick={handleSearchBtn}>
                                        <FaSearch />
                                    </Button>
                                </Stack>
                            ) : (
                                <div></div>
                            )}
                        </HStack>
                    </Show>
                    <Show above="md">
                        <Box textAlign={"center"}>
                            <Input
                                background={'white'}
                                color='black'
                                boxShadow={'2xl'}
                                textAlign={"center"}
                                width={"100%"}
                                variant={"filled"}
                                type={"search"}
                                value={searchValue}
                                onChange={handleChange}
                                placeholder="Seacrh Communities"
                                focusBorderColor="gray.200"
                            ></Input>
                            <Link to={'/groups/create'}  >
                                <Button mt="2" colorScheme="orange" _hover={{ background: 'orange.200' }} variant="solid" width="95%" fontSize="sm">
                                    + Create New Community
                                </Button>
                            </Link>

                        </Box>
                    </Show>
                    <Box display={allBtn || isMobile ? "block" : "none"}>
                        <Box mt={4} mb={3} background={{ md: "orange.400", base: "" }} p={{ md: "3", base: "4" }} borderRadius={"md"}>
                            <Text as="b" color={{ md: "white", base: "black" }}>Community you manage</Text>


                            {communitys.ownCommunitys.filter((community: any) => community.name.toLowerCase().includes(searchValue.toLowerCase())).length > 0 ? (
                                communitys.ownCommunitys
                                    .filter((community: any) => {
                                        return searchValue.toLowerCase() == "" ? community : community.name.toLowerCase().includes(searchValue)
                                    })
                                    .map((community: any) => (community.roleID >= 3 ? (
                                        <CommunityList
                                            communityID={community.ID}
                                            key={community.ID}
                                            communityName={community.name}
                                            lastActive={"9"}
                                            coverPhoto={community.coverPhoto}
                                            isPrivate={community.isPrivate}
                                            roleID={community.roleID}
                                        />) :
                                        <div></div>
                                    ))
                            ) : (
                                <Box borderRadius="md" backgroundColor="red.200" mt={2}>
                                    <Box p={2} borderRadius="md">
                                        <HStack gap={2}>
                                            <Box height={"55px"}></Box>
                                            <div>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <TiWarning />
                                                    <Text as="b" fontSize="sm">
                                                        Community not found :(
                                                    </Text>
                                                </Box>
                                                <Text fontSize="sm">Try to search again</Text>
                                            </div>
                                        </HStack>
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        <Box mt={4} mb={3} background={{ md: "orange.400", base: "" }} p={{ md: "3", base: "4" }} borderRadius={"md"}>
                            <Text as="b" color={{ md: "white", base: "black" }}>Community you've joined</Text>

                            {communitys.joinedCommunitys.filter((community: any) => community.name.toLowerCase().includes(searchValue.toLowerCase())).length >
                                0 ? (
                                communitys.joinedCommunitys
                                    .filter((community: any) => {
                                        return searchValue.toLowerCase() == "" ? community : community.name.toLowerCase().includes(searchValue)
                                    })

                                    .map((community: any) => (community.roleID < 3 ? (
                                        <CommunityList
                                            communityID={community.ID}
                                            key={community.ID}
                                            communityName={community.name}
                                            lastActive={"9"}
                                            coverPhoto={community.coverPhoto}
                                            isPrivate={community.isPrivate}
                                            roleID={community.roleID}
                                        />) :
                                        <div></div>
                                    ))
                            ) : (
                                <Box borderRadius="md" backgroundColor="red.200" mt={2}>
                                    <Box p={2} borderRadius="md">
                                        <HStack gap={2}>
                                            <Box height={"55px"}></Box>
                                            <div>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <TiWarning />
                                                    <Text as="b" fontSize="sm">
                                                        Community not found :(
                                                    </Text>
                                                </Box>
                                                <Text fontSize="sm">Try to search again</Text>
                                            </div>
                                        </HStack>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
                {/* <Show above="md"> */}
                <Show>
                    <Box width={"100%"} >
                        <Box
                            display={inviteBtn || isMobile ? "block" : "none"}
                            borderRadius="md"
                            background={{ md: "orange.400", base: "" }}
                            width="100%"
                            pt={4}
                            textAlign="start"
                            pl={5}
                            pr={5}
                            pb={4}
                        >
                            <Text as="b" color={{ md: "white", base: "black" }}>Invitation</Text>
                            <Text fontSize="sm" color={{ md: "white", base: "black" }}>These people have invited you to join the community</Text>
                            {communitys.invitations.map((i: any) => (
                                <InvitationBox
                                    key={i.inviteID}
                                    userName={i.userName}
                                    communityName={i.communityName}
                                    memberNumber={i.memberNumber}
                                    isPrivate={i.isPrivate}
                                    coverPhoto={i.coverPhoto}
                                    expireDate={i.expireDate}
                                />
                            ))}
                        </Box>
                        <Box
                            display={suggestBtn || isMobile ? "block" : "none"}
                            mt={2}
                            borderRadius="md"
                            background={{ md: "orange.400", base: "" }}
                            width="100%"
                            pt={4}
                            textAlign="start"
                            pl={5}
                            pr={5}
                            pb={4}
                        >
                            <Text as="b" color={{ md: "white", base: "black" }}>Suggested for you</Text>
                            <Text fontSize="sm" color={{ md: "white", base: "black" }}>Communities you might be interested in.</Text>
                            <Grid gap={2} templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(2, 1fr)" }} width="100%">
                                {communitys.invitations.map((i: any) => (
                                    <SuggestBox
                                        key={i.inviteID}
                                        communityName={i.communityName}
                                        memberNumber={i.memberNumber}
                                        isPrivate={i.isPrivate}
                                        coverPhoto={i.coverPhoto}
                                    />
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Show>
            </Flex >
        </AppBody >
    )
}

export default index
