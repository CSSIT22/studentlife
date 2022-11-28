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
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    useEffect(() => {
        API.get("/group/getCommunityId/" + communityID)
            .then((res) => setCommunity(res.data))
            .catch((err) => on())
            .finally(() => off())
    }, [])

    return (
        <AppBody>
            <NavCommunity
                communityName={community?.communityName}
                isPrivate={community?.communityPrivacy}
                isMember={true}
                description={community?.communityDesc}
                coverPhoto="https://picsum.photos/id/400/800"
                members={10}
                communityID={communityID}
                tags={userData.Tag}
                activeBtn={1}
            />
            <Text>{communityID}</Text>
        </AppBody>
    )
}

export default headCommunity