import { VALUE } from './../main/mockupData/valueForTemplate';
export const keyValue = VALUE[0].value
export const CHAT_MESSAGE = [
    {
        template: "<p>new message from %S</p>"//+keyValue
    }//new message from name  //+time[Room.update_at]
]