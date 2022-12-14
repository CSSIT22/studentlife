import React, { useContext } from 'react'
import { authContext } from 'src/context/AuthContext'
import AppBody from '../share/app/AppBody'

const AnnounceNav = (props: any) => {
    const user = useContext(authContext)
    const roles = user?.roles
    console.log(roles);
    const roleName: string[] = []

    return (
        <>
            {(() => {
                user?.roles.forEach((r) => {
                    roleName.push(r.roleName)
                })
                if (roleName.includes('ANNOUNCEMENT_APPROVER')) {
                    return (
                        <AppBody
                            secondarynav={[
                                { name: "Announcement", to: "/announcement" },
                                { name: "Approval", to: "/announcement/approval" },
                                { name: "History", to: "/announcement/history" },
                                { name: "Recycle bin", to: "/announcement/recyclebin" },
                            ]}
                            p={{ md: "3rem" }}
                        >
                        </AppBody>
                    )
                } else if (roleName.includes('ANNOUNCEMENT_ANNOUNCER')) {
                    return (
                        <AppBody
                            secondarynav={[
                                { name: "Announcement", to: "/announcement" },
                                { name: "History", to: "/announcement/history" },
                                { name: "Recycle bin", to: "/announcement/recyclebin" },
                            ]}
                            p={{ md: "3rem" }}
                        >
                        </AppBody>
                    )
                } else {
                    return (
                        <AppBody
                            secondarynav={[
                                { name: "Announcement", to: "/announcement" },
                            ]}
                            p={{ md: "3rem" }}
                        >
                        </AppBody>
                    )
                }
            })()}
        </>

    )
}

export default AnnounceNav