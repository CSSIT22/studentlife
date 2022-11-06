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
    function idExists(interestId: string) {
        for (var i = 0; i < selectedInterests.length; i++) {
            if (selectedInterests[i] == interestId) {
                return true
            }
        }
        return false
    }

    function checkNum() {
        if (numOfInterest === 5) {
            return true
        }
        return false
    }

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
    ) : checkNum() == true ? (
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
