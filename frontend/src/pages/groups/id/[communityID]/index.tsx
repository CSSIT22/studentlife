import { Flex, Heading, Button, Box, Text, useBoolean, useToast, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import NavCommunity from "src/components/group/NavCommunity"
import AppBody from "src/components/share/app/AppBody"
import { BrowserRouter, BrowserRouter as Router, useParams, Link } from "react-router-dom"
import { userData } from "../../data"
import API from "src/function/API"

const headCommunity = () => {
    let { communityID }: any = useParams()

    // DATA
    const [community, setCommunity] = useState<any>()
    const [tag, setTag] = useState<any>()
    const [isMember, setIsMember] = useState<any>()
    const [isOwner, setIsOwner] = useState<any>()

    // Set On / Close
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Get DATA
    useEffect(() => {
        API.get("/group/getCommunityId/" + communityID)
            .then((res) => {
                setCommunity(res.data.communityById)
                setTag(res.data.tag)
                setIsMember(res.data.isMember)
                setIsOwner(res.data.isOwner)
                console.log(res.data)
            })
            .catch((err) => on())
            .finally(() => off())
    }, [])


    return (
        <AppBody>
            <NavCommunity
                communityName={community?.communityName}
                communityId={communityID}
                communityCoverPhoto={community?.communityCoverPhoto}
                communityPrivacy={community?.communityPrivacy}
                communityDesc={community?.communityDesc}
                isMember={isMember}
                isOwner={isOwner}
                communityMembers={10}
                activeBtn={1}
                tags={tag}
            />
            <Text></Text>
        </AppBody>
    )
}

export default headCommunity