export const userData = {
    ownCommunitys: [
        {
            ID: 1,
            name: "Dota2",
            Owner: "1",
            Member: 666,
            Tag: [2, 4],
            Describe: "Best mental therapy center",
            roleID: 4,
            isPrivate: true,
            coverPhoto: "https://picsum.photos/id/500/200",
        },
        {
            ID: 2,
            name: "Memeworld",
            Owner: "3",
            Member: 300,
            Tag: [3],
            Describe: "Storage of meme around the world",
            roleID: 4,
            isPrivate: false,
            coverPhoto: "https://picsum.photos/id/501/200",
        },
    ],
    joinedCommunitys: [
        {
            ID: 1,
            name: "Dota2",
            Owner: "1",
            Member: 666,
            Tag: [2, 4],
            Describe: "Best mental therapy center",
            roleID: 4,
            isPrivate: true,
            coverPhoto: "https://picsum.photos/id/1/200",
        },
        {
            ID: 2,
            name: "Memeworld",
            Owner: "3",
            Member: 300,
            Tag: [3],
            Describe: "Storage of meme around the world",
            roleID: 4,
            isPrivate: false,
            coverPhoto: "https://picsum.photos/id/2/200",
        },
        {
            ID: 3,
            name: "IndianFood",
            Owner: "2",
            Member: 150,
            Tag: [1, 2],
            Describe: "No masara no flavor we can’t eat.",
            roleID: 1,
            isPrivate: true,
            coverPhoto: "https://picsum.photos/id/3/200",
        },
        {
            ID: 4,
            name: "ThaiStreetFood",
            Owner: "3",
            Member: 50,
            Tag: [1],
            Describe: "Secret thai street food that have to try once",
            roleID: 1,
            isPrivate: false,
            coverPhoto: "https://picsum.photos/id/4/200",
        },
    ],
    invitations: [
        {
            inviteID: 1,
            communityName: "Programmer community",
            memberNumber: 8000,
            coverPhoto: "https://picsum.photos/id/300/200",
            isPrivate: true,
            userName: "Passakorn puttama", //name of the person who invited
            expireDate: "28",
        },
        {
            inviteID: 2,
            communityName: "Noob community",
            memberNumber: 4000,
            coverPhoto: "https://picsum.photos/id/301/200",
            isPrivate: false,
            userName: "Kitty Melody", //name of the person who invited
            expireDate: "28",
        },
        {
            inviteID: 2,
            communityName: "Noob community",
            memberNumber: 4000,
            coverPhoto: "https://picsum.photos/id/302/200",
            isPrivate: false,
            userName: "Kitty Melody", //name of the person who invited
            expireDate: "28",
        },
    ],

    Tag: [
        {
            tagID: 1,
            tagName: "#Sport",
            isSelected: false,
            tagDescription: "Sport and any outside activity",
        },
        {
            tagID: 2,
            tagName: "#Game",
            isSelected: false,
            tagDescription: "PC&Moblie Game, Boardgame",
        },
        {
            tagID: 3,
            tagName: "#Education",
            isSelected: false,
            tagDescription: "Learning, Book, Studying",
        },
        {
            tagID: 4,
            tagName: "#Food",
            isSelected: false,
            tagDescription: "Food, Cooking, Restaurant",
        },
        {
            tagID: 5,
            tagName: "#IT",
            isSelected: false,
            tagDescription: "Information and Technology",
        },
        {
            tagID: 6,
            tagName: "#Hangout",
            isSelected: false,
            tagDescription: "Movie, Party, Activity, Meeting",
        },
        {
            tagID: 7,
            tagName: "#Science",
            isSelected: false,
            tagDescription: "Physic, Chemical, Biology",
        },
    ],

    friends: [
        {
            ID: 1,
            userName: "Passakorn Puttama",
            profile:
                "https://scontent.fbkk29-1.fna.fbcdn.net/v/t39.30808-6/299119765_3646386945587747_691813110712138929_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEcOTfML6VEsYgcX9a0wpDN2YlUgUBejDPZiVSBQF6MMwRDHbtDfYvdqLv89681EA24G-2PVZuONn_-_W2S5-2T&_nc_ohc=5arQU05deFcAX9LEFDc&tn=-sLk3okWeEInj7Dt&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=00_AfDyQ65ZBwQaXTzy8l26QAte5aPLMDM5oiQ9OubZYtAu4Q&oe=63749C85",
            isSelect: false,
        },
        {
            ID: 8,
            userName: "Patthadol Raksapram",
            profile:
                "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/157338507_1846511502191185_4895186676389840729_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEWYeuHzFxGPBEaRu6NHsD2-9RSc4ypjeP71FJzjKmN44nsCjqztbaYtPl-GpFuybuh7Oxx7ZwLBv0_qw4OZn7k&_nc_ohc=kGJaaq9f5IMAX95XfxF&_nc_ht=scontent.fbkk5-3.fna&oh=00_AfDmapktgPqRRADyyauISECJrMKis28M5TL46S7yS8PAWA&oe=639D58AC",
            isSelected: false,
        },
        {
            ID: 9,
            userName: "Vatcharamai Rodring",
            profile:
                "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.18169-9/10447621_604965639627003_3069778378348126097_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cdbe9c&_nc_eui2=AeGBmv_dzprhdwCAHqxk4oLt_2PyJJzwmGb_Y_IknPCYZq8z4qhqWbH_719-cs36-gRapaf9-D2RbNTlm0J1zS89&_nc_ohc=FjuNkIEMOIwAX9RvLkN&_nc_ht=scontent.fbkk5-3.fna&oh=00_AfD94Wfyi6CYSXcmf3GbZRMVusB-Vx1g9ZzbNHRNauBvHA&oe=639D57CB",
            isSelected: false,
        },
        {
            ID: 10,
            userName: "Pakkawat Wassa",
            profile:
                "https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/274859505_3166628116958449_1089440485493579767_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGsnAw-AeUjyRzZH-RY_FbD-7Tb6723loL7tNvrvbeWgpsrGMaVNPwDjnJqdH8tU_dWkW0o_hxnprssPoIJS9xD&_nc_ohc=5aASsnCrgF8AX-kTKiM&tn=wOlhBGkPCuwHhJFq&_nc_ht=scontent.fbkk5-4.fna&oh=00_AfC9ovxpAKutd4I6vtRW--MR7sYvVI7w-YPlVni6nkFeDw&oe=637B5307",
            isSelected: false,
        },
        {
            ID: 11,
            userName: "Puvadech Niyomdaycha",
            profile:
                "https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/240729477_4123958257714617_152558809044861253_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGencwhgyYplFGrOns7k4K0d8X884TiHjZ3xfzzhOIeNornBBHgQCMRDuyO0zjAg3f6hQhkQmKSysWQPSE34LWZ&_nc_ohc=S2BQ9uLZDPEAX-_bzNp&_nc_ht=scontent.fbkk5-4.fna&oh=00_AfDb5bMk_1oSICjq4uFzhyGGxtcfHVJ_ZInT3siB42Dbcw&oe=637A19A0",
            isSelected: false,
        },
        {
            ID: 2,
            userName: "Winai Pattaya",
            profile: "https://picsum.photos/id/64/200/300",
            isSelected: false,
        },
        {
            ID: 3,
            userName: "Jacky Chan",
            profile: "https://picsum.photos/id/65/200/300",
            isSelected: false,
        },
        {
            ID: 4,
            userName: "Ong Bak",
            profile: "https://picsum.photos/id/65/200/300",
            isSelected: false,
        },
        {
            ID: 5,
            userName: "Wutthichai Kanjanapong",
            profile: "https://picsum.photos/id/65/200/300",
            isSelected: false,
        },
        {
            ID: 6,
            userName: "Tomson Ooi",
            profile: "https://picsum.photos/id/65/200/300",
            isSelected: false,
        },
        {
            ID: 7,
            userName: "Steve Jobs",
            profile: "https://picsum.photos/id/65/200/300",
            isSelected: false,
        },
    ],
}