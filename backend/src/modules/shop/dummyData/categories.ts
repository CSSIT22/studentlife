import { Category } from "@apiType/shop"

let categories = [
    {
        id: 1,
        name: "Pens",
        image: "https://cdn-icons-png.flaticon.com/512/1860/1860115.png",
    },
    {
        id: 2,
        name: "Laptops",
        image: "https://static.vecteezy.com/system/resources/previews/002/387/754/original/laptop-icon-free-vector.jpg",
    },
    {
        id: 3,
        name: "Mobiles",
        image: "https://cdn.pixabay.com/photo/2019/09/14/15/14/mobile-phone-4476309_1280.png",
    },
    {
        id: 4,
        name: "Men Pants",
        image: "https://images.lululemon.com/is/image/lululemon/LM5AH0S_026083_2",
    },
    {
        id: 5,
        name: "Women Pants",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThwAvbiZ1f1yvg-0OUj4lXLnPNpwhZq7rXD31KJ48Ntqg5k0wazpc7GEvq08Dw4nymI0k&usqp=CAU",
    },
    {
        id: 6,
        name: "Men Sweater",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0WdlOWn4VhUjLnLDZzzxeDvfmyfGhyFl00U1LKAC30G6B9jDuvUSOFvddM95kHtgORs&usqp=CAU",
    },
    {
        id: 7,
        name: "Women Sweater",
        image: "https://images.bewakoof.com/t640/women-s-jet-black-solid-sweater-497715-1661350868-1.jpg",
    },
    {
        id: 8,
        name: "Milk",
        image: "https://downshiftology.com/wp-content/uploads/2022/10/Almond-Milk-Recipe-22-8.jpg",
    },
    {
        id: 9,
        name: "Shoes",
        image: "https://www.net-a-porter.com/variants/images/20346390235385911/in/w920_q60.jpg",
    },
    {
        id: 10,
        name: "Heels",
        image: "https://i.insider.com/5bd7484848eb120cca7e2a13?width=1136&format=jpeg",
    },
    {
        id: 11,
        name: "Hat",
        image: "https://cdn.shopify.com/s/files/1/0397/0396/9949/files/FEDORAS2_1600x.jpg?v=1664889901",
    },
    {
        id: 12,
        name: "Skirt",
        image: "https://www.bodenimages.com/productimages/r1aproductlarge/22wwin_r0211_blk_m01.jpg",
    },
    {
        id: 13,
        name: "Men T-Shirt",
        image: "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1990751_023_f?$x1_grid$&v=1668443728",
    },
    {
        id: 14,
        name: "Lip Stick",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV5_V8ITfj_XWHmr3PghUOyfr8DhnUGVCNueZCJ1folVsLXakz2xMDyXOWAdXyIG86B8I&usqp=CAU",
    },
    {
        id: 15,
        name: "Vacuum Cleaner",
        image: "data:image/jpeg;base64,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",
    },
    {
        id: 16,
        name: "Backpack",
        image: "https://images.lululemon.com/is/image/lululemon/LU9AVVS_0001_1?size=800,800",
    },
    {
        id: 17,
        name: "Mask",
        image: "https://www.ingame.de/bilder/2021/01/13/90167383/27352632-razer-zephyr-maske-promo-2iRzKtHE8jec.jpg",
    },
    {
        id: 18,
        name: "TV",
        image: "https://res.cloudinary.com/cenergy-innovation-limited-head-office/image/fetch/c_scale,q_70,f_auto,h_740/https://d1dtruvuor2iuy.cloudfront.net/media/catalog/product/0/0/000273195_mi_tv_p1_55.jpg",
    },
    {
        id: 19,
        name: "Sound Box",
        image: "https://s.alicdn.com/@sc04/kf/H32fa3ffcb2804f8a98dd02a08ed77965G.jpg_300x300.jpg",
    },
    {
        id: 20,
        name: "Blender",
        image: "https://media.wired.com/photos/5d69786485e6aa0008a3c3d9/master/w_2560%2Cc_limit/Breville-Super-Blender-SOURCE-Breville-TA.jpg",
    },
    {
        id: 21,
        name: "Refrigerator",
        image: "https://d2eajpoqaqhimg.cloudfront.net/content/dam/midea-aem/us/refrigerators/full-size-refrigerators/21-6-cu-ft-french-door-refrigerator-with-ice-and-water-dispenser-mrq22d7ast/twice-awards/fride-open-twiceawards.jpg",
    },
    {
        id: 22,
        name: "Desk",
        image: "https://cdn11.bigcommerce.com/s-31djhj4ixx/images/stencil/747x560/products/13694/7782/Mocka_Kirra_Desk_2__57576.1.jpg",
    },
    {
        id: 23,
        name: "Fan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTA-7xy5Fut_tdVaadtm_MO2cG0gUDH9Agg&usqp=CAU",
    },
    {
        id: 25,
        name: "Cosmetics",
        image: "https://www.thann.co.th/wp-content/uploads/2015/11/240620-AW-shower-gel-1-web.jpg",
    },
    {
        id: 27,
        name: "UFO",
        image: "https://static.spektrum.de/fm/912/f1920x1080/Ufo_Fotolia_88487610_nikolayn.jpg",
    },
    {
        id: 28,
        name: "Train",
        image: "https://gumlet.assettype.com/swarajya%2F2022-02%2Fe1caf4d5-210c-40ee-8a3e-bc5e2e9a8fb6%2FVande_Bharat_train_image.png?q=75&auto=format%2Ccompress&w=400&dpr=2.6",
    },
    {
        id: 29,
        name: "Submarine",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAIWy-szsPVt7ZZ3b5KnUBsjd02W0cp07vg&usqp=CAU",
    },
    {
        id: 30,
        name: "Aeroplane",
        image: "data:image/jpeg;base64,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",
    },
]

export const getCategories = () => categories

export const setCategories = (new_categories: Category[]) => {
    categories = new_categories
}
