import communities from "./routes/searchCommunity"

export const getCommunity = () => Communities

export const setCommunity = (newData: Community[]) => {
    Communities = newData
}

export type Community = {
    name: string
    id: number
    owner: string
    desc?: string
    privacy: boolean
    coverPhoto?: Blob
}

let Communities: Community[] = 
[
    {
        name: "Dota2",
        id: 1,
        owner: "AAAA",
        privacy: true,
    },
    
    {
        name: "Dota3",
        id: 2,
        owner: "BBBB",
        privacy: true,
    },
        
    {
        name: "Dota4",
        id: 3,
        owner: "CCCC",
        privacy: true,
    },
    
    {
        name: "Dota5",
        id: 4,
        owner: "DDDD",
        privacy: true,
    }
]

export default Communities