import { announcement, announcement_approve, announcement_approve2 } from "@apiType/announcement"
import { Box, Flex, Heading, Spacer, IconButton, SlideFade, Slide, useDisclosure, Button, Text, Container, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { GrDown, GrUp } from "react-icons/gr"
import { TfiAnnouncement } from "react-icons/tfi"
import { Link } from "react-router-dom"
import API from "src/function/API"
import ExpandOnTop from "../../components/annoucement/ExpandOnTop"
import PostOnTop from "../../components/annoucement/PostOnTop"
import AppBody from "../../components/share/app/AppBody"
import { postInfoTest } from "./postInfoTest"

const test = () => {
    const [allPost, setAllPost] = React.useState(postInfoTest)
    const [clickArrowDown, setHide] = React.useState(false)
    const [clickMinimize, setMinimize] = React.useState(false)
    const [clickArrowUp, setTop] = React.useState(true)
    const { isOpen, onToggle } = useDisclosure()

    const clickToMini = () => {
        setMinimize(true)
        setHide(false)
    }

    const clickIcon = () => {
        setMinimize(false)
        setHide(true)
    }

    const clickToBeOne = () => {
        setHide(false)
        setTop(true)
    }

    const clickToExpand = () => {
        setTop(false)
        setHide(true)
    }
    

    const [toggle, settoggle] = useState(false)
    const [allPost2, setAllPost2] = useState<announcement[]>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getDataPost = API.get("/announcement/getPostOnAnnouncement")
    useEffect(() => {
        getDataPost.then((res) => setAllPost2(res.data)).catch((err) => on()).finally(off)
    }, [toggle])
    // console.log(allPost2);

    if (isLoading)
        return (
            <AppBody>
                <Heading>Loading</Heading>
            </AppBody>
        )

    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24

    let LastestPost: number = 0
    const approveTime: announcement_approve2[] = allPost2.map((el) => {
        const apTime = new Date(el.annApprove.approveTime)
        const dEpd = Math.round(apTime.getTime())
        // console.log(dEpd);
        return { postId: el.postId, approveTime: dEpd }
    })

    // console.log(approveTime.sort());
    const sort = approveTime.sort();
    // const findLasted = (approveTime: announcement_approve2[]) => {
    //     let lasted: string;
    //     for (let i = 0; i < approveTime.length; i++) {
    //         if (approveTime[i].approveTime > LastestPost) {
    //             LastestPost = approveTime[i].approveTime
    //         }
    //     }
    //     for (let i = 0; i < approveTime.length; i++) {
    //         if (approveTime[i].approveTime == LastestPost) {
    //             return lasted = approveTime[i].postId
    //         }
    //     }
    // }

    // console.log(allPost2.filter((el) => {
    //     return el.postId == sort[sort.length-1].postId
    // }))
    // console.log(sort[sort.length-5].postId);

    let fivepost = []
    for (let i = allPost2.length-1; i > allPost2.length-6;i--) {
        fivepost.push(allPost2[i])
    }
    // console.log(fivepost)

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{ md: "3rem" }}
        >
            {/* type 1 */}
            {clickArrowUp && (
                <Box>
                    {/* {recentpost} */}
                    {allPost2.filter((el) => {
                         return el.postId == sort[sort.length-1].postId
                    })
                    .map((fl) => {
                            return (
                                <PostOnTop
                                    topic={fl.annLanguage[0].annTopic}
                                    sender={fl.annCreator.fName+" "+fl.annCreator.lName}
                                    clickToExpand={() => {
                                        clickToExpand(), onToggle()
                                    }}
                                />
                            )
                        })}
                </Box>
            )}

            {/* type 2 */}

            {clickArrowDown && (
                <Slide direction="top" in={isOpen} style={{ zIndex: 10, position: "relative" }}>
                    <Box pb="5" px="5" mt={5} bg="white" rounded="md" shadow="md">
                        {fivepost
                            .map((el) => {
                                return <ExpandOnTop topic={el.annLanguage[0].annTopic} sender={el.annCreator.fName+" "+el.annCreator.lName} />
                            })}
                        <Flex alignItems={"center"} pt={"7"}>
                            <Box pr={"7"}>
                                <Heading size={"sm"} onClick={clickToMini} cursor={"pointer"}>
                                    minimize
                                </Heading>
                            </Box>
                            <Link to={"/announcement"}>
                                <Box>
                                    <Heading size={"sm"}>show more</Heading>
                                </Box>
                            </Link>
                            <Spacer />
                            <Box>
                                <GrUp
                                    onClick={() => {
                                        clickToBeOne(), onToggle()
                                    }}
                                    cursor={"pointer"}
                                />
                            </Box>
                        </Flex>
                    </Box>
                </Slide>
            )}

            {/* type 3 */}
            {clickMinimize && (
                <Box height={"5rem"} width={"100%"} p="5">
                    <Flex justifyContent={"end"} alignItems={"center"}>
                        <IconButton
                            isRound
                            colorScheme="orange"
                            aria-label="Call Segun"
                            size="lg"
                            icon={<TfiAnnouncement fontSize={"1.5rem"} />}
                            boxShadow={"md"}
                            onClick={clickIcon}
                        />
                    </Flex>
                </Box>
            )}
        </AppBody>
    )
}

export default test
