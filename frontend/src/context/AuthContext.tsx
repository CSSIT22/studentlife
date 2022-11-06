import { Heading, useBoolean } from "@chakra-ui/react"
import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export interface Role {
    club: string
    rank: string
    expire_date: Date
}

export interface User {
    fName: string
    lName: string
    email: string
    userId: string
    levels: string
    studentId: string
    role?: Role
}

const authContext = createContext<User>({} as any)

const AuthContextProvider: FC<{ children: ReactNode }> = (props) => {
    const [user, setUser] = useState<User | null>()
    const [loading, { off, on }] = useBoolean(true)
    // const naviagte = useNavigate()
    // useEffect(() => {
    //     off()
    //     naviagte("/auth", { replace: true })
    // }, [])
    // if (loading) {
    //     return <Heading>Loading</Heading>
    // }
    // if (!user) {
    //     return <Navigate to="/auth" />
    // }
    return <authContext.Provider value={user as any} {...props} />
}

export default AuthContextProvider
