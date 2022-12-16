import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const DatingYouLikedButton: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
    return (
        <motion.div
        initial={
            { cursor: "pointer" }
        }
        whileHover={{ scale: 1.1, }}
        whileTap={{
            scale: 0.9,
        }}>
        <Link to="/dating/youliked" style={{ textDecoration: "none" }}>
            <Box
                display="flex"
                cursor="pointer"
                w={{ base: "160px", md: "336px" }}
                h={{ base: "57px", md: "74px" }}
                backgroundColor={backgroundColor}
                borderRadius="5px"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
            >
                <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                    People that you liked
                </Text>
            </Box>
        </Link>
        </motion.div>
    )
}

export default DatingYouLikedButton
