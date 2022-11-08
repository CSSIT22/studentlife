import { Tooltip, Flex, Heading, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { IconType } from "react-icons"

const NavBarWithNoti: FC<{ label: string; notiCount?: number; Icon: IconType }> = ({ label, notiCount, Icon }) => {
    return (
        <Tooltip label={label}>
            <Box pos={"relative"}>
                {notiCount && (
                    <Flex
                        justifyContent={"center"}
                        alignItems="center"
                        rounded={"full"}
                        pos="absolute"
                        left={"20px"}
                        w="20px"
                        p={"1px"}
                        h="20px"
                        bg="red"
                    >
                        <Text fontSize={"x-small"} fontWeight="bold" color="white">
                            {notiCount > 10 ? "9+" : notiCount}
                        </Text>
                    </Flex>
                )}
                <Heading _hover={{ color: "black" }} fontWeight="normal" color="gray.600" transition="0.5s">
                    <Icon />
                </Heading>
            </Box>
        </Tooltip>
    )
}

export default NavBarWithNoti
