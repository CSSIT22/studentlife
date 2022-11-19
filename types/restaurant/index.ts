export type Restaurant = {
    userid: number
    id: number
    resName: string;
    amountOflike: number;
    open: string;
    close: string;
    phone: string;
    website: string;
    vicinity: string;
    status: boolean;
    img: Array<string>
}

export type Review = {
    resId: number
    name: string
    picture: string
    rate: string
    review: string
}