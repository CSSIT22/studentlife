import { Show, Box, HStack, Button, Input, Stack, Text, Flex, Grid, useBoolean, Modal, useDisclosure, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import { FaSearch, FaPlus } from "react-icons/fa"
import { TiWarning } from "react-icons/ti"
import CommunityList from "src/components/group/CommunityList"
import SuggestionsList from "src/components/group/SuggestionsList"
import InvitationsList from "src/components/group/InvitationsList"

import useWindowDimensions from "src/components/group/hooks/useWindowDimensions"
import { Link } from "react-router-dom"
import API from "src/function/API"

import { OwnCommunity, JoinedCommunity, InvitedCommunity, SuggestionsCommunity } from '@apiType/group'
import { SearchIcon } from "@chakra-ui/icons"
import PendingRequestList from "src/components/group/PendingRequestList"
const index = () => {
    const [searchBtn, setSearchBtn] = useState(false) //for close/open seach bar
    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)
    const handleSearchBtn = () => {
        setSearchBtn(!searchBtn)
        setSearchValue("")
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    //for mobile
    const [{ allBtn, inviteBtn, suggestBtn }, setBtn] = useState({ allBtn: true, inviteBtn: false, suggestBtn: false })
    //md: 768px
    const { height, width } = useWindowDimensions()
    let isMobile = (width || 0) > 768

    //get community form backend
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [community, setCommunity] = useState<any>()
    useEffect(() => {
        API.get("/group/getcommunity")
            .then((res) => {

                setCommunity(res.data)
                console.log(res.data)
            })
            .catch((err) => on())
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
                    <Text>Something went wrong...</Text>
                </Box>
            </AppBody>
        )
    }

    const renderOwnCommunity = () => {
        return (
            community?.communityList.own.map((c: OwnCommunity) => {
                return (
                    <CommunityList
                        pendingRequest={community?.communityList?.pendingRequest.length > 0}
                        key={c.communityId}
                        communityName={c.communityName}
                        lastActive={'9'}
                        communityCoverPhoto={c.communityCoverPhoto}
                        communityPrivacy={c.communityPrivacy}
                        communityId={c.communityId} />
                )
            }))
    }
    const renderJoinedCommunity = () => {
        return (
            community?.communityList.joined.map((community: JoinedCommunity) => {
                return (
                    <CommunityList
                        key={community.communityId}
                        communityName={community.communityName}
                        lastActive={community.lastActive}
                        communityCoverPhoto={community.communityCoverPhoto}
                        communityPrivacy={community.communityPrivacy}
                        communityId={community.communityId} />
                )
            }))
    }
    const renderInvitedCommunity = () => {
        return (
            community?.communityList.invite.map((community: InvitedCommunity) => {
                return (
                    <InvitationsList
                        key={community.communityId}
                        communityName={community.communityName}
                        communityCoverPhoto={community.communityCoverPhoto}
                        communityId={community.communityId}
                        expired={community.expired}
                        communityMember={community.communityMember}
                        communityPrivacy={community.communityPrivacy}
                        userName={community.userName} />
                )
            }))
    }

    const renderSuggestCommunity = () => {
        return (
            community?.communityList.suggest
                // .slice(0, 4)
                .map((community: any) => {
                    return (
                        <SuggestionsList
                            key={community.communityId}
                            communityName={community.communityName}
                            communityCoverPhoto={community.communityCoverPhoto}
                            communityMember={community.member.length + 1}
                            communityPrivacy={community.communityPrivacy}
                            communityId={community.communityId}
                        />
                    )
                }))
    }
    const renderPendingRequest = () => {
        return (
            community?.communityList.pendingRequest.map((community: any) => {
                return (
                    <PendingRequestList
                        key={community.communityId}
                        joined={community.member[0].joined}
                        userId={community.member[0].userId}
                        communityName={community.communityName}
                        communityCoverPhoto={community.communityCoverPhoto}
                        communityId={community.communityId}
                        ownerFname={community.owner.fName}
                        ownerLname={community.owner.lName}
                        // userName={community.member[0].joined}
                        // expired={community.expired}
                        communityMember={community.communityMember}
                        communityPrivacy={community.communityPrivacy}
                    // userName={community.userName}
                    />
                )
            }))
    }

    const communityNotFound = () => {
        return (
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
            </Box>)
    }
    const checkCommunity = () => {
        return (
            <Box borderRadius="md" backgroundColor="orange.100" mt={2}>
                <Box p={2} borderRadius="md">
                    <HStack gap={2}>
                        <Box height={"55px"}></Box>
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Text as="b" fontSize="sm" color='white'>
                                    Try joining a community first
                                </Text>
                            </Box>
                            <Text color='white' fontSize="sm">You don't have any community yet :(</Text>
                        </div>
                    </HStack>
                </Box>
            </Box>)
    }

    return (
        <AppBody>
            <Flex gap={2} direction={{ base: "column", md: "row" }} mb={4}>
                <Box>

                    <Show below="md">
                        <HStack justify={"space-between"}>
                            <HStack gap={1} display={searchBtn ? "none" : "flex"}>
                                <Button
                                    borderRadius="xl"
                                    _hover={allBtn ? { background: "gray.400" } : { background: "orange.200" }}
                                    size="sm"
                                    color="#FFFFFF"
                                    backgroundColor={allBtn ? "#6b7999" : "#e65300"}
                                    onClick={() => setBtn({ allBtn: true, inviteBtn: false, suggestBtn: false })}
                                    sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 2px 3px 5px" }}
                                >
                                    All
                                </Button>
                                <Button
                                    sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 2px 3px 5px" }}
                                    borderRadius="xl"
                                    size="sm"
                                    _hover={inviteBtn ? { background: "gray.400" } : { background: "orange.200" }}
                                    color="#FFFFFF"
                                    backgroundColor={inviteBtn ? "#6b7999" : "#e65300"}
                                    onClick={() => setBtn({ allBtn: false, inviteBtn: true, suggestBtn: false })}
                                >
                                    Invited
                                </Button>
                                <Button
                                    sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 2px 3px 5px" }}
                                    borderRadius="xl"
                                    size="sm"
                                    _hover={suggestBtn ? { background: "gray.400" } : { background: "orange.200" }}
                                    color="#FFFFFF"
                                    backgroundColor={suggestBtn ? "#6b7999" : "#e65300"}
                                    onClick={() => setBtn({ allBtn: false, inviteBtn: false, suggestBtn: true })}
                                >
                                    Suggested
                                </Button>
                            </HStack>{" "}
                            {allBtn ? (
                                <Stack direction={"row"} justify="end" width={"100%"} gap={1}>
                                    <Link to="/groups/create">
                                        <Button
                                            _hover={{ background: "gray.50" }}
                                            sx={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 3px 5px 0px" }}
                                            borderRadius="xl"
                                            size="sm"
                                            bg="#FFFFFF"
                                            display={searchBtn ? "none" : "flex"}
                                        >
                                            <FaPlus />
                                        </Button>
                                    </Link>
                                    <Input
                                        bg="#FFFFFF"
                                        _hover={{ background: "gray.50" }}
                                        sx={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 2px 3px 0px" }}
                                        borderRadius="xl"
                                        size="sm"
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
                                        _hover={{ background: "gray.50" }}
                                        sx={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 3px 5px 0px" }}
                                        bg="#FFFFFF"
                                        borderRadius="xl"
                                        size="sm"
                                        onClick={handleSearchBtn}
                                    >
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
                            <Button
                                background={"white"}
                                boxShadow={"md"}
                                textAlign={"center"}
                                width={"100%"}
                                onClick={onOpen}
                            >
                                <HStack>
                                    <SearchIcon />
                                    <Text>
                                        Seacrh Communities
                                    </Text>
                                </HStack>
                            </Button>
                            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    {/* <ModalCloseButton /> */}
                                    <ModalBody>
                                        <HStack >
                                            <Box textAlign={'center'} mb='1' mr='2' >
                                                <SearchIcon color='green' />
                                            </Box>
                                            <Input
                                                background={"white"}
                                                color="black"
                                                textAlign={"center"}
                                                width={"100%"}
                                                variant={"filled"}
                                                type={"search"}
                                                value={searchValue}
                                                onChange={handleChange}
                                                placeholder="Seacrh Communities"
                                                focusBorderColor="gray.200"
                                                onClick={onOpen}
                                            ></Input>
                                        </HStack>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                            <Link to={"/groups/create"}>
                                <Button mt="2"
                                    bg="orange.500"
                                    color="#FFFFFF"
                                    _hover={{ background: "orange.200" }}
                                    // variant="solid"
                                    width="95%"
                                    fontSize="sm"
                                    _active={{ background: 'orange.200' }}>
                                    + Create New Community
                                </Button>
                            </Link>
                        </Box>
                    </Show>
                    <Box display={allBtn || isMobile ? "block" : "none"}>
                        {
                            community?.count == 0 ? checkCommunity() : <Box></Box>
                        }
                        <Box
                            display={community?.communityList.own.length == 0 ? "none" : "block"}
                            mt={2}
                            mb={2}
                            background={{ md: "#E67F45", base: "" }}
                            p={{ md: "4", base: "4" }}
                            borderRadius={"xl"}
                            shadow={{ base: "none", md: 'md' }}>
                            <Text as="b" color={{ md: "white", base: "none" }}>
                                Community you manage
                            </Text>
                            {renderOwnCommunity()}
                        </Box>

                        <Box mt={2} mb={3}
                            display={community?.communityList.joined.length == 0 ? "none" : "block"}
                            background={{ md: "#E67F45", base: "none" }}
                            shadow={{ base: 'none', md: 'md' }}
                            p={{ md: "4", base: "4" }}
                            borderRadius={{ base: 'none', md: 'xl' }}>
                            <Text as="b" color={{ md: "white", base: "none" }}>
                                Community you've joined
                            </Text>
                            {renderJoinedCommunity()}
                        </Box>
                    </Box>
                </Box>
                {/* <Show above="md"> */}
                <Show>
                    <Box width={"100%"}>
                        {/* <Box
                            display={inviteBtn || isMobile
                                && community?.communityList.invite.length != 0
                                ? "block" : "none"}
                            shadow={{ base: 'none', md: 'md' }}
                            background={{ md: "#E67F45", base: "" }}
                            width="100%"
                            pt={4}
                            textAlign="start"
                            pl={5}
                            pr={5}
                            pb={4}
                            borderRadius='xl'
                        >
                            <Text
                                as="b" color={{ md: "white", base: "none" }}>
                                Invitation
                            </Text>
                            <Text
                                fontSize="sm" color={{ md: "white", base: "none" }}>
                                These people have invited you to join the community
                            </Text>
                            {renderInvitedCommunity()}
                        </Box> */}
                        <Box
                            display={inviteBtn || isMobile
                                && community?.communityList.invite.length != 0
                                ? "block" : "none"}
                            shadow={{ base: 'none', md: 'md' }}
                            background={{ md: "#E67F45", base: "" }}
                            width="100%"
                            pt={4}
                            textAlign="start"
                            pl={5}
                            pr={5}
                            pb={4}
                            borderRadius='xl'
                        >
                            <Text
                                as="b" color={{ md: "white", base: "none" }}>
                                Waiting for approval
                            </Text>
                            <Text
                                fontSize="sm" color={{ md: "white", base: "none" }}>
                                You have joined a community but must wait for approval
                            </Text>
                            {renderPendingRequest()}
                        </Box>
                        <Box
                            display={suggestBtn || isMobile
                                && community?.communityList.suggest.length != 0
                                ? "block" : "none"}
                            mt={2}
                            borderRadius="xl"
                            shadow={{ base: 'none', md: 'md' }}
                            background={{ md: "#E67F45", base: "" }}
                            width="100%"
                            pt={4}
                            textAlign="start"
                            pl={5}
                            pr={5}
                            pb={4}
                        >
                            <Text
                                // display={community.suggestCommunity.length != 0 ? "block" : "none"}
                                as="b" color={{ md: "white", base: "none" }}>
                                Suggested for you
                            </Text>
                            <Text
                                // display={community.suggestCommunity.length != 0 ? "block" : "none"}
                                fontSize="sm" color={{ md: "white", base: "none" }}>
                                Communities you might be interested in.
                            </Text>
                            <Grid gap={2} templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(2, 1fr)" }} width="100%">
                                {renderSuggestCommunity()}
                            </Grid>
                        </Box>
                    </Box>
                </Show>
            </Flex>
        </AppBody >
    )
}

export default index