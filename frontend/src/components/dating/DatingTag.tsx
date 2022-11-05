import { Checkbox } from "@chakra-ui/react"
import { FC } from "react"

function checkId(interestId: string) {
    var id = document.getElementById(interestId) as HTMLInputElement
    if (id != null) {
        if (id.checked) {
            return true
        } else {
            return false
        }
    }
    return false
}

const DatingTag: FC<{ bool: boolean, interestId: string; interestName: string; handleTag: (e: any) => void }> = ({ bool, interestId, interestName, handleTag }) => {
    return checkId(interestId) ? (
        <Checkbox
            borderWidth="2px"
            p="1"
            pr="5"
            pl="2"
            borderColor="orange"
            color="orange.800"
            borderRadius="full"
            id={interestId}
            m="1"
            name="interest"
            onChange={handleTag}
            value={interestId}
            
        >
            {interestName}
        </Checkbox>
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
            isDisabled={bool}
        >
            {interestName}
        </Checkbox>
    )
}

export default DatingTag
