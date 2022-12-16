import { NotiValue } from "@apiType/notification"
import { Text } from "@chakra-ui/react"
import { templates } from "../templates"

export function showDescription(values: NotiValue[], template: string) {
    let v1 = ""
    let v2 = ""
    let v3 = ""
    //console.log(getvalue)
    // const [valueNotiObject, setValueNotiObject] = useState([])
    // useEffect(() => {
    //     const getvalue = API.get("/notification/getvalue")
    //     getvalue.then((res: { data: React.SetStateAction<never[]> }) => {
    //         setValueNotiObject(res.data)
    //     })
    // }, [])
    // console.log(valueNotiObject)
    // console.log(values);

    values.forEach((item: NotiValue) => {

        if (v1 == "") {
            v1 = item.value
        } else if (v2 == "") {
            v2 = item.value
        } else if (v3 == "") {
            v3 = item.value
        }

    });

    //console.log(v1, v2, v3)

    let count = 0
    let result1
    let result2
    let result3
    templates.forEach((item: any) => {
        if (template == item.title) {
            //console.log(template)
            result1 = templates[count].template.replace(/v1/g, v1)
            //console.log(result1)
            result2 = result1.replace(/v2/g, v2)
            result3 = result2.replace(/v3/g, v3)
            //console.log(result3)
        }
        count++
    })
    //console.log(count)
    if (result3 != null) {
        return <Text fontSize={"sm"} textAlign={"left"} dangerouslySetInnerHTML={{ __html: result3 }} />
    }
}
