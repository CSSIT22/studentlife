import {
    Box,
    Flex,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tag,
    Text,
    useDisclosure,
} from "@chakra-ui/react"
import { FC } from "react"
import { PollInfo } from "@apiType/dating"
import NoProfileImg from "../dating/pic/noprofile.png"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const DatingYourPollSeeMore: FC<{
    pollInfo: PollInfo;
}> = ({ pollInfo }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    function handlePeople(min: number, max: number) {
        if (max === min && max === 1) {
            return min + " person"
        } else if (max === min && max !== 1) {
            return min + " people"
        } else {
            return min + "-" + max + " people"
        }
    }

    const delHours = (date: Date): Date => {
        const result = new Date(date);
        result.setHours(result.getHours() - 7);
        return result;
    };

    function handlePollTime(dateTime: string) {
        const time = new Date(dateTime)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let ampm = hours >= 12 ? "pm" : "am"
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        let minute = minutes < 10 ? "0" + minutes : minutes
        let strTime = hours + ":" + minute + " " + ampm
        return strTime
    }

    function handlePollDate(dateTime: string) {
        const chooseDate = new Date(dateTime)
        chooseDate.setHours(chooseDate.getHours() - 7);
        const d = chooseDate.toISOString()
        return d.substring(8, 10) + "/" + d.substring(5, 7) + "/" + chooseDate.getFullYear()
    }

    const dateTime = new Date(pollInfo.pollAppointAt)
    const rawDateTime = delHours(dateTime)
    const date = handlePollDate(dateTime.toLocaleString())
    const time = handlePollTime(rawDateTime.toLocaleString())

    return (
        <>
            <Box h="10%" display="flex" justifyContent="end" alignItems="end">
                <motion.div
                    initial={
                        { cursor: "pointer" }
                    }
                    whileHover={{ scale: 1.1, }}
                    whileTap={{
                        scale: 0.9,
                    }}
                >
                    <Text
                        mb="17px"
                        mr="31px"
                        fontWeight="400"
                        fontSize={{ base: "14px", md: "16px" }}
                        lineHeight="150%"
                        textDecorationLine="underline"
                        color="black"
                        cursor="pointer"
                        onClick={onOpen}
                    >
                        Click to see more
                    </Text>
                </motion.div>
            </Box>


            <Modal autoFocus={false} isCentered isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "lg" }} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex alignItems="center">
                            <Link to={"/user/" + pollInfo.pollCreator.userId} >
                                {pollInfo.pollCreator.image ?
                                    <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + pollInfo.pollCreator.userId}
                                        alt={pollInfo.pollCreator.fName + " " + pollInfo.pollCreator.lName}
                                    /> : <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={NoProfileImg}
                                        alt={pollInfo.pollCreator.fName + " " + pollInfo.pollCreator.lName}
                                    />}
                            </Link>

                            <Text fontWeight="700" lineHeight="150%" ml="20px" fontSize="20px" color="black">
                                {pollInfo.pollCreator.fName}
                                &nbsp;
                                {pollInfo.pollCreator.lName}
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Heading color="black" fontWeight="700" fontSize="20px" lineHeight="150%">
                            {pollInfo.pollName}
                        </Heading>
                        {pollInfo.interests.length < 1 ? <Text pb="20px"></Text> :
                            <Box pt="20px" pb="20px">
                                {pollInfo.interests.map(({ interest }) => (
                                    <Tag
                                        backgroundColor="orange.400"
                                        color="white"
                                        mr="1"
                                        mb="1"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                        borderRadius="5px"
                                        h={{ md: "28px" }}
                                    >
                                        <Text mt="5px" mb="5px" ml="15px" mr="15px" fontWeight="400" fontSize={{ base: "12px", md: "16px" }} lineHeight="150%">
                                            {interest.interestName}
                                        </Text>
                                    </Tag>

                                ))}</Box>
                        }
                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%" pb="20px">
                            {pollInfo.pollText.length > 1 ? "Description:" : ""} {pollInfo.pollText}
                        </Text>
                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                            Location: {pollInfo.pollPlace}
                        </Text>

                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                            Date: {date}
                        </Text>
                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                            Time: {time}
                        </Text>
                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%" pb="15px">
                            Number of people: {handlePeople(pollInfo.participantMin, pollInfo.participantMax)}
                        </Text>
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </>
    )
}

export default DatingYourPollSeeMore
