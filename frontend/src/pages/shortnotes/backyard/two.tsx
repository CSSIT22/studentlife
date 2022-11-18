import { Box, Grid, Button, chakra, Flex, GridItem, Heading, Stack, Text, useCheckbox, useCheckboxGroup, Spacer, Select } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { BsCheckLg } from "react-icons/bs"
import { GrRadialSelected } from "react-icons/gr"
import AppBody from "src/components/share/app/AppBody"
import API from "src/function/API"

const pg = () => {
    useEffect(() => {
        API.get("/shortnotes/getShortnotes").then((res) => {
            console.log(res.data)
        })
    }, [])

    return <AppBody></AppBody>
}

export default pg
