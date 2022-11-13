import { Box, Checkbox, useToast } from "@chakra-ui/react"
import { Dispatch, FC } from "react"

const DatingInterestTag: FC<{
    interestId: string
    interestName: string
    onOpen: () => void
    selectedInterests: String | String[]
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
    function idExists(interestId: string) {
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
                    let descriptionText = "Submit your preference by clicking \"Done\" at the " + buttonLocation
                    toast({
                        title: titleText,
                        status: "success",
                        isClosable: true,
                        position: "top",
                        description: descriptionText,
                    })
                }
                setSelectedInterest(selectedInterests.concat(interest.target.value))
            }
        } else {
            if (numOfSelectedInterest <= 5) {
                setSelectedInterest((selectedInterests as string[]).filter((arr) => arr != interest.target.value))
            }
        }
    }
    // If true, it will return the orange tag
    // Else, it will run the checkNum() function.
    return idExists(interestId) ? (
        <Checkbox
            p="1"
            pr="5"
            pl="2"
            colorScheme="black"
            color="white"
            backgroundColor="gray.400"
            borderRadius="full"
            id={interestId}
            m="1"
            name="interest"
            onChange={handleTag}
            value={interestId}
            iconColor="white"
            defaultChecked
        >
            {interestName}
        </Checkbox>
    ) : // If true, it will return the light gray tags that cannot be checked.
    // Else, it will return the gray tags that is currently unchecked.
    numOfSelectedInterest === 5 ? (
        <Box onClick={onOpen} display="inline">
            <Checkbox
                p="1"
                pr="5"
                pl="2"
                color="gray.100"
                backgroundColor="orange.400"
                borderRadius="full"
                id={interestId}
                m="1"
                name="interest"
                value={interestId}
                readOnly={true}
            >
                {interestName}
            </Checkbox>
        </Box>
    ) : (
        <Checkbox
            p="1"
            pr="5"
            pl="2"
            color="gray.100"
            backgroundColor="orange.400"
            borderRadius="full"
            id={interestId}
            m="1"
            name="interest"
            onChange={handleTag}
            value={interestId}
        >
            {interestName}
        </Checkbox>
    )
}

export default DatingInterestTag
