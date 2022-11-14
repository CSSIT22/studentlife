import { Box, Button, ButtonGroup, useBreakpointValue, Stack } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"

const LikedYou = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    return (
        <DatingAppBody>
            {isMobile ? (
                <Stack>
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={12} mb={3}>
                        <ButtonGroup gap="4em">
                            <Button colorScheme="orange" height="58px" width="240px">
                                People that liked you
                            </Button>
                            <Button colorScheme="orange" height="58px" width="240px">
                                People that you liked
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Stack>
            ) : (
                <Box></Box>
            )}
        </DatingAppBody>
    )
}

export default LikedYou
