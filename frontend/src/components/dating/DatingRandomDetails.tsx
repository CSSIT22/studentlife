import { Box, Text, useBreakpointValue } from "@chakra-ui/react"
import { FC } from "react"
import { motion } from "framer-motion"
import { UserCardDetail } from "@apiType/dating"

const DatingRandomFaculty: FC<{
    characters: UserCardDetail[]
    currentIndex: number
}> = ({ characters, currentIndex }) => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

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
        <>
            <Box pt={{ base: "15px", md: "30px" }}>
                <motion.div
                    key={currentIndex}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 20,
                    }}
                >
                    <Box display="flex">
                        {/* First name and Last name */}
                        <Text color="black" fontWeight="700" fontSize={{ base: "20px", md: "3xl" }} lineHeight="120%" pl="18px">
                            {isMobile
                                ? characters[currentIndex].fName.length > 12
                                    ? characters[currentIndex].fName.substring(0, 12).concat("...")
                                    : characters[currentIndex].fName
                                : characters[currentIndex].fName.length > 15
                                ? characters[currentIndex].fName.substring(0, 15).concat("...")
                                : characters[currentIndex].fName}{" "}
                            {characters[currentIndex].lName.substring(0, 1)}.
                        </Text>

                        {/* Gender & Age */}
                        <Text color="black" fontWeight="400" fontSize={{ base: "20px", md: "3xl" }} lineHeight="120%" pl="18px">
                            <>
                                {characters[currentIndex].details.sex}, {getAge(characters[currentIndex].details.birth)}
                            </>
                        </Text>
                    </Box>
                </motion.div>
            </Box>
            <motion.div
                key={currentIndex}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
            >
                {/* Faculty */}
                <Box color="black" fontWeight="400" fontSize={{ base: "20px", md: "30px" }} lineHeight="120%" h={{ md: "200px" }}>
                    <Text pl="18px" pt="10px">
                        {isMobile
                            ? characters[currentIndex].studentMajor.majorFaculty.facultyName
                            : characters[currentIndex].studentMajor.majorFaculty.facultyName.length > 30
                            ? characters[currentIndex].studentMajor.majorFaculty.facultyName.substring(0, 30).trim().concat("...")
                            : characters[currentIndex].studentMajor.majorFaculty.facultyName}
                    </Text>
                </Box>
            </motion.div>
        </>
    )
}

export default DatingRandomFaculty
