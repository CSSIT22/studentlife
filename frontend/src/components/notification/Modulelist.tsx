import { Box, Button, filter, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react"
import React, { FC } from "react"


const Modulelist: FC<{ onClick: Function; selectedModule: string }> = ({ onClick, selectedModule }) => {
    const MODULES = [
        { id: 0, name: "All" },
        { id: 1, name: "SHOP_REVIEW" },
        { id: 2, name: "TODO_LIST" },
        { id: 3, name: "CHAT" },
        { id: 4, name: "TRANSACTION" },
        { id: 5, name: "COMMUNITY" },
        { id: 6, name: "ANNOUNCEMENT" },
        { id: 7, name: "QnA" },
        { id: 8, name: "DATING" },
        { id: 9, name: "SCHEDULE" },
    ]
    return (
        <Menu>
            <MenuButton color={"orange.500"} size="sm" as={Button} bg={"transparent"}>
                {selectedModule}
            </MenuButton>
            <MenuList background={"#E69C73"}>
                <Box w="100%" height="30vh" overflow="auto" background={"#E69C73"}>
                    <Stack direction={"column"} padding={4}>
                        {MODULES.map((el) => {
                            return (
                                <MenuItem onClick={() => onClick(el.name)} key={el.id} bg={"white"} as={Button}>
                                    {el.name}
                                </MenuItem>
                            )
                        })}
                    </Stack>
                </Box>
            </MenuList>
        </Menu>
    )
}

export default Modulelist
