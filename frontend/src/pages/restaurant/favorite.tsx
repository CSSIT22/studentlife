import { Heading, Box, Grid, GridItem, Button } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import FavoriteContent from "../../components/restaurant/FavoriteContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import API from "src/function/API"
import { key } from "localforage"

function favorite() {
    // const showfv = Restaurant.filter((e1) => e1.status === true)
    const params = useParams()
    const [property, setproperty] = React.useState<any>([]);

    useEffect(() => {
        API.get("/restaurant/favorite?userid=" + "101") 
            .then((item) => setproperty(item.data))          
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

            <Heading color={"##000000"} mt={"20px"} textAlign="center">
                Favorite
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {property.map((e1: any) => {
                    return (
                        <GridItem>
                            <FavoriteContent
                                id={e1.id}
                                resName={e1.resName}
                                phone={e1.phone}
                                open={e1.open}
                                close={e1.close}
                                website={e1.website}
                                link={`/restaurant/detail/${e1.id}`}
                                img={e1.img[0]}
                            />
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default favorite
