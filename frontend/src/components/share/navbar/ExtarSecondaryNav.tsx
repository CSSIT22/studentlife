import { HStack, Heading, Menu, MenuButton, MenuList, MenuItem, Tooltip } from "@chakra-ui/react"
import React, { FC } from "react"
import { IconType } from "react-icons"
import { AiFillCaretDown } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"
import { secondaryNavProps } from "../app/AppBody"

const ExtarSecondaryNav: FC<secondaryNavProps> = ({ to, name, Icon, subNav, disableText }) => {
    let router = useLocation()
    return (
        <>
            {subNav ? (
                <HStack>
                    <Menu autoSelect={false}>
                        <MenuButton cursor={"pointer"} _hover={{ color: "gray.100", bg: "orange.400" }} p={2} color="white">
                            <Tooltip label={name} isDisabled={!disableText}>
                                <HStack>
                                    {Icon && (
                                        <>
                                            {typeof Icon !== "string" ? (
                                                <Heading fontWeight={"normal"} size="sm">
                                                    <Icon />
                                                </Heading>
                                            ) : (
                                                <img src={Icon} style={{ height: "17px" }} />
                                            )}
                                        </>
                                    )}
                                    {!disableText && (
                                        <Heading fontWeight={"normal"} size="sm">
                                            {name}
                                        </Heading>
                                    )}
                                    <Heading fontWeight={"normal"} size="sm">
                                        <AiFillCaretDown />
                                    </Heading>
                                </HStack>
                            </Tooltip>
                        </MenuButton>
                        <MenuList bg="orange.300">
                            {subNav.map(({ to, name, Icon }) => (
                                <Link key={to} to={to}>
                                    <MenuItem bg="orange.300" _hover={{ bg: "orange.400" }} color="white">
                                        <HStack>
                                            {Icon && (
                                                <>
                                                    {typeof Icon !== "string" ? (
                                                        <Heading fontWeight={"normal"} size="sm">
                                                            <Icon />
                                                        </Heading>
                                                    ) : (
                                                        <img src={Icon} style={{ height: "17px" }} />
                                                    )}
                                                </>
                                            )}
                                            {!disableText && (
                                                <Heading fontWeight={"normal"} size="sm">
                                                    {name}
                                                </Heading>
                                            )}
                                        </HStack>
                                    </MenuItem>
                                </Link>
                            ))}
                        </MenuList>
                    </Menu>
                </HStack>
            ) : (
                <Link to={to || ""}>
                    <Tooltip label={name} isDisabled={!disableText}>
                        <HStack
                            cursor={"pointer"}
                            _hover={{ color: "gray.100", bg: "orange.400" }}
                            color="white"
                            {...(router.pathname === to && { color: "white" })}
                            transition="0.25s"
                            w="fit-content"
                            p={2}
                        >
                            {Icon && (
                                <>
                                    {typeof Icon !== "string" ? (
                                        <Heading size="sm">
                                            <Icon />
                                        </Heading>
                                    ) : (
                                        <img src={Icon} style={{ height: "17px" }} />
                                    )}
                                </>
                            )}
                            {/* <Heading size="sm">{Icon && <Icon />}</Heading> */}
                            {!disableText && <Heading size="sm">{name}</Heading>}
                            {/* <Heading size="sm">{name}</Heading> */}
                        </HStack>
                    </Tooltip>
                </Link>
            )}
        </>
    )
}

export default ExtarSecondaryNav
