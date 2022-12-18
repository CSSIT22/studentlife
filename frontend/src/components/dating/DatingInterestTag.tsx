import { Box, Checkbox, Text, useToast } from "@chakra-ui/react"
import { Dispatch, FC } from "react"
import { motion } from "framer-motion"

const DatingInterestTag: FC<{
    interestId: number
    interestName: string
    onOpen: () => void
    selectedInterests: Number[]
    numOfSelectedInterest: number
    setSelectedInterest: Dispatch<any>
    tagIsClicked: boolean
    setTagIsClicked: React.Dispatch<React.SetStateAction<boolean>>
    type: string
    buttonLocation: string
}> = ({
    interestId,
    interestName,
    onOpen,
    selectedInterests,
    numOfSelectedInterest,
    setSelectedInterest,
    tagIsClicked,
    setTagIsClicked,
    type,
    buttonLocation,
}) => {
        const toast = useToast()
        // Check if interestId is in the selectedInterest state or not
        function idExists(interestId: number) {
            for (let i = 0; i < selectedInterests.length; i++) {
                if (selectedInterests[i] == interestId) {
                    return true
                }
            }
            return false
        }
        // Update numOfInterest and selectedInterests when you select/deselect the tags of interest
        function handleTag(interest: React.ChangeEvent<HTMLInputElement>) {
            if (!tagIsClicked) {
                setTagIsClicked(true)
            }
            if (interest.target.checked) {
                if (numOfSelectedInterest < 5) {
                    if (numOfSelectedInterest == 4) {
                        let titleText = "You have selected 5 " + type + "."
                        let descriptionText = 'Submit your preference by clicking "Done" at the ' + buttonLocation
                        toast({
                            title: titleText,
                            status: "info",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                            description: descriptionText,
                        })
                    }
                    setSelectedInterest(selectedInterests.concat(parseInt(interest.target.value)))
                }
            } else {
                if (numOfSelectedInterest <= 5) {
                    setSelectedInterest((selectedInterests as number[]).filter((arr) => arr != parseInt(interest.target.value)))
                }
            }
        }
        // If true, it will return the orange tag
        // Else, it will run the checkNum() function.
        return idExists(interestId) ? (
            <motion.div
                initial={
                    { cursor: "pointer" }
                }
                style={{display: "inline-block"}}
                whileHover={{ scale: 1.1, }}
                whileTap={{
                    scale: 0.9,
                }}>
            <Checkbox
                p="1"
                pr="5"
                pl="2"
                h="36.4px"
                mr="11px"
                mb="23px"
                colorScheme="orange"
                color="white"
                backgroundColor="orange.500"
                borderRadius="full"
                id={interestId.toString()}
                name="interest"
                onChange={handleTag}
                value={interestId}
                iconColor="white"
                defaultChecked
            >
                <Text fontWeight="400" fontSize="16px" lineHeight="150%" mr="14px">
                    {interestName}
                </Text>
            </Checkbox>
            </motion.div>
        ) : // If true, it will return the light gray tags that cannot be checked.
            // Else, it will return the gray tags that is currently unchecked.
            numOfSelectedInterest === 5 ? (
                <Box onClick={onOpen} display="inline" mr="11px">
                                <motion.div
                initial={
                    { cursor: "pointer" }
                }
                style={{display: "inline-block"}}
                whileHover={{ scale: 1.1, }}
                whileTap={{
                    scale: 0.9,
                }}>
                    <Checkbox
                        p="1"
                        pr="5"
                        pl="2"
                        color="black"
                        h="36.4px"
                        mb="23px"
                        backgroundColor="gray.200"
                        borderRadius="full"
                        id={interestId.toString()}
                        name="interest"
                        value={interestId}
                        readOnly={true}
                    >
                        <Text fontWeight="400" fontSize="16px" lineHeight="150%" mr="14px">
                            {interestName}
                        </Text>
                    </Checkbox>
                    </motion.div>
                </Box>
            ) : (
                <motion.div
                initial={
                    { cursor: "pointer" }
                }
                style={{display: "inline-block"}}
                whileHover={{ scale: 1.1, }}
                whileTap={{
                    scale: 0.9,
                }}>
                <Checkbox
                    p="1"
                    pr="5"
                    pl="2"
                    color="black"
                    h="36.4px"
                    backgroundColor="gray.200"
                    borderRadius="full"
                    id={interestId.toString()}
                    mr="11px"
                    mb="23px"
                    name="interest"
                    onChange={handleTag}
                    value={interestId}
                >
                    <Text fontWeight="400" fontSize="16px" lineHeight="150%" mr="14px">
                        {interestName}
                    </Text>
                </Checkbox>
                </motion.div>
            )
    }

export default DatingInterestTag
