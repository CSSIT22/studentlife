import { Box, Center, RangeSlider, RangeSliderFilledTrack, RangeSliderMark, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react"
import React, { FC } from "react"

const DatingPollCreateRangeSlider: FC<{
    sliderValue: number[]
    setSliderValue: React.Dispatch<React.SetStateAction<number[]>>
}> = ({ sliderValue, setSliderValue }) => {
    function handleAge() {
        globalThis.people = sliderValue
    }

    return (
        <Center bg="#E65300" h={20} borderRadius="15px" pt="5px" pb="5px">
            {/* Min and Age Max participant*/}
            <RangeSlider
                aria-label={["min", "max"]}
                min={1}
                max={20}
                defaultValue={[2, 5]}
                onChange={(val) => {
                    handleAge()
                    setSliderValue(val)
                }}
                ml={"60px"}
                mr={"60px"}
                pt="5px"
                pb="5px"
            >
                <RangeSliderMark value={sliderValue[0]} textAlign="center" color="white" mt="-9" ml="-5" w="12">
                    {sliderValue[0]}
                </RangeSliderMark>
                <RangeSliderMark value={sliderValue[1]} textAlign="center" color="white" mt="-9" ml="-5" w="12">
                    {sliderValue[1]}
                </RangeSliderMark>
                <RangeSliderTrack bg="#FFF2E5">
                    <RangeSliderFilledTrack bg="#E69C73" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={4} index={0}>
                    <Box color="#FFF2E5" />
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={4} index={1}>
                    <Box color="#FFF2E5" />
                </RangeSliderThumb>
            </RangeSlider>
        </Center>
    )
}

export default DatingPollCreateRangeSlider
