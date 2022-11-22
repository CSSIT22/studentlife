import { Review } from "@apiType/shop";

let reviews: Review[] = [
    {
        id: 1,
        userId: "1",
        productId: 1,
        reviewName: "Test",
        reviewDesc: "These are good basic gel pens. I've had some that are fancier, but if you don't want to spend a lot of money on pens, then these will do well enough and they're cheaper without being cheap.",
        reviewRating: 4,
        reviewAt: "2022 Decemeber 12",
        reviewImage: "https://res.cloudinary.com/cenergy-innovation-limited-head-office/image/fetch/c_scale,q_70,f_auto,h_740/https://d1dtruvuor2iuy.cloudfront.net/media/catalog/product/1/6/161957aa913956408ae7b68c635c57302aa7666d_mkp0994344dummy_4.jpg"
    },
    {
        id: 2,
        userId: "1",
        productId: 1,
        reviewName: "New Test",
        reviewDesc: "These are good basic gel pens. I've had some that are fancier, but if you don't want to spend a lot of money on pens, then these will do well enough and they're cheaper without being cheap.",
        reviewRating: 5,
        reviewAt: "2022 December 14",
        reviewImage: ""
    },
    {
        id: 3,
        userId: "1",
        productId: 1,
        reviewName: "New Test",
        reviewDesc: "These are good basic gel pens. I've had some that are fancier, but if you don't want to spend a lot of money on pens, then these will do well enough and they're cheaper without being cheap.",
        reviewRating: 5,
        reviewAt: "2022 December 14",
        reviewImage: ""
    },
    {
        id: 4,
        userId: "1",
        productId: 1,
        reviewName: "New Test",
        reviewDesc: "These are good basic gel pens. I've had some that are fancier, but if you don't want to spend a lot of money on pens, then these will do well enough and they're cheaper without being cheap.",
        reviewRating: 5,
        reviewAt: "2022 December 14",
        reviewImage: ""
    },
    {
        id: 5,
        userId: "1",
        productId: 1,
        reviewName: "New Test",
        reviewDesc: "These are good basic gel pens. I've had some that are fancier, but if you don't want to spend a lot of money on pens, then these will do well enough and they're cheaper without being cheap.",
        reviewRating: 5,
        reviewAt: "2022 December 14",
        reviewImage: ""
    },
];

export const getReviews = () => reviews
export const setReviews = (newData: Review[]) => {
    reviews = newData
}