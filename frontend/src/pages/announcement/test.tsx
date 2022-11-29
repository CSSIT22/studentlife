import { Box, Flex, Heading, Spacer, IconButton, SlideFade, Slide, useDisclosure, Button, Text, Container } from "@chakra-ui/react"
import React from "react"
import { GrDown, GrUp } from "react-icons/gr"
import { TfiAnnouncement } from "react-icons/tfi"
import { Link } from "react-router-dom"
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
                    {allPost
                        .filter((fl) => fl.postId == postInfoTest.length - 1)
                        .map((el) => {
                            return (
                                <PostOnTop
                                    topic={el.topic}
                                    sender={el.sender}
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
                        {allPost
                            // อันนี้มันยังเรียงตามid น้อยไปมากอยู่ ไม่ได้เอาอันใหม่สุดขึ้นบน ตอนดึงจากdb น่าจะต้องใช้order by
                            .filter((fl) => fl.postId > postInfoTest.length - 6)
                            .map((el) => {
                                return <ExpandOnTop topic={el.topic} sender={el.sender} />
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
