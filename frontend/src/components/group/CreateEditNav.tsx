import { Box, Image, Heading, Text, Flex, Button, VStack, Wrap, Tab, TabList, Tabs, Menu, MenuButton, MenuItem, MenuList, useToast, Status, transition } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { BsPlusLg, BsThreeDots } from 'react-icons/bs'
import { HiLockClosed, HiUserGroup } from 'react-icons/hi2'
import { MdPublic } from 'react-icons/md'
import { Link } from 'react-router-dom'
import API from 'src/function/API'


const NavbarCommunity: FC<{
    //Community
    disabled?: boolean, //use for disable button
    name?: string,
    desc?: string,
    photo?: any,
    privacy?: boolean,
    tags?: [],
    memberCount?: number,

    //User
    access?: boolean, //true = not access to community | false = access to community
    role?: string, //OWNER, ADMIN, CO_ADMIN, MEMBER
    status?: boolean, //true = pending | false = not pending
    isBlacklisted?: boolean,

    data?: any
    isLoading?: boolean
    isError?: boolean
    fetchCommunity?: any
    activeTab?: number

}> = ({ disabled, name, desc, photo, privacy, tags, memberCount = 0, access, role, status, isBlacklisted, data, isLoading, isError, fetchCommunity, activeTab }) => {

    const navTab = [
        {
            name: "Discusstion",
        },
        {
            name: "Member",
        },
        {
            name: "File",
        }
    ]

    let url = photo instanceof String;
    
    return (
        <Box
        >
            <Image
                src={photo}
                fallbackSrc="https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg"
                marginTop={{ base: "-2rem", sm: "-5rem" }}
                height={{ base: "11rem", sm: "15rem" }}
                backgroundRepeat="no-repeat"
                width="100%"
                objectFit="cover"
                objectPosition="center"
            />
            <VStack
                borderBottomRadius='lg'
                align='flex-start'
                bg={"white"}
                px='4'
                pt='4'
                shadow='lg'
                mb='2'
            >
                <Heading
                    fontSize='2xl'
                    lineHeight='1'
                >
                    {name}
                </Heading>
                <Flex
                    alignItems='center'
                    gap='1'
                    fontSize='sm'
                    color='gray.500'
                >
                    {privacy ? <HiLockClosed /> : <MdPublic />}
                    <Text>
                        {privacy ? "Private community" : "Public community"}
                    </Text>
                    <Text
                        fontWeight='500'
                    >
                        {" • "}
                        {1}
                    </Text>
                </Flex>

                <Wrap
                    pb='1'
                >
                    {tags?.map((tag: any) => (
                        <Box
                            color='white'
                            shadow={{ base: "md", sm: "lg" }}
                            bg='orange.100'
                            fontWeight='medium'
                            px={3}
                            borderRadius={{ base: 'lg', sm: "md" }}
                            fontSize="xs"
                            key={tag.Id}

                        >
                            {tag.tag?.tagName === undefined ? tag?.tagName : tag.tag?.tagName}
                        </Box>
                    ))}
                </Wrap>
                <Text
                    fontSize='sm'
                    color='gray.500'
                    lineHeight='1.1'
                >
                    {desc}
                </Text>
                <Flex
                    justify='flex-end'
                    width={{ base: 'full', sm: 'full' }}
                    gap='1.5'
                >

                    <Button
                        leftIcon={data?.user.access ? <BsPlusLg /> : !data?.user.status ? undefined : <HiUserGroup />}
                        width={{ base: 'full', sm: 'auto' }}
                        colorScheme='orange'
                        size='sm'
                        shadow='lg'
                        disabled

                    >
                        "Join community"
                    </Button>

                </Flex>

                <Tabs
                    size="md"
                    bg={"white"}
                    variant="unstyled"
                >
                    <TabList
                    >
                        {
                            navTab.map((tab) => {
                                return (
                                    <Tab key={tab.name}
                                        _active={{
                                            color: "orange.500",
                                        }}
                                        _selected={{
                                            color: "orange.500",
                                            borderBottom: "2px solid",
                                        }}
                                        isDisabled={disabled}
                                    >
                                        {tab.name}
                                    </Tab>
                                )
                            })
                        }
                    </TabList>
                </Tabs>
            </VStack >
        </Box >
    )
}

export default NavbarCommunity