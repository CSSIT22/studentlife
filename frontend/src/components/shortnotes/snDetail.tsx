import React, { FC, useContext, useEffect, useState } from "react"
import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    Spacer,
    HStack,
    GridItem,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Stack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    IconButton,
    chakra,
    useCheckboxGroup,
    useCheckbox,
    useToast,
    Input,
    SimpleGrid,
    VStack,
    Divider,
    Show,
    Hide,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea,
} from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi"
import { AiFillDelete, AiOutlineCloseCircle, AiOutlineEdit, AiOutlineUpload, AiOutlineUsergroupAdd } from "react-icons/ai"
import { MdDeleteOutline } from "react-icons/md"
import { BiDownArrow, BiLibrary, BiUpArrow } from "react-icons/bi"
import LiList from "./liList"
import { Link, useNavigate, useParams } from "react-router-dom"
import search from "src/pages/restaurant/search"
import { BsCheckLg } from "react-icons/bs"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"
import InLiList from "./inLiList"
import { IoMdRemoveCircleOutline } from "react-icons/io"

const snDetail: FC<{
    topic: String
    course: String
    desc: String
    link: String
    owner: String
    date: string | any
    isPublic: boolean
}> = ({ topic, course, desc, link, owner, date, isPublic }) => {
    const user = useContext(authContext)
    const param = useParams()
    const [editCourse, setEditCourse] = useState<any>(course)
    const [editName, setEditName] = useState<any>(topic)
    const [editDesc, setEditDesc] = useState<any>(desc)
    const [li, setLi] = useState([])
    const [access, setAccess] = useState([])
    const { isOpen: esIsOpen, onOpen: esOnOpen, onClose: esOnClose } = useDisclosure()
    const [deletingFile, setDeletingFile] = useState<any>([])
    const [editFile, setEditFile] = useState<any>([])
    const [pName, setpName] = useState("")
    const [people, setPeoples] = useState<string[]>([])
    const { isOpen: mliIsOpen, onOpen: mliOnOpen, onClose: mliOnClose } = useDisclosure()
    const { isOpen: dsIsOpen, onOpen: dsOnOpen, onClose: dsOnClose } = useDisclosure()
    const { isOpen: apIsOpen, onOpen: apOnOpen, onClose: apOnClose } = useDisclosure()
    const { isOpen: eeIsOpen, onOpen: eeOnOpen, onClose: eeOnClose } = useDisclosure()
    const navigate = useNavigate()

    useEffect(() => {
        API.get("/shortnotes/getPeople/" + param.id).then((item) => {
            setAccess(item.data)
        })
        API.get("/shortnotes/getLibrary").then((item) => {
            setLi(item.data)
        })
        getFile()
    }, [])
    useEffect(() => {
        if (!apIsOpen) {
            setPeoples([])
        }
    }, [apIsOpen])

    const x = btoa("?type=shortnote&id=" + param.id)
    const goToUpload = () => {
        navigate({
            pathname: "../../airdrop/upload",
            search: x,
        })
    }

    const handleDeleteSn = () => {
        API.delete("/shortnotes/deleteShortnote/" + param.id).then(() => {
        }).then(() => {
            toast({
                title: "Shortnote deleted",
                description: "You've deleted the shortnote.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            navigate({
                pathname: "../shortnotes",
            })
        })
    }

    const handleAddToLi = (li: string) => {
        API.post("/shortnotes/postInLibrary", {
            snId: param.id,
            libId: li
        })
    }
    const toast = useToast()




    const handleAddPoeple = () => {
        let failId: any = []
        people.forEach((p: any) => {
            let regex = /^\d{11}$/
            if (!regex.test(p)) {
                failId.push(p)
            }
        })
        if (failId[0] != null) {
            let x = failId.join(", #")
            toast({
                description: 'User #' + x + ' not found, please try again.',
                status: 'warning',
                duration: 6000,
                isClosable: true,
            })
        }
        else {
            API.post("/shortnotes/postAccess", {
                snId: param.id,
                people: people
            })
            apOnClose()
            toast({
                title: 'People added',
                description: "You've added people to access this shortnote.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        }

    }

    const handleDeletePoeple = (_userId: any) => {
        API.delete("/shortnotes/deletePeople", {
            data: {
                snId: param.id,
                userId: _userId
            }
        })
    }

    const [allFiles, setAllFiles] = useState<any>([])
    const [myFiles, setMyFiles] = useState<any>([])
    let f: any[] = []
    const getFile = () => {
        API.get("/shortnotes/getFile/" + param.id).then((res) => {
            setAllFiles(res.data)
            setEditFile(res.data)
        })

    }
    // useEffect(() => {
    //     allFiles.forEach((file: any) => {
    //         API.get("/shortnotes/getEachFile/ " + file.fileId, {

    //             responseType: "arraybuffer"
    //         }).then((_file) => {
    //             console.log(_file.data);
    //             console.log(_file.headers["content-type"]);
    //             try {
    //                 let fileBlob = new Blob([new Uint8Array(_file.data)], { type: _file.headers["content-type"] })
    //                 const urlCreator = window.URL || window.webkitURL
    //                 const blobUrl = urlCreator.createObjectURL(fileBlob)
    //                 window.open(blobUrl);
    //                 const a = document.createElement("a")
    //                 a.download = file.file.fileName
    //                 a.href = blobUrl
    //                 document.body.appendChild(a)
    //                 a.click()
    //                 a.remove()
    //             } catch (error) {
    //                 console.log(error)
    //             }

    //         })
    //     });

    // }, [allFiles])
    const openFile = (fd: any) => {
        API.get("/shortnotes/getEachFile/ " + fd, {

            responseType: "arraybuffer"
        }).then((_file) => {
            //console.log(_file.data);
            //console.log(_file.headers["content-type"]);
            try {
                let fileBlob = new Blob([new Uint8Array(_file.data)], { type: _file.headers["content-type"] })
                const urlCreator = window.URL || window.webkitURL
                const blobUrl = urlCreator.createObjectURL(fileBlob)
                //var blobUrl = URL.createObjectURL(fileBlob);
                window.open(blobUrl);
                const a = document.createElement("a")
                // a.download = file.file.fileName
                //a.target = "_blank"
                //a.href = blobUrl
                // document.body.appendChild(a)
                //a.click()
                // a.remove()
            } catch (error) {
                console.log(error)
            }

        })
    }
    const editShortnote = () => {
        if (editName.replaceAll(" ", "") == "" || editCourse.replaceAll(" ", "") == "" || editDesc.replaceAll(" ", "") == "") {
            toast({
                title: 'Please complete the form.',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            })
        } else {
            if (!/^[a-zA-Z]{3}\d{3}$/.test(editCourse)) {
                toast({
                    title: 'Invalid course id, please check again.',
                    status: 'warning',
                    duration: 6000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Shortnote editted',
                    description: "You've editted the shortnote.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                API.put("shortnotes/editShortnote", {
                    courseId: editCourse.toUpperCase().replaceAll(" ", ""),
                    snName: editName,
                    snDesc: editDesc,
                    snId: param.id,
                    fileId: deletingFile
                }).then((res) => {
                    window.location.reload()
                })
            }
        }
    }

    const setDefaultEdit = () => {
        setEditCourse(course)
        setEditDesc(desc)
        setEditName(topic)
        setEditFile(allFiles)
    }

    const handleCloseEdit = () => {
        if (editCourse == course && editDesc == desc && editName == topic && editFile == allFiles) {
            esOnClose()
        } else {
            eeOnOpen()
        }
    }

    return (
        <Box>
            <HStack>
                <Heading size={"lg"}>{topic}</Heading>
                <Spacer />
                <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<HiDotsHorizontal />} variant="ghost" />
                    <MenuList>
                        <MenuItem icon={<BiLibrary />} onClick={mliOnOpen}>
                            Add to library
                        </MenuItem>
                        {owner == user?.fName + " " + user?.lName ? <>
                            {isPublic == false ?
                                <MenuItem icon={<AiOutlineUsergroupAdd />} onClick={apOnOpen}>
                                    Manage people
                                </MenuItem>
                                :
                                null
                            }
                            <MenuItem icon={<AiOutlineUpload />} onClick={goToUpload}>
                                Upload file
                            </MenuItem>
                            <MenuItem icon={<AiOutlineEdit />} onClick={esOnOpen}>
                                Edit
                            </MenuItem>
                            <MenuItem icon={<MdDeleteOutline />} onClick={dsOnOpen}>
                                Delete
                            </MenuItem></> : null}

                    </MenuList>
                </Menu>
            </HStack>

            <Heading size={"sm"} bg={"orange.500"} color={"white"} rounded={6} w={20} py={1} mb={6} textAlign={"center"} boxShadow={"base"}>
                {course}
            </Heading>
            <Box mb={6}>
                <Text>{desc}</Text>
            </Box>
            {allFiles[0] != null ?
                <>
                    <Heading size={"sm"} mb={1}>Attached files</Heading>
                    <VStack>
                        {allFiles.map((file: any, key: any) => (
                            <Flex key={key} w={"100%"} justifyContent={"start"}>
                                <Heading as="button" shadow={"base"} size={"xs"} bg={"gray.100"} rounded={6} p={2} _hover={{ cursor: "pointer", bg: "gray.200" }} onClick={() => { openFile(file.fileId) }}>{file.file.fileName}</Heading>
                            </Flex>
                        ))}
                    </VStack>
                </>
                :
                null}
            <HStack>
                {/* <HStack>
                    <Box as="button">
                        <Text
                            fontSize={"30px"}
                            _hover={{ bg: "#ebedf0" }}
                            _active={{
                                bg: "#dddfe2",
                                transform: "scale(0.98)",
                                borderColor: "#bec3c9",
                            }}
                        >
                            <BiUpArrow />
                        </Text>
                    </Box>
                    <Text>0</Text>
                    <Box as="button">
                        <Text
                            fontSize={"30px"}
                            _hover={{ bg: "#ebedf0" }}
                            _active={{
                                bg: "#dddfe2",
                                transform: "scale(0.98)",
                                borderColor: "#bec3c9",
                            }}
                        >
                            <BiDownArrow />
                        </Text>
                    </Box>
                </HStack> */}
                <Spacer />
            </HStack>

            <Hide below="sm">
                <Text textAlign={"right"} fontSize={"xs"}>Posted by {owner} at {new Date(date).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}</Text>
            </Hide>
            <Show below="sm">
                <Text textAlign={"right"} fontSize={"xs"}>Posted by {owner}</Text>
                <Text textAlign={"right"} fontSize={"xs"}>at {new Date(date).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}</Text>
            </Show>
            <Modal onClose={dsOnClose} isOpen={dsIsOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete shortnote</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to delete this shortnote?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            handleDeleteSn()
                            dsOnClose()
                        }} colorScheme={"red"}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Drawer isOpen={mliIsOpen} placement="right" onClose={mliOnClose} size={"sm"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <HStack gap={4}>
                            <Heading size={"lg"}> My library</Heading>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack gap={4}>
                            {li.map((li: any, key) => (
                                <Box key={key} onClick={() => {
                                    handleAddToLi(li.libId)
                                    toast({
                                        title: 'Shortnote added',
                                        description: "You've added the shortnote to your library.",
                                        status: 'success',
                                        duration: 4000,
                                        isClosable: true,
                                    })
                                }}>
                                    <LiList name={li.libName}></LiList>
                                </Box>
                            ))}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Modal onClose={apOnClose} isOpen={apIsOpen} isCentered scrollBehavior={"inside"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Manage people
                        <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={2}>
                            <GridItem colSpan={4}>
                                <Input
                                    placeholder="studentID, comma seperated"
                                    focusBorderColor="orange.500"
                                    value={pName}
                                    onChange={(e) => setpName(e.target.value)}
                                ></Input>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Button
                                    colorScheme={"orange"}
                                    rounded={8}
                                    w={"100%"}
                                    onClick={() => {
                                        let x = pName.replaceAll(" ", "").split(',').filter((n) => n != "")
                                        //let newPeople = [pName, ...people] //add to begin
                                        let newPeople = x.concat(people)
                                        setPeoples(newPeople)
                                        setpName("")
                                    }}
                                >
                                    Add
                                </Button>
                            </GridItem>
                        </Grid></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box gap={2} mt={4} mb={4}>
                            <SimpleGrid columns={2} gap={4}>
                                {people.map((p, key) => (
                                    <Grid templateColumns='repeat(5, 1fr)' bg={"gray.50"} boxShadow={"base"} rounded={8} key={key} w={"100%"} p={2} alignItems={"center"}>
                                        <GridItem colSpan={4}>
                                            <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
                                                <Text>{p}</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem>
                                            <Button variant={"ghost"} onClick={() => {
                                                let x = people.filter((e) => e != p)
                                                setPeoples(x)
                                            }}>
                                                <AiOutlineCloseCircle />
                                            </Button>
                                        </GridItem>
                                    </Grid>
                                ))}
                            </SimpleGrid>
                            <Divider my={6} />
                            <VStack gap={2}>
                                {access.map((a: any, key) => (
                                    <Grid templateColumns='repeat(7, 1fr)' bg={"gray.50"} boxShadow={"base"} rounded={8} key={key} w={"100%"} p={2} alignItems={"center"}>
                                        <GridItem colSpan={6}>
                                            <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
                                                <Text w={"100%"}>{a.accessBy.studentId}</Text>
                                                <Text w={"100%"}>{a.accessBy.fName} {a.accessBy.lName}</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem>
                                            <Button variant={"ghost"} onClick={() => {
                                                handleDeletePoeple(a.accessBy.userId)
                                                toast({
                                                    title: 'People deleted',
                                                    description: "You've deleted people to access this shortnote.",
                                                    status: 'success',
                                                    duration: 4000,
                                                    isClosable: true,
                                                })


                                                let x: any = access.filter((e: any) => e != a)
                                                setAccess(x)
                                            }}>
                                                <IoMdRemoveCircleOutline />
                                            </Button>
                                        </GridItem>
                                    </Grid>
                                ))}
                            </VStack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            handleAddPoeple()
                        }} w={"100%"} colorScheme={"orange"}>Done</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal scrollBehavior={"inside"} size={"xl"} onClose={handleCloseEdit} isOpen={esIsOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit shortnote</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid templateColumns="repeat(3, 1fr)">
                            <Spacer />
                            <GridItem>
                                <Flex justifyContent={"center"}>
                                    <Box w={100}>
                                        <FormControl >
                                            <FormLabel>Course</FormLabel>
                                            <Input variant="outline" placeholder="" focusBorderColor="orange.500" value={editCourse} onChange={(e) => setEditCourse(e.target.value)} />
                                            <FormErrorMessage>Course is required.</FormErrorMessage>
                                        </FormControl>

                                    </Box>
                                </Flex>
                            </GridItem>
                            <Spacer />
                            <GridItem colSpan={3}>
                                <Box>
                                    <FormControl >
                                        <FormLabel>Name</FormLabel>
                                        <Input variant="outline" placeholder="" focusBorderColor="orange.500" value={editName} onChange={(e) => setEditName(e.target.value)} />
                                        <FormErrorMessage>Name is required.</FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </GridItem>
                            <GridItem colSpan={3}>
                                <Box>
                                    <FormControl >

                                        <FormLabel>Description</FormLabel>

                                        <Textarea placeholder="" h={200} focusBorderColor="orange.500" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                                        <FormErrorMessage>Description is required.</FormErrorMessage>
                                    </FormControl>

                                </Box>
                            </GridItem>
                        </Grid>
                        {allFiles[0] != null ?
                            <>
                                <FormLabel>Attached files</FormLabel>
                                <VStack>
                                    {editFile.map((file: any, key: any) => (
                                        <Flex key={key} w={"100%"} justifyContent={"start"}>
                                            <Flex shadow={"base"} bg={"gray.100"} rounded={6}>
                                                <Heading alignSelf={"center"} size={"sm"} bg={"gray.100"} p={2}  >{file.file.fileName}</Heading>
                                                <Button variant={"ghost"} _hover={{ cursor: "pointer", bg: "gray.200" }} onClick={() => {
                                                    setDeletingFile((deletingFile: any) => [...deletingFile, file.fileId])
                                                    let x = editFile.filter((df: any) => df.fileId != file.fileId)
                                                    setEditFile(x)
                                                }}>
                                                    <IoMdRemoveCircleOutline />
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </VStack>
                            </>
                            :
                            null}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="orange" w={"100%"} onClick={() => {
                            editShortnote()
                        }}>
                            Done
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal onClose={eeOnClose} isOpen={eeIsOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Close edit shortnote.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Anything you have editted will be lose.</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            eeOnClose()
                            esOnClose()
                            setDefaultEdit()
                        }} colorScheme={"orange"}>
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default snDetail
