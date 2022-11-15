import { Box, Tag, Text } from "@chakra-ui/react"
import { FC } from "react"
import { INTERESTS } from "./shared/interests"

const DatingCheckDetails: FC<{ Fname: string; Lname: string; Gender: string; Age: string; Faculty: string; interestId: number[] }> = ({
    Fname,
    Lname,
    Gender,
    Age,
    Faculty,
    interestId,
}) => {
    const interests = INTERESTS
    return (
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
                    <Text mt="5px" mb="5px" ml="12px" mr="12px" fontWeight="400" fontSize={{ base: "12px", md: "16px" }} lineHeight="150%">
                        {/* Convert interest id to interest name */}
                        {interests.find((interest) => interest.interestId === i.toString())?.interestName}
                    </Text>
                </Tag>
            ))}
        </Box>
    )
}

export default DatingCheckDetails
