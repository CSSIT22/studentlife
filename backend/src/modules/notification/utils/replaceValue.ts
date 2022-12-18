import { NotiValue } from "@apiType/notification"
import { templates } from "./templates"

export function showDescription(values: string[], template: string) {
    let v1 = values[0]
    let v2 = values[1]
    let v3 = values[2]

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
        return result3
    }
}
