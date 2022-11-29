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
    Text,
    useDisclosure,
} from "@chakra-ui/react"
import { FC } from "react"

const DatingYourPollSeeMore: FC<{
    pollInfo:
        | {
              pollId: string
              pollName: string
              pollPlace: string
              pollAppointAt: string
              pollText: string
              participantMin: number
              participantMax: number
              isOpen: boolean
              pollcreated: string
              pollInterest: {
                  id: number
              }[]
              creator: {
                  UserId: string
                  Fname: string
                  Lname: string
                  url: string
              }
          }
        | any
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

    return (
        <>
            <Box h="10%" display="flex" justifyContent="end" alignItems="end">
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
            </Box>

            <Modal isCentered isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "lg" }} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex alignItems="center">
                            <Image
                                borderRadius="full"
                                boxSize="78px"
                                objectFit="cover"
                                src={pollInfo.creator.url}
                                alt={pollInfo.creator.Fname + " " + pollInfo.creator.Lname}
                            />
                            <Text fontWeight="700" lineHeight="150%" ml="20px" fontSize="20px" color="black">
                                {pollInfo.creator.Fname}
                                &nbsp;
                                {pollInfo.creator.Lname}
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Heading color="black" fontWeight="700" fontSize="20px" lineHeight="150%" pb="20px">
                            {pollInfo.pollName}
                        </Heading>
                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%" pb="20px">
                            {pollInfo.pollText.length > 1 ? "Description:" : ""} {pollInfo.pollText}
                        </Text>
                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                            Location: {pollInfo.pollPlace}
                        </Text>

                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                            Date: {globalThis.date}
                        </Text>
                        <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                            Time: {globalThis.time}
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
