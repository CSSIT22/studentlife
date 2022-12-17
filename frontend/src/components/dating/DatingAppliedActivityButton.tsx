import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const DatingAppliedActivityButton: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {

    function handleClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Link to="/dating/poll/appliedpoll" style={{ textDecoration: "none" }} onClick={handleClick}>
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
                    w={{ base: "100px", sm: "130px", md: "200px", lg: "300px", xl: "290px" }}
                    h={{ base: "78px", md: "74px", xl: "74px", lg: "74px" }}
                    backgroundColor={backgroundColor}
                    borderRadius="5px"
                    justifyContent="center"
                    alignItems="center"
                    boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                >
                    <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                        Applied activity polls
                    </Text>
                </Box>
            </motion.div>
        </Link>
    )
}

export default DatingAppliedActivityButton
