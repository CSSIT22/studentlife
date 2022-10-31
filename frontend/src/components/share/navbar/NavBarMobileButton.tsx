import { HStack, Heading, ComponentWithAs, AvatarProps } from "@chakra-ui/react"
import React, { FC } from "react"
import { IconType } from "react-icons"
import { useLocation } from "react-router-dom"

const NavBarMobileButton: FC<{ to: string; Icon: IconType | ComponentWithAs<"span", AvatarProps> }> = ({ to, Icon }) => {
    let location = useLocation()
    return (
        <HStack
            py={3}
            rounded="full"
            _hover={{ bg: "orange.300", color: "white" }}
            transition="0.2s"
            cursor="pointer"
            {...(location.pathname === to && { bg: "orange.300", color: "white" })}
            justifyContent="center"
            alignItems={"center"}
        >
            {to !== "/more" ? (
                <Heading>
                    <Icon />
                </Heading>
            ) : (
                <Icon size="sm" />
            )}
        </HStack>
    )
}

export default NavBarMobileButton
