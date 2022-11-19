import { Box, HStack, SimpleGrid, useBreakpointValue } from "@chakra-ui/react"
import { useState } from "react"
import DatingCheckDesktopDetails from "src/components/dating/DatingCheckDesktopDetails"
import DatingCheckImage from "src/components/dating/DatingCheckImage"
import DatingCheckMobileDetails from "src/components/dating/DatingCheckMobileDetails"
import DatingLikedYouButton from "src/components/dating/DatingLikedYouButton"
import DatingLikedYouCrossButton from "src/components/dating/DatingLikedYouCrossButton"
import DatingLikedYouHeartButton from "src/components/dating/DatingLikedYouHeartButton"
import DatingYouLikedButton from "src/components/dating/DatingYouLikedButton"
import DatingAppBody from "../../components/dating/DatingAppBody"
import { HEART_HISTORY } from "../../components/dating/shared/heart_history"

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

const YouLiked = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    let HState = { heart_history: HEART_HISTORY }

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
                <DatingLikedYouButton backgroundColor="orange.600" />
                <DatingYouLikedButton backgroundColor="orange.800" />
            </HStack>

            <Box display={{ base: "grid", md: "block" }} gridTemplateColumns="repeat(auto-fill, 200px)" gridGap="10px" justifyContent="center">
                {HState.heart_history
                    .filter((el) => !giveToUser?.some((f) => f.UserId == el.UserId))
                    .map(({ UserId, Fname, Lname, Gender, Age, Faculty, url, interestId }) => (
                        <Box key={UserId} w={{ base: "159px", md: "100%" }} ml="10px" mr="10px">
                            <SimpleGrid display="flex" columns={{ base: 1, md: 2 }} gap="56px">
                                <Box>
                                    <DatingCheckImage url={url} />
                                    <DatingCheckMobileDetails isMobile={isMobile} Fname={Fname} Lname={Lname} />

                                    <HStack
                                        ml={{ base: "25px", md: "25px" }}
                                        gap={{ base: "15px", md: "30px" }}
                                        mt={{ base: "6px", md: "12px" }}
                                        mb={{ md: "12px" }}
                                    >
                                        <DatingLikedYouCrossButton isMobile={isMobile} handleClick={handleClick} UserId={UserId} />
                                        <DatingLikedYouHeartButton isMobile={isMobile} handleClick={handleClick} UserId={UserId} />
                                    </HStack>
                                </Box>
                                <DatingCheckDesktopDetails
                                    Fname={Fname}
                                    Lname={Lname}
                                    Gender={Gender}
                                    Age={Age}
                                    Faculty={Faculty}
                                    interestId={interestId}
                                />
                            </SimpleGrid>

                            {isMobile ? <hr style={{ height: "1px", backgroundColor: "black" }} /> : <></>}
                        </Box>
                    ))}
            </Box>
        </DatingAppBody>
    )
}

export default YouLiked
