import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Checkbox, useToast } from "@chakra-ui/react"
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
}> = ({ interestId, interestName, onOpen, selectedInterests, numOfSelectedInterest, setSelectedInterest, tagIsClicked, setTagIsClicked }) => {
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
                    toast({ title: "You have selected 5 interests.", status: "success", isClosable: true, position: "top", description: "Submit your preference by clicking \"Done\" at the top right" })
                }
                setSelectedInterest(selectedInterests.concat(interest.target.value))
            }
        } else {
            if (numOfSelectedInterest <= 5) {
                setSelectedInterest((selectedInterests as string[]).filter((arr) => arr != interest.target.value))
            }
        }
        if (numOfSelectedInterest == 4) {
            ;<Alert status="success">
                <AlertIcon />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                    You have successfully selected 5 interests
                </AlertTitle>
                <AlertDescription maxWidth="sm">Click "Done" button on the top right corner to submit</AlertDescription>
            </Alert>
        }
    }
    // If true, it will return the orange tag
    // Else, it will run the checkNum() function.
    return idExists(interestId) ? (
        <Checkbox
            p="1"
            pr="5"
            pl="2"
            color="white"
            backgroundColor="gray.400"
            borderRadius="full"
            id={interestId}
            m="1"
            name="interest"
            onChange={handleTag}
            value={interestId}
            iconColor="white"
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
