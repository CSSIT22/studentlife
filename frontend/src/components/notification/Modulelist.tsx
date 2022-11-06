import { Button } from "@chakra-ui/react"
import React from "react"
import { Menu, MenuButton, MenuList, MenuItem, Stack } from "@chakra-ui/react"
const Modulelist = () => {
    return (
        <Menu>
            <MenuButton as={Button}>module: All</MenuButton>
            <MenuList>
                <Stack direction={"column"} padding={4} height="75%" overflow="auto">
                    <MenuItem>All</MenuItem>
                    <MenuItem>Shop</MenuItem>
                    <MenuItem>Schedule</MenuItem>
                    <MenuItem>Announcement</MenuItem>
                    <MenuItem>Chat</MenuItem>
                    <MenuItem>Dating</MenuItem>
                    <MenuItem>To Do</MenuItem>
                    <MenuItem>Page Community</MenuItem>
                    <MenuItem>Transaction</MenuItem>
                </Stack>
            </MenuList>
            
        </Menu>
    )
}

export default Modulelist
