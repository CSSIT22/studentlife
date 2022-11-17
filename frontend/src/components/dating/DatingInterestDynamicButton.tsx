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
            console.log("No Interested ID is selected")
        } else {
            console.log("List of Interest ID: " + selectedInterests)
        }
    }

    // If you have not choose any interest tag, the skip button will show up.
    // Else, the done button will show up.
    return (
        <Button
            colorScheme="orange"
            width={{ base: "79px", md: "200px" }}
            height={{ base: "33px", md: "70px" }}
            borderRadius="5px"
            float="right"
            onClick={handleSubmit}
        >
            {tagIsClicked || numOfSelectedInterest != 0 ? (
                <Box font-weight="700" font-size="14px" line-height="120%">
                    Done
                </Box>
            ) : (
                <Box font-weight="700" font-size="14px" line-height="120%">
                    Skip
                </Box>
            )}
        </Button>
    )
}

export default DatingInterestDynamicButton
