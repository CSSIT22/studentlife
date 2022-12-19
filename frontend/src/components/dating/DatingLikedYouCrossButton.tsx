import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { AiOutlineStop } from "react-icons/ai"
import { motion } from "framer-motion"

const DatingLikedYouCrossButton: FC<{ isMobile: boolean | undefined; handleClick: (type: string, UserId: string) => void; UserId: string }> = ({
    isMobile,
    handleClick,
    UserId,
}) => {

    return (
        <Box w={{ base: "40px", md: "60px" }} h={{ base: "40px", md: "60px" }} cursor="pointer" onClick={() => handleClick("skip", UserId)}>
            {isMobile ? <motion.div
                whileHover={{ scale: 1.2, }}
                whileTap={{
                    scale: 0.8,
                }}><AiOutlineStop size="60px" color="black" /></motion.div> : <motion.div
                    whileHover={{ scale: 1.2, }}
                    whileTap={{
                        scale: 0.8,
                    }}><AiOutlineStop size="40px" color="black" /></motion.div>}
        </Box>
    )
}

export default DatingLikedYouCrossButton
