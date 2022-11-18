import { Box, Text, useBreakpointValue } from "@chakra-ui/react"
import { FC } from "react"
import { motion } from "framer-motion"

const DatingRandomFaculty: FC<{
    characters: {
        UserId: string
        Fname: string
        Lname: string
        Gender: string
        Age: string
        Faculty: string
        url: string
        interestId: number[]
    }[]
    currentIndex: number
}> = ({ characters, currentIndex }) => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
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
                        <Text color="black" fontWeight="700" fontSize={{ base: "20px", md: "48px" }} lineHeight="120%" pl="18px">
                            {isMobile
                                ? characters[currentIndex].Fname.length > 8
                                    ? characters[currentIndex].Fname.substring(0, 8).concat("...")
                                    : characters[currentIndex].Fname
                                : characters[currentIndex].Fname.length > 15
                                ? characters[currentIndex].Fname.substring(0, 15).concat("...")
                                : characters[currentIndex].Fname}{" "}
                            {characters[currentIndex].Lname.substring(0, 1)}.
                        </Text>

                        {/* Gender & Age */}
                        <Text
                            color="black"
                            fontWeight={{ base: "400", md: "700" }}
                            fontSize={{ base: "20px", md: "48px" }}
                            lineHeight="120%"
                            pl="18px"
                        >
                            {characters[currentIndex].Gender}, {characters[currentIndex].Age}
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
                            ? characters[currentIndex].Faculty
                            : characters[currentIndex].Faculty.length > 30
                            ? characters[currentIndex].Faculty.substring(0, 30).trim().concat("...")
                            : characters[currentIndex].Faculty}
                    </Text>
                </Box>
            </motion.div>
        </>
    )
}

export default DatingRandomFaculty
