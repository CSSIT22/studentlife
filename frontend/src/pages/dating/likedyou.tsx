import { Box, Center, Divider, Heading, HStack, SimpleGrid, Tag, Text, useBreakpointValue } from "@chakra-ui/react"
import { useState } from "react"
import { AiOutlineHeart, AiOutlineStop } from "react-icons/ai"
import { Link } from "react-router-dom"
import DatingLikedYouButton from "src/components/dating/DatingLikedYouButton"
import DatingYouLikedButton from "src/components/dating/DatingYouLikedButton"
import DatingAppBody from "../../components/dating/DatingAppBody"
import { HEART_HISTORY } from "../../components/dating/shared/heart_history"
import { INTERESTS } from "../../components/dating/shared/interests"

interface state {
    heart_history: {
        UserId: string
        Fname: string
        Lname: string
        Gender: string
        Age: string
        Faculty: string
        url: string
        interestId: number[]
    }[]
}
const LikedYou = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    let HState = { heart_history: HEART_HISTORY }
    const interests = INTERESTS

    const [giveToUser, setGiveToUser] = useState<
        | {
              UserId: string
              isSkipped: boolean
          }[]
        | {
              UserId: string
              isSkipped: boolean
          }[]
    >([])

    function handleClick(type: string, UserId: string) {
        if (type == "skip") {
            setGiveToUser(giveToUser?.concat({ UserId: UserId, isSkipped: true }))
        } else if (type == "like") {
            setGiveToUser(giveToUser?.concat({ UserId: UserId, isSkipped: false }))
        }
    }

    return (
        <DatingAppBody>
            <HStack gap={{ base: "20px", md: "100px" }} display="flex" justifyContent="center" pt={{ base: "20px", md: "30px" }}>
                <DatingLikedYouButton backgroundColor="orange.800" />
                <DatingYouLikedButton backgroundColor="orange.600" />
            </HStack>

            <Box display={{ base: "flex", md: "block" }} flexWrap="wrap" justifyContent="center">
                {HState.heart_history
                    .filter((el) => !giveToUser?.some((f) => f.UserId == el.UserId))
                    .map(({ UserId, Fname, Lname, Gender, Age, Faculty, url, interestId }) => (
                        <Box key={UserId} w={{ base: "159px", md: "100%" }} ml="10px" mr="10px">
                            <SimpleGrid display="flex" columns={{ base: 1, md: 2 }} gap="56px">
                                <Box>
                                    <Link to="/user">
                                        <Box
                                            mt={{ base: "32px", md: "46px" }}
                                            backgroundImage={url}
                                            w={{ base: "159px", md: "205px" }}
                                            h={{ base: "223px", md: "250px" }}
                                            backgroundSize="cover"
                                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                            borderRadius="10px"
                                        />
                                    </Link>
                                    <Center>
                                        {isMobile ? (
                                            <></>
                                        ) : (
                                            <Text color="black" mt="6px" fontWeight="400" fontSize="18px" lineHeight="150%">
                                                {Fname.length > 11 ? Fname.substring(0, 11) + "..." : Fname} {Lname.substring(0, 1)}.
                                            </Text>
                                        )}
                                    </Center>

                                    <HStack
                                        ml={{ base: "25px", md: "25px" }}
                                        gap={{ base: "15px", md: "30px" }}
                                        mt={{ base: "6px", md: "12px" }}
                                        mb={{ md: "12px" }}
                                    >
                                        <Box
                                            w={{ base: "40px", md: "60px" }}
                                            h={{ base: "40px", md: "60px" }}
                                            cursor="pointer"
                                            onClick={() => handleClick("skip", UserId)}
                                        >
                                            {isMobile ? <AiOutlineStop size="60px" color="black" /> : <AiOutlineStop size="40px" color="black" />}
                                        </Box>
                                        <Box
                                            w={{ base: "40px", md: "60px" }}
                                            h={{ base: "40px", md: "60px" }}
                                            cursor="pointer"
                                            onClick={() => handleClick("like", UserId)}
                                        >
                                            {isMobile ? <AiOutlineHeart size="60px" color="black" /> : <AiOutlineHeart size="40px" color="black" />}
                                        </Box>
                                    </HStack>
                                </Box>

                                <Box display={{ base: "none", md: "block" }}>
                                    <Box display="flex">
                                        <Text color="black" mt="46px" fontWeight="700" fontSize="30px" lineHeight="133%">
                                            {Fname.length > 19 ? Fname.substring(0, 19) + "..." : Fname}
                                        </Text>
                                        <Text color="black" mt="46px" fontWeight="700" fontSize="30px" lineHeight="133%">
                                            &nbsp;{Lname.substring(0, 1)}.&nbsp;&nbsp;{Gender},&nbsp;{Age}
                                        </Text>
                                    </Box>

                                    <Text h="155px" color="black" mt="5px" fontWeight="400" fontSize="30px" lineHeight="150%">
                                        {Faculty}
                                    </Text>

                                    {interestId.map((i) => (
                                        <Tag
                                            backgroundColor="orange.400"
                                            color="white"
                                            mr="1"
                                            mb="1"
                                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                            borderRadius="5px"
                                            h={{ md: "28px" }}
                                        >
                                            <Text
                                                mt="5px"
                                                mb="5px"
                                                ml="12px"
                                                mr="12px"
                                                fontWeight="400"
                                                fontSize={{ base: "12px", md: "16px" }}
                                                lineHeight="150%"
                                            >
                                                {/* Convert interest id to interest name */}
                                                {interests.find((interest) => interest.interestId === i.toString())?.interestName}
                                            </Text>
                                        </Tag>
                                    ))}
                                </Box>
                            </SimpleGrid>

                            {isMobile ? <hr style={{ height: "1px", backgroundColor: "black" }} /> : <></>}
                        </Box>
                    ))}
                {!isMobile && HState.heart_history.length % 2 == 1 ? (
                    <Box w={{ base: "159px", md: "205px" }} ml="10px" mr="10px" h="223px"></Box>
                ) : (
                    <></>
                )}
            </Box>
        </DatingAppBody>
    )
}

export default LikedYou
