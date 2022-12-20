

function CurrentDate(): string {
    var date: Date = new Date()
    var dmy = date.toDateString()
    var hours = date.getHours().toString()
    var minutes = date.getMinutes().toString()
    // var seconds = date.getSeconds().toString()
    let currentDate: string = dmy + " " + hours + ":" + minutes /* + ":" + seconds */
    return currentDate
}
function RandomNumber() {
    return Math.floor(Math.random() * 1001)
}
function ScoreUp(likes: number, comments: number, shares: number) {
    comments *= 4 // 1 comment = 4 scores
    shares *= 2 // 1 shares = 2 scores
    return likes + comments + shares
}

export const Postdata = [
    {
        id: "1",
        name: "Mr.Cat 1",
        dateTime: CurrentDate(),
        message: "Hello from the other side!",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "https://img.freepik.com/premium-vector/boy-waving-hand-greeting-cute-people-illustration_107355-500.jpg?w=1380",
        score: 0
        // Since we can't add score right when we declare here, like => "likes + comments + shares", "ScoreUp(likes, comments, shares)",
        // "Postdata[0].likes, Postdata[0].comments, Postdata[0].shares", or something similar.
        // The solution that Phon found right now is to assign the score later by using 'for loop' below
        // if you got any better idea feel free to try it, Thanks!
    },
    {

        id: "2",
        name: "Mr.Cat 2",
        dateTime: CurrentDate(),
        message: "Seek success, but always be prepared for random cats.",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "https://img.freepik.com/premium-vector/smiling-young-man-showing-thumbs-up-illustration-hand-drawn-style_213307-233.jpg?w=1380",
        score: 0
    },
    {
        id: "3",
        name: "Mr.Cat 3",
        dateTime: CurrentDate(),
        message: "Sometimes I stare at a door or a wall and I wonder what is this reality, why am I alive, and what is this all about?",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "https://img.freepik.com/premium-vector/big-obstacle-concept-illustration_1133-825.jpg?w=1800",
        score: 0
    },
    {
        id: "4",
        name: "Mr.Cat 4",
        dateTime: CurrentDate(),
        message: "Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania); gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football. These various forms of football share to varying extent common origins and are known as football codes.",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
    {
        id: RandomNumber(),
        name: "Mr.Cat " + " " + RandomNumber(),
        dateTime: CurrentDate(),
        message: "Testing random messages number " + RandomNumber() + "...",
        likes: RandomNumber(),
        comments: RandomNumber(),
        shares: RandomNumber(),
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "",
        score: 0
    },
]

// for loop use for assigning score to each Post
for (let i = 0; i < Postdata.length; i++) {
    let score = ScoreUp(Postdata[i].likes, Postdata[i].comments, Postdata[i].shares)
    // let score = Postdata[i].likes + Postdata[i].comments + Postdata[i].shares
    Postdata[i].score = score
    // Log below for checking score correctness
    // console.log(Postdata[i].name + ": " + Postdata[i].likes + " + " + "(" + Postdata[i].comments + "*4" + ")"
    //     + " + " + "(" + Postdata[i].shares + "*2" + ")" + " = " + score)
}