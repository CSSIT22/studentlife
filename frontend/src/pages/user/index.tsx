import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { authContext } from 'src/context/AuthContext'

const userIndex = () => {
    const user = useContext(authContext)
    return (
        <Navigate to={`/user/${user.userId}`} />
    )
}

export default userIndex