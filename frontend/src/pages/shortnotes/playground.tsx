import { FC, useState } from "react"

let nextId = 0

const List = () => {
    const [pName, setName] = useState("")
    const [people, setPeoples] = useState<string[]>([])

    return (
        <>
            <h1>Inspiring sculptors:</h1>
            <input value={pName} onChange={(e) => setName(e.target.value)} />
            <button
                onClick={() => {
                    let x = people.concat(pName)
                    setPeoples(x)
                    setName("")
                }}
            >
                Add
            </button>
            <ul>
                {people.map((people, key) => (
                    <li>{people}</li>
                ))}
            </ul>
        </>
    )
}

export default List
