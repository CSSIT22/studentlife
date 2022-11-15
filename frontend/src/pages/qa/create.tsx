import { DEFAULT_TAGS } from "src/components/qa/shared/defaultTags"
import { CheckboxGroup, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import QAnsAppBody from "../../components/qa/QAnsAppBody"
import QAnsTag from "../../components/qa/QAnsTag"
import QAnsPost from "../../components/qa/QAnsPost"


interface state {
    allTags: {
        tagId: string
        tagName: string
    }[]
}

const TagQA = () => {
    // Used for DatingInterestModal & DatingInterestTag components to trigger the modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.
    let TState = { allTags: DEFAULT_TAGS }
    const [searchQuery, setSearchQuery] = useState("")
    const [numOfTag, setNumOfTag] = useState(0)
    const [selectedTags, setSelectedTag] = useState<String[] | String>([])

    return (
        <QAnsAppBody>
            <QAnsPost>
                <CheckboxGroup colorScheme="white">
                    {TState.allTags.map(({ tagId, tagName }) => (
                        // DatingInterestTag component: Used for generating interactive tag
                        <QAnsTag
                            key={tagId}
                            tagId={tagId}
                            tagName={tagName}
                            onOpen={onOpen}
                            selectedTags={selectedTags}
                            numOfTag={numOfTag}
                            setNumOfTag={setNumOfTag}
                            setSelectedTag={setSelectedTag}
                        />
                    ))}
                </CheckboxGroup>
            </QAnsPost>

        </QAnsAppBody>
    )
}

export default TagQA
