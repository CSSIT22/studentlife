import { Box, Checkbox, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import DatingInterestModal from "./DatingInterestModal";

const DatingTag: FC<{ bool: boolean; interestId: string; interestName: string; handleTag: (e: any) => void, checkId: (interestId: string) => boolean, onOpen: () => void}> = ({
    bool,
    interestId,
    interestName,
    handleTag,
    checkId,
    onOpen
}) => {

    return checkId(interestId) ? (
    
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
    ) : bool == true ? (
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
        >{interestName}</Checkbox>
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

export default DatingTag
