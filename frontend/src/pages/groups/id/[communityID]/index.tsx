import { useBoolean, } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import DiscussionPage from 'src/components/group/communityPage/DiscussionPage'
import NavCommunity from 'src/components/group/communityPage/NavCommunity'
import AppBody from 'src/components/share/app/AppBody'
import API from 'src/function/API'

const index = () => {
    let { communityID }: any = useParams()

    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [data, setData] = useState<any>()

    const fetchCommunity = async () => {
        try {
            const communityResult = (await API.get("/group/getCommunityId/" + communityID)).data
            setData(communityResult)
            console.log(communityResult)
        } catch (err) {
            on()
        } finally {
            off()
        }
    }
    useEffect(() => {
        fetchCommunity()
    }, [])
    return (
        <AppBody >
            <NavCommunity
                data={data}
                isLoading={isLoading}
                isError={isError}
                fetchCommunity={fetchCommunity}
                activeTab={0}
            />

            {
                //Check if user is member of community or community is public to show discussion page
                data?.user.access || !data?.community.privacy && !isLoading && !isError && !data?.user.isBlacklisted ?
                    <DiscussionPage /> : null
            }
        </AppBody >
    )
}

export default index