import AppBody from "../../components/share/app/AppBody";
import BottomNav from "../../components/airdrop/BottomNav";
import { useEffect } from "react";
export default function Index() {
  return (
    <AppBody>
        Drop the file
        <BottomNav page={"drop"}/>
    </AppBody>
  )
}
