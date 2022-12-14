export const templates = [
    {
        id: 0,
        title: "ANNOUNCEMENT_APPROVED",
        template: "<p><b>v1</b> v2 get approved</p>" //(Post title) (doesn't/null) get approved+time[announcement_post.approve_time]
    },
    {
        id: 1,
        title: "ANNOUNCEMENT_NEW",
        template: "<p><b>v1</b><br>v2</p>" //Announcement title<br>(sender)+time[announcement_post.post_at]
    },
    {
        id: 2,
        title: "ANNOUNCEMENT_WAIT_FOR_APPROVE",
        template: "<p>New post waiting for you to approve!</p>"
    },
    {
        id: 3,
        title: "CHAT_MESSAGE",
        template: "<p>new message from v1</p>" //new message from name  //+time[Room.update_at]
    },
    {
        id: 4,
        title: "COMMUNITY_INVITE",
        template: "<p><b>You got invite to join our community</b><br>v1 invite you to join v2</p>" //User(Inviter) invite you to join Community(CommunityName)
    },
    {
        id: 5,
        title: "COMMUNITY_POST",
        template: "<p><b>Suspected post in your community</b><br>Post from v1 in v2 has violate to community policy</p>" //Post from user(post owner) in community(communityName) has violate to community policy
    },
    {
        id: 6,
        title: "DATING_ACCEPTED",
        template: "v1 accept you to the activity <b>v2</b>"
    },
    {
        id: 7,
        title: "DATING_INTERESTED",
        template: "v1 interested in your activity <b>v2</b>"
    },
    {
        id: 8,
        title: "DATING_MATCH_FRIEND",
        template: "You match with <b>v1</b> and already befriend"
    },
    {
        id: 9,
        title: "DATING_MATCH",
        template: "You match with <b>v1</b>"
    },
    {
        id: 10,
        title: "QnA_ANSWER_ANONYMOUS",
        template: "<p>Anony has answered your question <b>v1</b></p>"
    },
    {
        id: 11,
        title: "QnA_ANSWER",
        template: "<p><b>v1</b> has answered your question <b>v2</b></p>"
    },
    {
        id: 12,
        title: "SCHEDULE_EVENT",
        template: "<p><b>v1</b> will start at v2</p>" //[NewEvent_title] will start at [Event_startTime]
    },
    {
        id: 13,
        title: "SHOP_REVIEW_COMMENT",
        template: "<b>v1</b><br> v2"
    },
    {
        id: 14,
        title: "TODO_LIST_TASK",
        template: "<p>You have a <b>v1</b>:<b>v2</b> work within the remaining 3 days!</p>" //You have a CSC210:Task name work within the remaining 3 days!
    },
    {
        id: 15,
        title: "TRANSACTION_SUCCESS",
        template: "v1  your payment order:v2 was successful" //v1=payment time, v2=order id
    }
]