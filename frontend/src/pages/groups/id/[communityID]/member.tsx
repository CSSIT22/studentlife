import { useBoolean, } from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import API from "src/function/API"
import NavCommunity from "src/components/group/communityPage/NavCommunity"
import MemberPage from "src/components/group/communityPage/MemberPage"
const Member = () => {
    let { communityID }: any = useParams()

    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [data, setData] = useState<any>()

    const fetchCommunity = async () => {
        let communityResult = undefined
        try {
            communityResult = (await API.get("/group/getCommunityId/" + communityID)).data
            setData(communityResult)
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
                activeTab={1}
            />
            {
                //Check if user is member of community or community is public to show member page
                data?.user.access || !data?.community.privacy && !isLoading && !isError && !data?.user.isBlacklisted ?
                    <MemberPage checkRole={data?.user.role} checkId={data?.user.id} />
                    : null
            }
        </AppBody >
    )
}

export default Member