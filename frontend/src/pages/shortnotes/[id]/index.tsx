import { Box, Button, Flex, GridItem, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useBoolean, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppBody from 'src/components/share/app/AppBody'
import CmList from 'src/components/shortnotes/cmList'
import SnDetail from 'src/components/shortnotes/snDetail'
import SnComments from 'src/components/shortnotes/snComments'
import API from 'src/function/API'
import { authContext } from 'src/context/AuthContext'
import Lottie from "lottie-react";
import loading from "../lottie/loading.json";

const index = () => {
    const user = useContext(authContext)
    //{ console.log(user?.userId) }
    const param = useParams()
    const [shortnote, setShortnote] = useState<any>([])
    const [access, setAccess] = useState<any>([])
    const [load, setLoad] = useBoolean(true)
    const [allow, setAllow] = useBoolean(false)
    const style = {
        height: 96,
    };
    const [ress, setRess] = useState<any>([])
    const resentOnclick = () => {
        API.post("/shortnotes/postResentShortnote", {
            snId: param.id
        })
    }
    useEffect(() => {
        API.get("shortnotes/getShortnoteDetail/" + param.id).then((item) => {
            resentOnclick()
            if (item.data.isPublic) {
                setAllow.on()
                setShortnote(item.data)
            } else {
                setAccess(item.data.userAccess)
                const acc = item.data.userAccess
                const x: any = []
                acc.map((ac: any) => (
                    x.push(ac.userId)
                ))
                setAccess(x)

                if (x.includes(user?.userId)) {
                    setAllow.on()
                }
                setShortnote(item.data)
            }
            if (item.data.isPublic == false) {
                onOpen()
            }
        }).finally(setLoad.off)

        //file()
    }, [])

    const file = () => {
        API.get("/shortnotes/getFile", {
            data: {
                snId: param.id
            }
        }).then((res) => {
            setRess(res.data)
            //console.log(res.data);

        })

    }
    useEffect(() => {
        ress.forEach((res: any) => {
            console.log(ress);

            API.get("/shortnotes/getEachFile", {
                data: res,

                responseType: "arraybuffer"
            }).then((res2) => {
                console.log(res2.data);

            })
        });

    }, [ress])


    const blur = {
        filter: "blur(8px)"
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()

    if (load) {
        return (
            <AppBody><Box mt={300}><Lottie style={style} animationData={loading}></Lottie></Box></AppBody>
        )
    }
    return (
        <AppBody>
            {allow ? <Box><Box p={6} bg={"white"} boxShadow={"xl"} rounded={8} mb={4}>
                <SnDetail
                    topic={shortnote.snName}
                    course={shortnote.course.courseName}
                    desc={shortnote.snDesc}
                    link={shortnote.snLink}
                    owner={shortnote.owner.fName + " " + shortnote.owner.lName}
                    date={shortnote.created}
                    isPublic={shortnote.isPublic}
                />
            </Box>
                <Box bg={"white"} boxShadow={"xl"} rounded={8} p={6} mb={4}>
                    <SnComments />
                </Box>
            </Box>
                :
                <Box style={blur}>
                    <Box p={6} bg={"white"} boxShadow={"xl"} rounded={8} mb={4}>
                        <SnDetail
                            topic={"What do you expect to see???"}
                            course={"LOL555"}
                            desc={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, voluptatem asperiores. Molestiae expedita minima ad in commodi veritatis iusto quaerat animi quis! Dolores voluptatem nesciunt porro quidem alias ut suscipit."}
                            link={"youtu.be/dQw4w9WgXcQ"}
                            owner={"Maibok Yaloktam"}
                            date={shortnote.created}
                            isPublic={shortnote.isPublic}
                        />
                    </Box>
                    <Box bg={"white"} boxShadow={"xl"} rounded={8} p={6} mb={4}>
                        <Box mb={4} rounded={8}>
                            <Box>
                                <Heading size={"md"} mb={1}>
                                    Comments
                                </Heading>
                                <Textarea h={150} mb={2} py={4} placeholder={"What are your thoughts ?"} />
                                <Flex direction={"row"} justifyContent={"end"}>
                                    <Button colorScheme={"orange"} >Comment</Button>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Permission needed.</ModalHeader>
                    <ModalBody pb={6}>
                        You don't have a permission to access this shortnote.</ModalBody>
                    <ModalFooter>
                        <Button colorScheme='orange' mr={3} onClick={() => {
                            navigate({
                                pathname: "../shortnotes"
                            })
                        }}>
                            Back
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </AppBody>
    )
}

export default index