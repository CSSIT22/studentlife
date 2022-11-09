import { Box, Button } from "@chakra-ui/react"
import { FC } from "react"

const DatingInterestDynamicButton: FC<{ numOfSelectedInterest: number; selectedInterests: String | String[]; tagIsClicked: boolean }> = ({
    numOfSelectedInterest,
    selectedInterests,
    tagIsClicked,
}) => {
    // When you click "Done" button, this function will be triggered.
    function handleSubmit() {
        if (numOfSelectedInterest == 0) {
            alert("No Interested ID is selected")
        } else {
            alert("List of Interest ID: " + selectedInterests)
        }
    }

    // If you have not choose any interest tag, the skip button will show up.
    // Else, the done button will show up.
    return (
        <Button colorScheme="orange" size="lg" borderRadius="full" float="right" onClick={handleSubmit}>
            {tagIsClicked || numOfSelectedInterest != 0 ? <Box w="50px">Done</Box> : <Box w="50px">Skip</Box>}
        </Button>
    )
}

export default DatingInterestDynamicButton
