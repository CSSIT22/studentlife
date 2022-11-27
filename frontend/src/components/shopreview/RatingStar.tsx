import React from "react"

import { Box, Icon, Stack, Text, ThemeProvider, CSSReset, Textarea } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

const RatingStar: React.FC<{ size: number; icon: string; scale: number; fillColor: string; strokeColor: string }> = React.forwardRef(
    ({ size, icon, scale, fillColor, strokeColor }, ref: any) => {
        const [rating, setRating] = React.useState(0)
        const buttons = []

        const onClick = (idx: any) => {
            var x = idx
            // allow user to click first icon and set rating to zero if rating is already 1
            if (rating === 1 && parseInt(x) === 1) {
                setRating(0)
            } else {
                setRating(parseInt(x))
            }
        }

        const RatingIcon: React.FC<{ fill: boolean }> = ({ fill }) => {
            return (
                <StarIcon
                    as="button"
                    name={icon}
                    boxSize={`${size}px`}
                    color={fillColor}
                    stroke={strokeColor}
                    onClick={(event) => {
                        onClick(event)
                    }}
                    fillOpacity={fill ? "100%" : "0"}
                />
            )
        }

        const RatingButton: React.FC<{ fill: boolean; idx: number }> = ({ idx, fill }) => {
            return (
                <Box
                    as="button"
                    aria-label={`Rate ${idx}`}
                    height={`${size}px`}
                    width={`${size}px`}
                    mx={1}
                    onClick={() => onClick(idx)}
                    _focus={{ outline: 0 }}
                >
                    <RatingIcon fill={fill} />
                </Box>
            )
        }

        for (let i = 1; i <= scale; i++) {
            buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />)
        }

        return (
            <Stack isInline mt={8} justify="center">
                <input name="rating" type="hidden" value={rating} ref={ref} />
                {buttons}
                <Box width={`${size * 1.5}px`} textAlign="center">
                    <Text fontSize="sm" textTransform="uppercase">
                        Rating
                    </Text>
                    <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
                        {rating}
                    </Text>
                </Box>
            </Stack>
        )
    }
)

RatingStar.displayName = "Rating"

export default RatingStar
