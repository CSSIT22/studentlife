import { SuggestionsCommunity } from "@apiType/group"
import { Box, Grid } from "@chakra-ui/react"
import { useState } from "react"
import SuggestionsList from "src/components/group/SuggestionsList"
import AppBody from "src/components/share/app/AppBody"

const searchCommunity = () => {

    const [community, setCommunity] = useState<any>()

    const renderSuggestCommunity = () => {
        return (
            community?.communityList.suggestions.map((community: SuggestionsCommunity) => {
                return (
                    <SuggestionsList
                        key={community.communityId}
                        communityName={community.communityName}
                        communityCoverPhoto={community.communityCoverPhoto}
                        communityMember={community.communityMember}
                        communityPrivacy={community.communityPrivacy}
                    />
                )
            }))
    }
    return (
        <AppBody>
            <Box
                mb={'4'}
                bg='white'
                width={'100%'}
                height={'500px'}
                borderRadius={'md'}
                boxShadow='md'
            >

            </Box>
        </AppBody >
    )
}

export default searchCommunity