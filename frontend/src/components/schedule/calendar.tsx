// import React from 'react'

// const calendar = () => {
//   return (
//     <div>calendar</div>
//   )
// }

import React, { useState } from "react"
import Calendar from "react-calendar"

function calendar() {
    const [value, onChange] = useState(new Date())

    return (
        <div>
            <Calendar onChange={onChange} value={value} />
        </div>
    )
}
export default calendar
