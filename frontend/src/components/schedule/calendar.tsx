import React, { useState } from "react"
import Calendar from "react-calendar"

function calendar() {
    const [date, setDate] = useState(new Date())

    return (
        <div className="app">
            <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
            </div>
        </div>
    )
}

export default calendar
