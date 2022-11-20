export type Product = {
    productId: number,
    name: string,
    image: string,
    brand: string,
    price: number,
    categoryId: number,
    contactId: number,
    description: string,
    color: string,
    size: string,
    stock: number,
    deliveryFee: number,
    views: number
}

export type Category = {
    id: number,
    name: string,
    image: string
}