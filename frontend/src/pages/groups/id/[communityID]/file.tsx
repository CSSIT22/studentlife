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
} from "@chakra-ui/react"
import React, { useState } from "react"
import NavCommunity from "src/components/group/NavCommunity"
import AppBody from "src/components/share/app/AppBody"
import { BrowserRouter, BrowserRouter as Router, useParams, Link } from "react-router-dom"
import { userData } from "../../data"
import { FaDownload, FaBan, FaExclamationCircle, FaHandMiddleFinger, FaSearch, FaUser, FaUserLock, FaUserShield } from "react-icons/fa"
import FriendInviteList from "src/components/group/FriendInviteList"
import { BsFillFileEarmarkTextFill, BsThreeDots } from "react-icons/bs"
import { RiDeleteBinFill } from "react-icons/ri"
import { communityData } from "../../communityData"
import FileList from "src/components/group/FileList"
import { SearchIcon } from "@chakra-ui/icons"
const file = () => {
    let { communityID }: any = useParams<{ communityID: string }>()
    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)

    // const tags = [{ tagID: 1, tagName: "#Sport" }, { tagID: 2, tagName: "#Music" }, { tagID: 3, tagName: "#Gaming" }]
    return (
        <AppBody>
            <NavCommunity
                communityName="Passakorn group"
                isPrivate={false}
                isMember={true}
                description={
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum cumque nemo veniam amet fugiat beatae, quo magni eum voluptatem eligendi nesciunt numquam odio autem ex quaerat totam. At, facilis."
                }
                coverPhoto="https://picsum.photos/id/400/800"
                members={10}
                communityID={1000}
                tags={userData.Tag}
                activeBtn={3}
            />
            <HStack justify={"space-between"} borderRadius={"md"} p={3} pl={4} pr={4} boxShadow={"2xl"} backgroundColor={"white"}>
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

                    <Button background={"orange.600"} _hover={{ background: "orange.200" }} color={"white"}>
                        Upload
                    </Button>
                </HStack>
            </HStack>
            <Box mt={2} borderRadius={"md"} gap={2} boxShadow={"2xl"} backgroundColor={"white"} p={3} pl={4} pr={4} mb={4}>
                <Flex display={{ base: "none", md: "flex" }} direction="row">
                    <Text as="b" width={"30%"}>
                        File name
                    </Text>
                    <Text as="b" width={"30%"}>
                        Owner
                    </Text>
                    <Text as="b" width={"10%"}>
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
