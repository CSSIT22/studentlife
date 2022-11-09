import { Box, Checkbox } from "@chakra-ui/react"
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
            borderWidth="2px"
            p="1"
            pr="5"
            pl="2"
            borderColor="orange.500"
            color="orange.800"
            borderRadius="full"
            id={interestId}
            m="1"
            name="interest"
            onChange={handleTag}
            value={interestId}
            iconColor="orange.500"
        >
            {interestName}
        </Checkbox>
    ) : // If true, it will return the light gray tags that cannot be checked.
    // Else, it will return the gray tags that is currently unchecked.
    numOfSelectedInterest === 5 ? (
        <Box onClick={onOpen} display="inline">
            <Checkbox
                borderWidth="2px"
                p="1"
                pr="5"
                pl="2"
                borderColor="gray.300"
                color="gray.500"
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
            borderWidth="2px"
            p="1"
            pr="5"
            pl="2"
            borderColor="gray"
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
