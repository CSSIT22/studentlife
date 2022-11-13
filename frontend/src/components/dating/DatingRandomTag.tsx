import { Tag, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC } from "react"

const DatingRandomTag: FC<{
    id: number
    interests: {
        interestId: string
        interestName: string
    }[]
}> = ({ id, interests }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ display: "inline-block" }}
            whileTap={{ scale: 1.2 }}
            key={id}
            transition={{
                type: "spring",
                stiffness: 360,
                damping: 20,
            }}
        >
            <Tag
                backgroundColor="orange.600"
                color="white"
                mr="0.5"
                mb="2px"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
            >
                <Text mt="5px" mb="5px" ml="12px" mr="12px" fontWeight="400" fontSize="12px" lineHeight="150%">
                    {interests.find((interest) => interest.interestId === id.toString())?.interestName}
                </Text>
            </Tag>
        </motion.div>
    )
}

export default DatingRandomTag
