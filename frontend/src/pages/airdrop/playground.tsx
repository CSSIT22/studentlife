import React, { useState } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory} from "react-icons/md"
const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]
export default function playground() {
    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="history">
                {/* Test code here nahhh */}
            </PageBox>
        </AppBody>
    )
}

