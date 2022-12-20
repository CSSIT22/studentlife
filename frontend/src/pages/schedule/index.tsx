import React, { useEffect } from "react"
import AppBody from "../../components/share/app/AppBody"
import calendar from "../../components/schedule/calendar"
import Calendar from 'react-calendar';
import timeGridPlugin from '@fullcalendar/timegrid'
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {
    Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, VStack,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Input, Switch, Flex, Spacer, Grid, GridItem, Select, Text, Box,
    extendTheme, Heading, SimpleGrid, Textarea, IconButton,
    useDisclosure, Button, ButtonGroup, Divider, useBreakpointValue, HStack
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import API from "src/function/API";
import AddEventModal from "src/components/schedule/model/AddEventModal";
import FullCalendar from "@fullcalendar/react";
import { DateRangePicker } from "@mantine/dates";
import { DateRangePickerValue } from "@mantine/dates/lib/components/DateRangePicker";
import { DatePicker } from "@mantine/dates";
// import { DESCRIPTION } from "src/components/notification/main/data/descTest"


const theme = extendTheme({
    radii: {
        none: "0",
        sm: "0.125rem",
        base: "14px",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
    },
    component: {
        Modal: {
            size: {
                xl: {
                    h: "689px",
                    w: "824px",
                },
            },
        },
    },
    colors: {
        brand: {
            "200": "#9AE6B4",
        },
    },
})

const getSunday = (d: Date) => {
    const today = new Date(d);
    const first = today.getDate() - today.getDay() + 1;
    const last = first - 1;

    const sunday = new Date(today.setDate(last));

    return sunday;
}

const getMonday = (d: Date) => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + 6;

    const sunday = new Date(today.setDate(first));

    return sunday;
}

const addDays = (d: Date, days: number) => {
    let date = new Date(d);
    date.setDate(date.getDate() + days);
    return date;
}

const getDates = (st: Date) => {
    const t = new Date(st)
    const s = getSunday(t)

    return [s, addDays(s, 6)]
}

const getDatesBack = (st: Date) => {
    return [addDays(st, -7), addDays(st, -1)]

}
const getDatesNext = (st: Date) => {
    return [addDays(st, 1), addDays(st, 7)]

}
const timetable = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const modal1 = useDisclosure()
    const navigate = useNavigate()
    const [dateRange, setDateRange] = useState<DateRangePickerValue>(getDates(new Date()) as any)
    const [targetDate, setTargetDate] = useState<Date>(getSunday(new Date()))
    const isMobile = useBreakpointValue({ base: true, md: false })
    const [events, setEvents] = useState<{ startTime: Date, endTime: Date, title: string }[]>([])
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
        
        const getTasks = API.get("/schedule/getWeekTasks/" + dateRange[0])
        const [toggle,setToggle] = useState(false)
        const reload = () => {
            setToggle(!toggle)
        }
    //set State for add event 
    useEffect(() => {
        getTasks.then(i => {
                setEvents(
                    [...i.data.map(
                        (item: any) =>
                        ({
                            start: new Date(item.stTime), end: new Date(item.endTime),
                            title: item.eventName, id: item.eventId
                        }))])
                // console.log(i.data)
            });
    }, [dateRange,toggle])

    const hadelDateChange = (d: Date | null) => {
        if (d) {
            setTargetDate(d)
            setDateRange(getDates(d) as any)
        }
    }




    return (
        <AppBody>
            {!isMobile && <SimpleGrid columns={[1, 6]} spacing="30px">
                <IconButton aria-label="previous"
                    onClick={() => setDateRange(getDatesBack(dateRange[0] as any) as any)}
                    icon={<ChevronLeftIcon />}
                    ml={"8"}
                    shadow={"md"}
                    bgColor="white"
                    w="60px" h="62px"
                    borderRightRadius="55"
                    borderLeftRadius="55"
                    display={{ base: "none", md: "block" }} />

                <DateRangePicker firstDayOfWeek="sunday" onChange={(e) => setDateRange(getDates(e[0] || new Date()) as DateRangePickerValue)} size="lg" shadow={"md"} clearable={false} inputFormat="DD" type="button" dropdownType="modal" value={dateRange} ></DateRangePicker>

                <DateRangePicker firstDayOfWeek="sunday" onChange={(e) => setDateRange(getDates(e[0] || new Date()) as DateRangePickerValue)} size="lg" shadow={"md"} clearable={false} inputFormat="MM" type="button" dropdownType="modal" value={dateRange} ></DateRangePicker>
                <DateRangePicker firstDayOfWeek="sunday" onChange={(e) => setDateRange(getDates(e[0] || new Date()) as DateRangePickerValue)} size="lg" shadow={"md"} clearable={false} inputFormat="YYYY" type="button" dropdownType="modal" value={dateRange} ></DateRangePicker>


                <IconButton aria-label="next"
                    ml={"8"}
                    onClick={() => setDateRange(getDatesNext(dateRange[1] as any) as any)}
                    icon={<ChevronRightIcon />}
                    bgColor="white"
                    shadow={"md"}
                    w="60px" h="62px"
                    borderRightRadius="55"
                    borderLeftRadius="55"
                    display={{ base: "none", md: "block" }} />

                <IconButton
                    onClick={modal1.onOpen}

                    w={{ base: "38px", md: "60px" }}
                    h={{ base: "40px", md: "62px" }}
                    bg="#6CF5B4"
                    //colorScheme="green"
                    aria-label="Add event"
                    size="sm"
                    icon={<AddIcon color="#828282" />}
                    borderRightRadius="55"
                    borderLeftRadius="55"

                />
            </SimpleGrid>}
            <AddEventModal {...{ initialRef, finalRef, modal1,reload }} />

            {isMobile && <HStack justifyContent={"space-between"}>
                <DatePicker firstDayOfWeek="sunday" clearable={false} dropdownType="modal" value={targetDate} onChange={(e) => hadelDateChange(e)} />
                <IconButton
                    onClick={modal1.onOpen}

                    w={{ base: "38px", md: "60px" }}
                    h={{ base: "40px", md: "62px" }}
                    bg="#6CF5B4"
                    //colorScheme="green"
                    aria-label="Add event"
                    size="sm"
                    icon={<AddIcon color="#828282" />}
                    borderRightRadius="55"
                    borderLeftRadius="55"

                />
            </HStack>

            }
            <br />
            <Box bg="white" p={5} rounded={"2xl"}  >
                {
                    isMobile ?
                        <Box>
                            <FullCalendar events={events} plugins={[timeGridPlugin]}
                                initialView={"timeGridDay"}
                                headerToolbar={{ right: "" }}
                                validRange={(now) => ({ start: targetDate, end: targetDate })}
                                initialDate={dateRange[0] as Date} 
                                eventClick={(info) => {
                                    navigate("/schedule/showEvent/" + info.event.id)
                                }}/>
                        </Box>
                        :
                        <FullCalendar
                            events={events}
                            eventClick={(info) => {
                                navigate("/schedule/showEvent/" + info.event.id)
                            }}
                            plugins={[timeGridPlugin]}
                            initialView={"timeGridWeek"}
                            headerToolbar={{ right: "" }}
                            validRange={(now) => ({ start: dateRange[0], end: dateRange[1] }) as any}
                            initialDate={dateRange[0] as Date} />
                }

            </Box>

        </AppBody>
    )
}

export default timetable

