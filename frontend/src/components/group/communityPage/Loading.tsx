import { Box, Image, Heading, VStack, Tab, TabList, Tabs, Spinner, Skeleton, } from '@chakra-ui/react'
import { FC, } from 'react'

import { Link } from 'react-router-dom'

const Loading: FC<{
    chCommunity?: any

}> = () => {
    const navTab = [
        {
            name: "Discusstion",
            to: ``
        },
        {
            name: "Member",
            to: ``
        },
        {
            name: "File",
            to: ``
        }
    ]
    return (
        <Box
        >
            <Skeleton>
                <Image

                    marginTop={{ base: "-2rem", sm: "-5rem" }}
                    height={{ base: "11rem", sm: "15rem" }}
                    backgroundRepeat="no-repeat"
                    width="100%"
                    objectFit="cover"
                    objectPosition="center"
                />
            </Skeleton>
            <VStack
                borderBottomRadius='lg'
                align='flex-start'
                bg="white"
                px='4'
                pt='4'
                shadow='lg'
                mb='2'
                height='212.28px'
                justify='space-between'
            >
                <Heading
                    fontSize='2xl'
                    lineHeight='1'
                >
                    <Spinner
                        mr='1'
                        thickness='3px'
                        speed='0.65s'
                        emptyColor='orange.100'
                        color='orange.500'
                        size='sm'
                    />
                    Loading...
                </Heading>

                <Tabs
                    size="md"
                    bg="white"
                    variant="unstyled"
                >
                    <TabList
                    >
                        {
                            navTab.map((tab) => {
                                return (
                                    <Link to={tab.to} key={tab.name}>
                                        <Tab
                                            isDisabled
                                            _active={{
                                                color: "orange.500",
                                            }}
                                        >
                                            {tab.name}
                                        </Tab>
                                    </Link>
                                )
                            })
                        }
                    </TabList>
                </Tabs>
            </VStack >
        </Box >
    )
}

export default Loading