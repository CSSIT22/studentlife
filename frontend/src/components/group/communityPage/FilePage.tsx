import { Flex, Button, Box, Text, HStack, Input, IconButton, useBoolean } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import FileList from "src/components/group/FileList"
import { SearchIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import { useNavigate, useParams } from "react-router-dom"
import search from "src/pages/restaurant/search"

const FilePage: FC<{
    checkRole: string
    userRole?: string
    userId?: string
    checkId: string
    checkName?: string
}> = ({ checkRole, checkId, checkName }) => {
    let { communityID }: any = useParams()
    const [file, setFile] = useState<any>()

    const x = btoa("?type=community&id=" + communityID)
    const navigate = useNavigate()
    const goToUpload = () => {
        navigate({
            pathname: "../../airdrop/upload",
            search: x,
        })
    }
    // handle searching
    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)

    //get community form backend
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    const fetchFile = async () => {
        try {
            const communityFileResult = (await API.get("/group/getCommunityFile/" + communityID)).data
            await setFile(communityFileResult.communityFile)
        } catch (err) {
            on()
        } finally {
            off()
        }
    }
    useEffect(() => {
        fetchFile()

    }, [])

 
    if (isLoading) {
        return <Text>Loading...</Text>
    }
    if (isError) {
        return <Text>Error</Text>
    }

    //go to airdrop  upload

    return (
        <Box>
            <HStack
                display={"flex"}
                mt="2"
                justify={"space-between"}
                borderRadius={"md"}
                p={3}
                pl={4}
                pr={4}
                boxShadow={"2xl"}
                backgroundColor={"white"}
            >
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
            <Box display={"block"} mt={2} borderRadius={"md"} gap={2} boxShadow={"2xl"} backgroundColor={"white"} p={3} pl={4} pr={4} mb={4}>
                <Flex display={{ base: "none", md: "flex" }} direction="row">
                    <Text as="b" width={"50%"}>
                        File name
                    </Text>
                    <Text as="b" width={"30%"}>
                        Owner
                    </Text>
                    <Text as="b" width={"10%"}>
                        Type
                    </Text>
                </Flex>
                {file &&
                    file?.filter((item: any) => {
                        return searchValue.toLowerCase() == ""
                            ? item
                            : item.file.fileName.toLowerCase().includes(searchValue)
                    })
                        .map((item: any, index: number) => {
                            return (
                                <>
                                    <FileList
                                        fetchFile={fetchFile}
                                        checkName={checkName}
                                        checkRole={checkRole}
                                        checkId={checkId}
                                        userRole={item.file.sender.role}
                                        userId={item.file.sender.userId}
                                        key={index}
                                        fileName={item.file.fileName.split(".")[0].length > 50
                                            ? item.file.fileName.split(".")[0].slice(0, 50) + "..."
                                            : item.file.fileName.split(".")[0]}
                                        owner={item.file.sender.fName + " " + item.file.sender.lName}
                                        fileId={item.file.fileId}
                                        type={item.file.fileName.split(".")[1]} />
                                </>
                            )
                        })}
            </Box>
        </Box>
    )
}

export default FilePage
