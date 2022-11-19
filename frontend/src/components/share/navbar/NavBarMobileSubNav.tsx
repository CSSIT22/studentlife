import { HStack, Heading, Divider, Box } from "@chakra-ui/react"
import React, { FC } from "react"
import { secondaryNavProps } from "../app/AppBody"

const NavBarMobileSubNav: FC<secondaryNavProps> = ({ name, Icon }) => {
    return (
        <Box flex={1}>
            <HStack>
                {Icon && (
                    <>
                        {typeof Icon !== "string" ? (
                            <Heading>
                                <Icon />
                            </Heading>
                        ) : (
                            <img src={Icon} style={{ height: "22px" }} />
                        )}
                    </>
                )}
                <Heading size="sm">{name}</Heading>
            </HStack>
        </Box>
    )
}

export default NavBarMobileSubNav
