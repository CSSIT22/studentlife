import {
    Box,
    Center,
    Checkbox,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderMark,
    RangeSliderThumb,
    RangeSliderTrack,
    Tooltip,
} from "@chakra-ui/react"
import React, { FC } from "react"

const DatingOptionRangeSlider: FC<{
    sliderValue: number[]
    useAgeValue: boolean
    setUseAgeValue: React.Dispatch<React.SetStateAction<boolean>>
    setSliderValue: React.Dispatch<React.SetStateAction<number[]>>
}> = ({ sliderValue, useAgeValue, setUseAgeValue, setSliderValue }) => {
    function handleAge() {
        //Passing data + debug
        globalThis.age = sliderValue
        // console.log(globalThis.age)
    }

    function handleCheck() {
        //Passing data + debug
        globalThis.useAge = useAgeValue
        // console.log(globalThis.useAge)
    }

    return (
        <Center bg="#E65300" h={20} borderRadius="15px">
            {/* Is user use age as criteria? */}
            <Tooltip label="Use age as a criteria?" aria-label="A tooltip">
                <span tabIndex={0}>
                    <Checkbox
                        colorScheme="white"
                        defaultChecked={globalThis.useAge}
                        p="30px"
                        size="lg"
                        iconSize="5lg"
                        onChange={() => {
                            handleCheck()
                            setUseAgeValue(!useAgeValue)
                        }}
                    ></Checkbox>
                </span>
            </Tooltip>

            {/* Age min and Age max */}
            <RangeSlider
                aria-label={["min", "max"]}
                min={18}
                max={40}
                defaultValue={[19, 25]}
                onChange={(val) => {
                    handleAge()
                    setSliderValue(val)
                }}
                ml={"20px"}
                mr={"45px"}
            >
                <RangeSliderMark value={sliderValue[0]} textAlign="center" color="white" mt="-10" ml="-5" w="12">
                    {sliderValue[0]}
                </RangeSliderMark>
                <RangeSliderMark value={sliderValue[1]} textAlign="center" color="white" mt="-10" ml="-5" w="12">
                    {sliderValue[1]}
                </RangeSliderMark>
                <RangeSliderTrack bg="#6B7999">
                    <RangeSliderFilledTrack bg="#293B66" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                    <Box color="#6B7999" />
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}>
                    <Box color="#6B7999" />
                </RangeSliderThumb>
            </RangeSlider>
        </Center>
    )
}

export default DatingOptionRangeSlider
