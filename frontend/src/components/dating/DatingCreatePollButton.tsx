import { Button, Center, useBreakpointValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { BsPencil } from "react-icons/bs"
import { motion } from "framer-motion"

const DatingCreatePollButton = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    return (
        <Link to="/dating/poll/create" style={{ textDecoration: "none" }}>
            <motion.div
                initial={
                    { cursor: "pointer", scale: 0 }
                }
                whileHover={{ scale: 1.2, }}
                whileTap={{
                    scale: 0.8,
                }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 360,
                    damping: 20,
                }}>
                <Button borderRadius="full" w={{ base: "50px", md: "75px" }} h={{ base: "50px", md: "75px" }} colorScheme="orange" boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                    <Center>
                        {isMobile ? <BsPencil size="40px" color="white" /> : <BsPencil size="20px" color="white" />}
                    </Center>
                </Button>
            </motion.div>
        </Link>
    )
}

export default DatingCreatePollButton
