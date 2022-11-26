import { Box, Text, useBreakpointValue } from "@chakra-ui/react"
import { FC } from "react"
import { motion } from "framer-motion"

const DatingRandomOutOfCard: FC<{
    numOfChar: number
}> = ({ numOfChar }) => {

    return (
        numOfChar == 0 ?
            <>
                <Box pt={{ base: "15px", md: "30px" }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20,
                        }}
                    >
                        <Box display="flex">
                            <Text color="black" fontWeight="700" fontSize={{ base: "20px", md: "3xl" }} lineHeight="120%" pl="18px">
                                You ran out of people!
                            </Text>
                        </Box>
                        <Box>
                            <Text pl="18px" pt="10px" fontWeight="700" fontSize={{ base: "20px", md: "2xl" }} lineHeight="120%">
                                Change your option or wait a bit to see more people...
                            </Text>
                        </Box>
                    </motion.div>
                </Box>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                >
                </motion.div>
            </> : <></>
    )
}

export default DatingRandomOutOfCard
