import {
    Flex,
    Button,
    Box,
    Text,
    HStack,
    Input,
    IconButton,
    useBoolean,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import { communityData } from "src/pages/groups/communityData"
import FileList from "src/components/group/FileList"
import { SearchIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import { useNavigate, useParams } from "react-router-dom"
import search from "src/pages/restaurant/search"

const FilePage = () => {

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
    const navigate = useNavigate()
    const goToUpload = () => {
        navigate({
            pathname: "../../airdrop/upload",
            search: x,
        })
    }
    if (isLoading) {
        return (
            // will fix the design later
            <Text>Loading...</Text>
        )
    }
    if (isError) {
        // will fix the design later
        return (
            <Text>There was no community found.</Text>
        )
    }
    return (
        <Box>
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
        </Box>
    )
}

export default FilePage