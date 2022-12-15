import {
    Flex,
    Heading,
    VStack,
    Button,
    Box,
    Text,
    HStack,
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    IconButton,
    Center,
    useBoolean,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import NavCommunity from "src/components/group/NavCommunity"
import AppBody from "src/components/share/app/AppBody"
import { BrowserRouter, BrowserRouter as Router, useParams, Link, useNavigate } from "react-router-dom"
import { userData } from "../../data"
import { FaDownload, FaBan, FaExclamationCircle, FaHandMiddleFinger, FaSearch, FaUser, FaUserLock, FaUserShield } from "react-icons/fa"
import FriendInviteList from "src/components/group/FriendInviteList"
import { BsFillFileEarmarkTextFill, BsThreeDots } from "react-icons/bs"
import { RiDeleteBinFill } from "react-icons/ri"
import search from "src/pages/restaurant/search"
import { communityData } from "../../communityData"
import FileList from "src/components/group/FileList"
import { SearchIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import PrivateContent from "src/components/group/PrivateContent"
import Banned from "src/components/group/Banned"
const file = () => {

    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)

    let { communityID }: any = useParams()
    const [community, setCommunity] = useState<any>()

    //get community form backend
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const status = 0
    // const [community, setCommunity] = useState<any>()
    useEffect(() => {
        API.get('/group/getCommunityId/' + communityID,)
            .then((res) => {
                setCommunity(res.data)
                console.log(res.data)
            }).catch((err) => on())
            .finally(() => off())
    }, [])

    
    const x = btoa("?type=community&id=" + communityID)
    const goToUpload = () => {
        navigate({
            pathname: "../../airdrop/upload",
            search: x,
        })
    }

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
                communityMembers={community?.memberCount + 1}
                activeBtn={3}
                isPending={community?.isPending}
                tags={community?.tags}
                isBlacklist={community?.isBlacklist}
            // tags={tag}
            />
            <Box>
                <PrivateContent
                    isMember={community?.isMember}
                    communityId={community?.communityId}
                    communityPrivacy={community?.communityPrivacy}

                />
            </Box>
            <Box>
                <Banned
                    isBlacklisted={community?.isBlacklist}
                />
            </Box>
            <HStack
                display={community.isMember || !community.communityPrivacy && !community?.isBlacklist ? "flex" : "none"}
                mt='2' justify={"space-between"} borderRadius={"md"} p={3} pl={4} pr={4} boxShadow={"2xl"} backgroundColor={"white"}>
                <Text as={"b"} ml={8}>
                    Files
                </Text>
                <HStack justify={"flex-end"} width={"100%"}>
                    <HStack boxShadow={"md"} borderRadius="md">
                        <Box color={"black"} mr={-3}>
                            <IconButton
                                disabled={true}
                                aria-label="Search database"
                                background={"white"}
                                _hover={{ background: "default", cursor: "default" }}
                                icon={<SearchIcon />}
                            />
                        </Box>
                        <Input
                            // width={"100%"}
                            // display={searchBtn ? "" : "none"}
                            variant={"filled"}
                            maxWidth={"200px"}
                            type={"search"}
                            value={searchValue}
                            onChange={handleChange}
                            placeholder="Seacrh File"
                            focusBorderColor="gray.200"
                            background={"white"}
                        ></Input>
                    </HStack>

                    <Button background={"orange.600"} _hover={{ background: "orange.200" }} color={"white"} onClick={goToUpload}>
                        Upload
                    </Button>
                </HStack>
            </HStack>
            <Box
                display={community.isMember || !community.communityPrivacy && !community?.isBlacklist ? "block" : "none"}
                mt={2}
                borderRadius={"md"}
                gap={2}
                boxShadow={"2xl"}
                backgroundColor={"white"}
                p={3} pl={4} pr={4} mb={4}>
                <Flex display={{ base: "none", md: "flex" }} direction="row">
                    <Text as="b" width={"30%"}>
                        File name
                    </Text>
                    <Text as="b" width={"25%"}>
                        Owner
                    </Text>
                    <Text as="b" width={"15%"}>
                        Type
                    </Text>
                    <Text as="b" width={"30%"}>
                        Modified Date
                    </Text>
                </Flex>

                {communityData.communityfile.map((file) => (
                    <FileList key={file.FileID} fileName={file.Filename} owner={file.Owner} type={file.FileType} date={file.Date} />
                ))}
            </Box>
        </AppBody>
    )
}

export default file