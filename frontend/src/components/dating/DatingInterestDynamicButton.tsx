import { UserInterests } from "@apiType/dating"
import { Box, Button, useBoolean, useToast } from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"

const DatingInterestDynamicButton: FC<{ numOfSelectedInterest: number; selectedInterests: number[]; tagIsClicked: boolean; hasSelectedInterest: boolean; type: string }> = ({
    numOfSelectedInterest,
    selectedInterests,
    tagIsClicked,
    hasSelectedInterest,
    type
}) => {
    const navigate = useNavigate()
    const toast = useToast()
    // When you click "Done" button, this function will be triggered.
    function handleSubmit() {
        if (type == "interest") {
            if (hasSelectedInterest) {
                if (selectedInterests.length != 0) {
                    API.put<UserInterests>("/dating/interests/updateUserInterests", { interestId: selectedInterests })
                        .then(() => navigate("/dating/"))
                        .catch((err) => toast({ status: "error", position: "top", title: "Error", description: "Please login before submitting!" }))
                }
            
            else {
                API.delete<UserInterests>("/dating/interests/deleteUserInterests")
                    .then(() => navigate("/dating/"))
                    .catch((err) => toast({ status: "error", position: "top", title: "Error", description: "Please login before submitting!" }))
            }
        }
        else {
            if (selectedInterests.length != 0) {
                API.post<UserInterests>("/dating/interests/setUserInterests", { interestId: selectedInterests })
                    .then(() => navigate("/dating/"))
                    .catch((err) => toast({ status: "error", position: "top", title: "Error", description: "Please login before submitting!" }))
            }
            else {
                navigate("/dating/")
            }
        }
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
                <Box font-weight="700" fontSize={{ base: "14px", md: "22px" }} line-height="120%">
                    Done
                </Box>
            ) : (
                <Box font-weight="700" fontSize={{ base: "14px", md: "22px" }} line-height="120%">
                    Skip
                </Box>
            )}
        </Button>
    )
}

export default DatingInterestDynamicButton
