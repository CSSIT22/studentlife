import { Box, Button, Center, Image, Spinner, Text } from "@chakra-ui/react"
import { FC } from "react"
import DatingOutOfCard from "./lottie/DatingOutOfCard.json"
import DatingDiscoveryLoading from "./lottie/DatingDiscoveryLoading.json"
import Lottie from "lottie-react"
import { useNavigate } from "react-router-dom"
import DatingOptionsWhiteImg from "./pic/datingoptionwhite.png"

const DatingRandomReload: FC<{ numOfChar: number; hasSwipe: boolean; isRunOut: boolean }> = ({ numOfChar, hasSwipe, isRunOut }) => {
    const navigate = useNavigate()
    return (
        <Center display="flex">
            <Box
                borderRadius="10px"
                w={{ base: "326px", md: "379px" }}
                h={{ base: "397px", md: "459px" }}
                position="absolute"
                top={{ base: "119px", md: "205px" }}
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="orange.200"
            >
                {numOfChar != 0 && !hasSwipe ? <Lottie animationData={DatingDiscoveryLoading} loop={true} /> :
                    (numOfChar != 0 ? <></> : <><Box><Lottie animationData={DatingOutOfCard} loop={true} /><Box display="flex" justifyContent="center"><Button boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)" colorScheme="orange" onClick={() => navigate("/dating/option/")}><Image width={{ base: "15px", md: "25px" }} src={DatingOptionsWhiteImg} /><Text fontWeight="700" fontSize={{ base: "14px", md: "22px" }} line-height="120%">&nbsp;&nbsp;Option</Text></Button></Box></Box></>)}
                {isRunOut ? <Lottie animationData={DatingDiscoveryLoading} loop={true} /> : <></>}
            </Box>
        </Center>
    )
}

export default DatingRandomReload
