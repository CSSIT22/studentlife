import { Box, Flex, Grid, GridItem, Heading, useBoolean } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import FavoriteContent from "src/components/restaurant/FavoriteContent"
import API from "src/function/API"
import Historycontent from "../../components/restaurant/historycontent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { Restaurant2 } from "@apiType/restaurant"
import Lottie from 'lottie-react'
import loading1 from './animation/loading1.json'
import notloading2 from './animation/notloading2.json'
const history = () => {
    const [property, setproperty] = React.useState<Restaurant2[]>([])
    const params = useParams()
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    
    useEffect(() => {
        API.get("/restaurant/history/").then((item) => setproperty(item.data))
            .catch((err) => on())
            .finally(off)
    }, [])

    // useEffect(() => {
    //     console.log(property);

    // }, [property])

    if (isLoading)
        return (
            <AppBody
                secondarynav={[
                    { name: "Like or Nope", to: "/restaurant" },
                    { name: "My Favorite", to: "/restaurant/favorite" },
                    { name: "My History", to: "/restaurant/history" },
                ]}
            >
                <Box w={"100%"} h={"100%"}>
                    <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100%"}>
                        <Lottie animationData={loading1} style={{ scale: 1 }} />
                    </Flex>
                </Box>
            </AppBody>
        )

    if (isError) return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Box width="100%" height="100%">
                <Flex justifyContent={"center"} alignItems={"center"} width="100%" height="100%" mt={"8rem"}>
                    <Lottie animationData={notloading2} style={{ scale: 1 }} />
                </Flex>
            </Box>
        </AppBody>
    )

    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar />

            <Heading mt={"20px"} textAlign="center">
                History
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {property.map((e1: any) => {
                    const dateString = e1.updatedAt;
                    const date = new Date(dateString);
                    console.log(e1.upatedAt);
                    return (
                        <GridItem>
                            <Historycontent resName={e1.restaurant.resName} date={date.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })} status={e1.isLike} img={e1.restaurant.images} />
                            {/* ('en-GB', { timeZone: 'Europe/Amsterdam' })) 28/11/2022, 09:19:51*/}
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default history
