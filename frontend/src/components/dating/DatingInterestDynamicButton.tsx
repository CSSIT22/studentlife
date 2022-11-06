import { Button } from "@chakra-ui/react"
import { FC } from "react"

const DatingInterestDynamicButton: FC<{ numOfInterest: number; selectedInterests: String | String[] }> = ({ numOfInterest, selectedInterests }) => {
    function handleSubmit() {
        alert("List of Interest ID: " + selectedInterests)
    }

    return numOfInterest == 0 ? (
        <Button colorScheme="orange" size="lg" borderRadius="full" float="right">
            Skip
        </Button>
    ) : (
        <Button colorScheme="orange" size="lg" borderRadius="full" float="right" onClick={handleSubmit}>
            Done
        </Button>
    )
}

export default DatingInterestDynamicButton
