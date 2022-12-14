import { AllInterests, UserInterests } from "@apiType/dating"
import { Box, Button, useToast } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"

const DatingInterestDynamicButton: FC<{
    numOfSelectedInterest: number
    selectedInterests: number[]
    tagIsClicked: boolean
    hasSelectedInterest: boolean
    type: string
    isLoading: boolean
    setInterests: Dispatch<SetStateAction<AllInterests[]>>
    setIsSubmiited: React.Dispatch<React.SetStateAction<boolean>>
    hasCompleteSetting: boolean
    on: () => void
}> = ({
    numOfSelectedInterest,
    selectedInterests,
    tagIsClicked,
    hasSelectedInterest,
    type,
    isLoading,
    setInterests,
    setIsSubmiited,
    hasCompleteSetting,
    on
}) => {
        const navigate = useNavigate()
        const toast = useToast()
        // When you click "Done" button, this function will be triggered.

        function handleClick() {
            if (type == "interest") {
                setInterests([])
                setIsSubmiited(true)
                handleSubmit()
            }
        }
        function handleSubmit() {
            if (hasSelectedInterest || hasCompleteSetting) {
                window.scrollTo(0, 0)
                if (selectedInterests.length != 0) {
                    API.put<UserInterests>("/dating/interests/updateUserInterests", { interestId: selectedInterests })
                        .then(() => navigate("/dating/"))
                        .catch((err) => on())
                } else {
                    window.scrollTo(0, 0)
                    API.delete<UserInterests>("/dating/interests/deleteUserInterests")
                        .then(() => navigate("/dating/"))
                        .catch((err) => on())
                }
            } else {
                window.scrollTo(0, 0)
                API.post<UserInterests>("/dating/interests/setUserInterests", { interestId: selectedInterests })
                    .then(() => navigate("/dating/"))
                    .catch((err) => on())
            }
        }

        // If you have not choose any interest tag, the skip button will show up.
        // Else, the done button will show up.
        return !isLoading ? (
            <Button
                colorScheme="orange"
                width={{ base: "79px", md: "200px" }}
                height={{ base: "33px", md: "70px" }}
                borderRadius="5px"
                float="right"
                onClick={() => handleClick()}
            >
                {(tagIsClicked || numOfSelectedInterest != 0 || hasCompleteSetting) ? (
                    <Box fontWeight="700" fontSize={{ base: "14px", md: "22px" }} line-height="120%">
                        Done
                    </Box>
                ) : (
                    <Box fontWeight="700" fontSize={{ base: "14px", md: "22px" }} line-height="120%">
                        Skip
                    </Box>
                )}
            </Button>
        ) : (
            <Box
                backgroundColor="orange.800"
                width={{ base: "79px", md: "200px" }}
                height={{ base: "33px", md: "70px" }}
                borderRadius="5px"
                float="right"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
                fontSize={{ base: "14px", md: "22px" }}
                line-height="120%"
                color="white"
            >
                Loading...
            </Box>
        )
    }

export default DatingInterestDynamicButton
