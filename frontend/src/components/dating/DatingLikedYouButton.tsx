import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const DatingLikedYouButton: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {

    function handleClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Link to="/dating/likedyou" style={{ textDecoration: "none" }} onClick={handleClick}>
            <motion.div
                initial={
                    { cursor: "pointer", scale: 0 }
                }
                whileHover={{ scale: 1.1, }}
                whileTap={{
                    scale: 0.9,
                }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 360,
                    damping: 20,
                }}>
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
                        People that liked you
                    </Text>
                </Box>
            </motion.div>
        </Link>

    )
}

export default DatingLikedYouButton
