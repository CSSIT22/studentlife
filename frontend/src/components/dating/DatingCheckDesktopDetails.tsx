import { AllInterests } from "@apiType/dating";
import { Box, Tag, Text } from "@chakra-ui/react"
import { FC } from "react"
import { motion } from "framer-motion"

const DatingCheckDetails: FC<{
    Fname: string; Lname: string; Gender: string; Birth: Date; Faculty: string; Interests: {
        interestId: number;
    }[]; AllInterests: AllInterests[]
}> = ({
    Fname,
    Lname,
    Gender,
    Birth,
    Faculty,
    Interests,
    AllInterests,
}) => {
        function getAge(dateString: Date) {
            var today = new Date()
            var birthDate = new Date(dateString)
            var age = today.getFullYear() - birthDate.getFullYear()
            var m = today.getMonth() - birthDate.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--
            }
            return age
        }

        return (
            <Box display={{ base: "none", md: "block" }}>
                <Box display="flex">
                    <Text color="black" mt="46px" fontWeight="700" fontSize="30px" lineHeight="133%">
                        {Fname.length > 19 ? Fname.substring(0, 19) + "..." : Fname}
                    </Text>
                    <Text color="black" mt="46px" fontWeight="700" fontSize="30px" lineHeight="133%">
                        &nbsp;{Lname.substring(0, 1)}.
                    </Text>
                    <Text color="black" mt="46px" fontWeight="400" fontSize="30px" lineHeight="133%">
                        &nbsp;&nbsp;{Gender.substring(0, 1)},&nbsp;{getAge(Birth)}
                    </Text>
                </Box>

                <Text h="155px" color="black" mt="5px" fontWeight="400" fontSize="30px" lineHeight="150%">
                    {Faculty}
                </Text>

                {Interests.map((i) => (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ display: "inline-block" }}
                        whileTap={{ scale: 1 }}
                        whileHover={{ scale: 1.2, }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20,
                        }}
                    >
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
                                {AllInterests.find((interest) => interest.interestId === i.interestId)?.interestName}
                            </Text>
                        </Tag>
                    </motion.div>
                ))}
            </Box>
        )
    }

export default DatingCheckDetails
