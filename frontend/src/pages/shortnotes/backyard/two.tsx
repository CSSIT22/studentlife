import { Box, Grid, Button, chakra, Flex, GridItem, Heading, Stack, Text, useCheckbox, useCheckboxGroup, Spacer, Select } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { BsCheckLg } from "react-icons/bs"
import { GrRadialSelected } from "react-icons/gr"
import AppBody from "src/components/share/app/AppBody"
import API from "src/function/API"

const pg = () => {
    const [sn, setSn] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getShortnotes").then((item) => {
            setSn(item.data)
            console.log(item.data)
        })
    }, [])

    return (
        <AppBody>
            {sn.map((sn: any, key) => (
                <Box key={key}>{sn.topic}</Box>
            ))}
        </AppBody>
    )
}

export default pg
