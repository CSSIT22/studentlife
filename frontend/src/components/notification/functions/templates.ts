export const templates = [
    {
        id: 0,
        title: "ANNOUNCEMENT_APPROVED",
        template: "<p><b>v1</b> v2 get approved</p>" 
        //(Post title) (doesn't/null) get approved
    },
    {
        id: 1,
        title: "ANNOUNCEMENT_NEW",
        template: "<p>Announcement<br><b>v1</b></p>" 
        //Announcement title(sender)
    },
    {
        id: 2,
        title: "ANNOUNCEMENT_WAIT_FOR_APPROVE",
        template: "<p>New post waiting for you to approve!</p>"
    },
    {
        id: 3,
        title: "CHAT_MESSAGE",
        template: "<p>new message from <b>v1</b></p>" //new message from name
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
        template: "<p>v1 accept you to the activity <b>v2</b></p>"
    },
    {
        id: 7,
        title: "DATING_INTERESTED",
        template: "<p>v1 interested in your activity <b>v2</b></p>"
    },
    {
        id: 8,
        title: "DATING_MATCH_FRIEND",
        template: "<p>You match with <b>v1</b> and already befriend</p>"
    },
    {
        id: 9,
        title: "DATING_MATCH",
        template: "<p>You match with <b>v1</b></p>"
    },
    {
        id: 10,
        title: "QnA_ANSWER_ANONYMOUS",
        template: "<p>Anony has answered your question <b>v1</b></p>"
        //How about Anony Profile?
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
        template: "<p><b>v1</b><br> v2</p>"
    },
    {
        id: 14,
        title: "TODO_LIST_TASK",
        template: "<p>You have a <b>v1</b>:<b>v2</b> work within the remaining v3 days!</p>" //You have a CSC210:Task name work within the remaining ? days!
    },
    {
        id: 15,
        title: "TRANSACTION_SUCCESS",
        template: "<p><b>v1</b> your payment orderid <b>v2</b> was successful</p>" //v1=payment time, v2=order id
    },
    {
        id: 16,
        title: "SHOP_DELIVERY",
        template: "<p>Your order <b>v1</b>, has changed it's status to <b>v2</b></p>" 
        //v1=order id, v2=order status
    },
    {
        id: 17,
        title: "SHOP_PLACED_ORDER",
        template: "<p><b>User v1 has placed an order with orderId v2.</b> <em>Click to see details and prepare for the order</em></p>" 
        //v1=user id, v2=order id
    },
    {
        id: 18,
        title: "SHOP_NEW_COUPON",
        template: "<p><b>A new coupon is now available in the shop. The coupon code is v1.</b> <em>Click to collect the coupon now</em></p>" 
        //v1=coupon code
    },
    {
        id: 19,
        title: "SHOP_DELIVERY_ATTEMPT",
        template: "<p>We will try to deliver your product today</p>" 
    },
    {
        id: 20,
        title: "SHOP_RECOMMEND",
        template: "<p><b>Check out this product v1.</b> <em>Click to see details</em></p>" 
        //v1=product name
    }
]
