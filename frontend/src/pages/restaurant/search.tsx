import { Box, Button, Flex, Grid, GridItem, Heading, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import FavoriteContent from "src/components/restaurant/FavoriteContent"
import API from "src/function/API"
import Searchbar from "../../components/restaurant/searchbar"
import Searchcontent from "../../components/restaurant/searchcontent"
import AppBody from "../../components/share/app/AppBody"
import { Restaurant } from "./data/restaurant"
const search = () => {
    const location = useLocation()
    // const params = useParams()
    const [search, setsearch] = useState<any>([]);
    const filterres = Restaurant.filter((e1) => {
        var num = new URLSearchParams(location.search).get('name')?.length
        console.log();
        
        return e1.resName.toLowerCase().substring(0,new URLSearchParams(location.search).get('name')?.length) === new URLSearchParams(location.search).get('name')?.toLowerCase().substring(0,new URLSearchParams(location.search).get('name')?.length)
        
    })

    
    
    useEffect(() => {
        API.get("/restaurant/search?name=" + new URLSearchParams(location.search).get('name'))
            .then((item) => setsearch(item.data))
            // .catch((err) => on())
            // .finally(off)
            
    }, [new URLSearchParams(location.search).get('name')])

    // console.log(search);
    // console.log(new URLSearchParams(location.search).get('name'));
    
    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar />

            <Heading mt={"20px"} textAlign="center" >
                Search Result
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>

                {search.map((e1:any) => {
                    return (
                        <GridItem>
                            
                            <Link to={`/restaurant/detail/${e1.id}`} >
                                <Searchcontent resName={e1.resName} phone={e1.phone} open={e1.open} close={e1.close} website={e1.website} img={e1.img[0]}/>
                            </Link>
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default search
