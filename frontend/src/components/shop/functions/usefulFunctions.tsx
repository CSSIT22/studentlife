function convertCurrency(amount: number) {
    return "฿" + amount.toFixed(2)
}
export function dateFormat(date: Date): string {
    let hours = date.getHours() % 12
    let amPm = date.getHours() > 12 ? "PM" : " AM"
    let timeF = hours + ":" + date.getMinutes() + amPm
    return date.toDateString() + " at " + timeF 
    
}
export default convertCurrency