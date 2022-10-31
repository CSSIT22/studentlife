import { HStack, Heading } from "@chakra-ui/react"
import React, { FC } from "react"
import { IconType } from "react-icons"
import { Link, useLocation } from "react-router-dom"

const SecondaryNav: FC<{ to: string; name: string; Icon: IconType }> = ({ to, name, Icon }) => {
    let router = useLocation()
    return (
        <Link to={to}>
            <HStack cursor={"pointer"} _hover={{ color: "orange.300" }} {...(router.pathname === to && { color: "orange.300" })} transition="0.25s">
                <Heading fontWeight={"normal"} size="md">
                    <Icon />
                </Heading>
                <Heading fontWeight={"normal"} size="md">
                    {name}
                </Heading>
            </HStack>
        </Link>
    )
}

export default SecondaryNav
