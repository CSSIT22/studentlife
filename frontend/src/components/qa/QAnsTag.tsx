import { Box, Checkbox } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"

const QAnsTag: FC<{
    tagId: string
    tagName: string
    onOpen: () => void
    selectedTags: String | String[]
    numOfTag: number
    setNumOfTag: Dispatch<SetStateAction<number>>
    setSelectedTag: Dispatch<any>
}> = ({ tagId, tagName, onOpen, selectedTags, numOfTag, setNumOfTag, setSelectedTag }) => {
    function idExists(tagId: string) {
        for (let i = 0; i < selectedTags.length; i++) {
            if (selectedTags[i] == tagId) {
                return true
            }
        }
        return false
    }
    // Check if numOfTag state is equal to 5 or not
    function checkNum() {
        if (numOfTag === 5) {
            return true
        }
        return false
    }
    // Update numOfTag and selectedIags when you select/deselect the Q&A tags
    function handleTag(tag: React.ChangeEvent<HTMLInputElement>) {
        if (tag.target.checked) {
            setNumOfTag(numOfTag + 1)
            if (numOfTag < 5) {
                setSelectedTag(selectedTags.concat(tag.target.value))
            }
        } else {
            setNumOfTag(numOfTag - 1)
            if (numOfTag <= 5) {
                setSelectedTag((selectedTags as string[]).filter((arr) => arr != tag.target.value))
            }
        }
    }
    // If true, it will return the orange tag
    // Else, it will run the checkNum() function.
    return idExists(tagId) ? (
        <Checkbox
            borderWidth="2px"
            p="1"
            pr="5"
            pl="2"
            borderColor="orange.500"
            color="orange.800"
            borderRadius="full"
            id={tagId}
            m="1"
            name="interest"
            onChange={handleTag}
            value={tagId}
            iconColor="orange.500"
        >
            {tagName}
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
                id={tagId}
                m="1"
                name="tag"
                value={tagId}
                readOnly={true}
            >
                {tagName}
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
            id={tagId}
            m="1"
            name="interest"
            onChange={handleTag}
            value={tagId}
        >
            {tagName}
        </Checkbox>
    )
}

export default QAnsTag
