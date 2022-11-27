import { Grid, GridItem, Heading } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import FavoriteContent from "src/components/restaurant/FavoriteContent"
import API from "src/function/API"
import Historycontent from "../../components/restaurant/historycontent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"

const history = () => {
    const [property, setproperty] = React.useState<any>([])
    const params = useParams()
    useEffect(() => {
        API.get("/restaurant/history/").then((item) => setproperty(item.data))
    }, [])
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
                    return (
                        <GridItem>
                            <Historycontent resName={e1.resName} date={e1.date} status={e1.status} img={e1.img[0]} />
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default history
