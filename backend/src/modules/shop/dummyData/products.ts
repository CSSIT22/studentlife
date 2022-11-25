export type Product = {
    productId: number
    name: string
    image: string
    brand: string
    price: number
    categoryId: number
    contactId: number
    description: string
    color: string
    size: string
    stock: number
    deliveryFee: number
    views: number
}

let products: Product[] = [
    {
        productId: 1,
        name: "Gel New Ink Pen Energel",
        image: "https://res.cloudinary.com/cenergy-innovation-limited-head-office/image/fetch/c_scale,q_70,f_auto,h_740/https://d1dtruvuor2iuy.cloudfront.net/media/catalog/product/1/6/161957aa913956408ae7b68c635c57302aa7666d_mkp0994344dummy_4.jpg",
        brand: "Pentel",
        price: 55,
        categoryId: 1,
        contactId: 15,
        description: "xxxxxxxx",
        color: "Black",
        size: "12 inch",
        stock: 50000,
        deliveryFee: 10,
        views: 1,
    },
    {
        productId: 2,
        name: "Mac Book Pro",
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
        brand: "Apple",
        price: 50000,
        categoryId: 2,
        contactId: 15,
        description: "xxxxxxxx MacBook pro",
        color: "Red",
        size: "12 inch",
        stock: 5000,
        deliveryFee: 50,
        views: 1,
    },
    {
        productId: 3,
        name: "Cerave Moisturize Lotion",
        image: "https://api.watsons.co.th/medias/prd-front-275382.jpg?context=bWFzdGVyfGltYWdlc3wyMDg2ODB8aW1hZ2UvanBlZ3xoMTcvaDY3LzkzNTk1Njc2NTA4NDYvV1RDVEgtMjc1MzgyLWZyb250LmpwZ3w0ZGRhMTQ3YzQzOTRlNjA2MWQzMDUyYjAxYWY4MTM0YTk2NzFhMTE1Zjg3NmYyNjdlZDdiZDg1MGYwNGY4MGE2",
        brand: "Cerave",
        price: 500,
        categoryId: 25,
        contactId: 15,
        description: "xxxxxxxx MacBook pro",
        color: "Red",
        size: "12 inch",
        stock: 5000,
        deliveryFee: 50,
        views: 1,
    },
    {
        productId: 4,
        name: "Sound Box",
        image: "https://s.alicdn.com/@sc04/kf/H32fa3ffcb2804f8a98dd02a08ed77965G.jpg_300x300.jpg",
        brand: "Pentel",
        price: 3200,
        categoryId: 19,
        contactId: 15,
        description: "xxxxxxxx Sound Box",
        color: "Black",
        size: "12 inch",
        stock: 50000,
        deliveryFee: 10,
        views: 1,
    },
    {
        productId: 5,
        name: "Blender",
        image: "https://media.wired.com/photos/5d69786485e6aa0008a3c3d9/master/w_2560%2Cc_limit/Breville-Super-Blender-SOURCE-Breville-TA.jpg",
        brand: "Apple",
        price: 450,
        categoryId: 5,
        contactId: 15,
        description: "xxxxxxxx LG",
        color: "Red",
        size: "12 inch",
        stock: 5000,
        deliveryFee: 50,
        views: 1,
    },
    {
        productId: 6,
        name: "Refrigerator",
        image: "https://d2eajpoqaqhimg.cloudfront.net/content/dam/midea-aem/us/refrigerators/full-size-refrigerators/21-6-cu-ft-french-door-refrigerator-with-ice-and-water-dispenser-mrq22d7ast/twice-awards/fride-open-twiceawards.jpg",
        brand: "Samsung",
        price: 55,
        categoryId: 1,
        contactId: 15,
        description: "xxxxxxxx Fridge",
        color: "Black",
        size: "12 inch",
        stock: 50000,
        deliveryFee: 10,
        views: 1,
    },
    {
        productId: 7,
        name: "Fan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTA-7xy5Fut_tdVaadtm_MO2cG0gUDH9Agg&usqp=CAU",
        brand: "Media",
        price: 50000,
        categoryId: 23,
        contactId: 15,
        description: "xxxxxxxx Fan",
        color: "Red",
        size: "12 inch",
        stock: 5000,
        deliveryFee: 50,
        views: 1,
    },
    {
        productId: 8,
        name: "Shower Cream",
        image: "https://www.thann.co.th/wp-content/uploads/2015/11/240620-AW-shower-gel-1-web.jpg",
        brand: "Beauty Buffet",
        price: 350,
        categoryId: 25,
        contactId: 15,
        description: "xxxxxxxx Shower Cream",
        color: "Red",
        size: "12 inch",
        stock: 5000,
        deliveryFee: 50,
        views: 1,
    },
    {
        productId: 9,
        name: "Shampoo",
        image: "https://cdn.shopify.com/s/files/1/0052/8085/8198/products/e2bda94af90875a9de1a4f694b6bc68b2a667bba.jpg?v=1663593261",
        brand: "Dove",
        price: 640,
        categoryId: 25,
        contactId: 15,
        description: "xxxxxxxx Shampoo",
        color: "Red",
        size: "12 inch",
        stock: 5000,
        deliveryFee: 50,
        views: 1,
    },
    {
        productId: 10,
        name: "Men T-Shirt",
        image: "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1990751_023_f?$x1_grid$&v=1668443728",
        brand: "Zara",
        price: 2300,
        categoryId: 13,
        contactId: 15,
        description: "xxxxxxxx T-Shirt",
        color: "Red",
        size: "12 inch",
        stock: 5000,
        deliveryFee: 50,
        views: 1,
    },
    {
        productId: 11,
        name: "Nothing Phone (1) 256GB,8GB RAM-Black",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSTMIGX9C_wVT4kFI2v8defZtDjqWqpVQT5Wr1_U9H0dwHdva8omJxX4LNIs0LgdAMR8fPJu_T2UvjjXn0G9n2w0SfOVnnO3GzLbgxI5sp_3iwRXke1gFo1Wg",
        brand: "Nothing",
        price: 17767.34,
        categoryId: 3,
        contactId: 1,
        description: `8 GB RAM | 256 GB ROM.
        16.64 cm (6.55 inch) Full HD+ Display.
        50MP + 50MP | 16MP Front Camera.
        4500 mAh Lithium-ion Battery.
        Qualcomm Snapdragon 778G+ Processor.
        Meet the Glyph Interface. A New Way to Communicate.
        1 Billion Colours, True-to-Life Full HD Flexible OLED Display with HDR10+ for Richer Colour and Deeper Contrasts.`,
        color: "White",
        size: "16.64 cm (6.55 inch) Full HD+ Display",
        stock: 20,
        deliveryFee: 120,
        views: 1,
    },
]

export const getProducts = () => products
export const setProducts = (newProducts: Product[]) => {
    products = newProducts
}
