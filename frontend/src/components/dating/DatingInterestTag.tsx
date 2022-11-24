import { Box, Checkbox } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"

const DatingInterestTag: FC<{
    interestId: string
    interestName: string
    onOpen: () => void
    selectedInterests: String | String[]
    numOfInterest: number
    setNumOfInterest: Dispatch<SetStateAction<number>>
    setSelectedInterest: Dispatch<any>
}> = ({ interestId, interestName, onOpen, selectedInterests, numOfInterest, setNumOfInterest, setSelectedInterest }) => {
    // Check if interestId is in the selectedInterest state or not
    function idExists(interestId: string) {
        for (let i = 0; i < selectedInterests.length; i++) {
            if (selectedInterests[i] == interestId) {
                return true
            }
        }
        return false
    }
    // Check if numOfInterest state is equal to 5 or not
    function checkNum() {
        if (numOfInterest === 5) {
            return true
        }
        return false
    }
    // Update numOfInterest and selectedInterests when you select/deselect the tags of interest
    function handleTag(interest: React.ChangeEvent<HTMLInputElement>) {
        if (interest.target.checked) {
            setNumOfInterest(numOfInterest + 1)
            if (numOfInterest < 5) {
                setSelectedInterest(selectedInterests.concat(interest.target.value))
            }
        } else {
            setNumOfInterest(numOfInterest - 1)
            if (numOfInterest <= 5) {
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
    checkNum() == true ? (
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
