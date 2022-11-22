import { UserCoupon } from "@apiType/shop";

let coupons: UserCoupon[] = [
    {
      "couponCode": "fugiat",
      "discount": 21,
      "minimumSpend": 960,
      "productId": 3,
      "quota": 677,
      "validFrom": "2016 January 02",
      "validTill": "2027 May 26",
      "couponDesc": "Ea adipisicing ullamco pariatur nisi dolore incididunt non nisi sint."
    },
    {
      "couponCode": "nostrud",
      "discount": 26,
      "minimumSpend": 537,
      "productId": 3,
      "quota": 1674,
      "validFrom": "2022 October 18",
      "validTill": "2023 October 13",
      "couponDesc": "Fugiat laborum commodo consectetur tempor dolore cupidatat."
    },
    {
      "couponCode": "tempor",
      "discount": 96,
      "minimumSpend": 1278,
      "productId": 2,
      "quota": 4756,
      "validFrom": "2014 November 04",
      "validTill": "2028 June 13",
      "couponDesc": "Irure esse occaecat reprehenderit cupidatat consectetur occaecat et Lorem incididunt id."
    },
    {
      "couponCode": "ut",
      "discount": 53,
      "minimumSpend": 610,
      "productId": 3,
      "quota": 4440,
      "validFrom": "2015 June 04",
      "validTill": "2027 July 21",
      "couponDesc": "Nisi enim sunt laborum ullamco irure nisi aute eiusmod voluptate."
    },
    {
      "couponCode": "qui",
      "discount": 70,
      "minimumSpend": 1114,
      "productId": 5,
      "quota": 4832,
      "validFrom": "2016 April 05",
      "validTill": "2028 August 28",
      "couponDesc": "Eu dolore culpa nulla cillum aute aliquip ullamco est aute magna duis dolor minim."
    },
    {
      "couponCode": "nostrud",
      "discount": 110,
      "minimumSpend": 878,
      "productId": 11,
      "quota": 1131,
      "validFrom": "2016 June 07",
      "validTill": "2025 August 08",
      "couponDesc": "Sit eiusmod dolore id cupidatat."
    },
    {
      "couponCode": "anim",
      "discount": 17,
      "minimumSpend": 1946,
      "productId": 2,
      "quota": 2934,
      "validFrom": "2020 January 22",
      "validTill": "2027 December 28",
      "couponDesc": "Enim amet aliquip est minim fugiat."
    },
    {
      "couponCode": "in",
      "discount": 36,
      "minimumSpend": 748,
      "productId": 7,
      "quota": 140,
      "validFrom": "2018 March 15",
      "validTill": "2028 December 10",
      "couponDesc": "Excepteur eu nulla sit voluptate voluptate nulla minim aliqua excepteur nostrud."
    },
    {
      "couponCode": "ut",
      "discount": 151,
      "minimumSpend": 1543,
      "productId": 9,
      "quota": 2963,
      "validFrom": "2018 December 10",
      "validTill": "2028 June 30",
      "couponDesc": "Lorem est ea velit qui sit anim eiusmod sunt consectetur enim quis."
    },
    {
      "couponCode": "amet",
      "discount": 178,
      "minimumSpend": 1449,
      "productId": 11,
      "quota": 2556,
      "validFrom": "2015 January 05",
      "validTill": "2027 August 10",
      "couponDesc": "Cupidatat ad aute veniam et."
    },
    {
      "couponCode": "do",
      "discount": 36,
      "minimumSpend": 1935,
      "productId": 3,
      "quota": 4244,
      "validFrom": "2021 January 29",
      "validTill": "2023 July 06",
      "couponDesc": "Sunt eu dolore exercitation in nostrud ex et eiusmod do exercitation tempor laboris aute."
    },
    {
      "couponCode": "proident",
      "discount": 15,
      "minimumSpend": 1985,
      "productId": 8,
      "quota": 1118,
      "validFrom": "2016 December 01",
      "validTill": "2027 April 27",
      "couponDesc": "Tempor aliquip cupidatat esse voluptate laborum cupidatat eu proident in nulla mollit pariatur reprehenderit nisi."
    },
    {
      "couponCode": "sit",
      "discount": 113,
      "minimumSpend": 128,
      "productId": 8,
      "quota": 1015,
      "validFrom": "2019 April 29",
      "validTill": "2029 March 20",
      "couponDesc": "Qui fugiat aute est id fugiat."
    },
    {
      "couponCode": "dolor",
      "discount": 195,
      "minimumSpend": 826,
      "productId": 10,
      "quota": 4394,
      "validFrom": "2022 May 04",
      "validTill": "2026 July 09",
      "couponDesc": "Aute occaecat tempor eu irure eiusmod pariatur qui cillum proident est sit occaecat."
    },
    {
      "couponCode": "duis",
      "discount": 141,
      "minimumSpend": 238,
      "productId": 5,
      "quota": 1233,
      "validFrom": "2021 April 30",
      "validTill": "2029 March 28",
      "couponDesc": "Pariatur occaecat incididunt et aute do ullamco duis aute est excepteur Lorem ea ut pariatur."
    }
  ]

export const getCoupons = () => coupons