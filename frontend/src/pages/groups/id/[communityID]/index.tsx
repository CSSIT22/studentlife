import { Flex, Heading, Button, Box, Text, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import NavCommunity from "src/components/group/NavCommunity"
import AppBody from "src/components/share/app/AppBody"
import { BrowserRouter, BrowserRouter as Router, useParams, Link } from "react-router-dom"
import { userData } from "../../data"
import API from "src/function/API"

const headCommunity = () => {
    let { communityID }: any = useParams()
    const [community, setCommunity] = useState<any>()
    const [tag, setTag] = useState<any>()
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    useEffect(() => {
        API.get("/group/getCommunityId/" + communityID)
            .then((res) => {
                setCommunity(res.data.communityById)
                setTag(res.data.tag)
                console.log(res.data.tag)
            })
            .catch((err) => on())
            .finally(() => off())
    }, [])

    return (
        <AppBody>
            <NavCommunity
                communityName={community?.communityName}
                communityId={community?.communityId}
                communityCoverPhoto={community?.communityCoverPhoto}
                // communityPrivacy={community?.communityPrivacy}
                // communityCoverPhoto={community?.communityCoverPhoto}
                communityDesc={community?.communityDesc}
                isMember={true}
                communityMembers={10}
                activeBtn={1}
                tags={tag}
            // tags={community?.tag}

            // communityId={communityID}
            // isMember={true}
            // communityMembers={10}
            // activeBtn={1}
            // communityCoverPhoto={community?.communityCoverPhoto}
            />
            <Text>{community?.communityId}</Text>
        </AppBody>
    )
}

export default headCommunity