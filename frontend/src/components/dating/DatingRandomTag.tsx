import { Tag, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC } from "react"
import { AllInterests } from "@apiType/dating"

const DatingRandomTag: FC<{
    id: {
        interestId: number;
    }
    index: number
    allInterests: AllInterests[]
}> = ({ id, index, allInterests }) => {

    let interestName = allInterests.find((interest) => interest.interestId === id.interestId)?.interestName

    return (
        interestName ? 
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ display: "inline-block" }}
            whileTap={{ scale: 1.2 }}
            key={index}
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
                    {interestName}
                </Text>
            </Tag>
        </motion.div> : <></>
    )
}

export default DatingRandomTag
