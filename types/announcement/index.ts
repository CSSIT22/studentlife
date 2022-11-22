export type addMoreLangType = {
    id:number
    lang_id:number,
    topic:string,
    detail:string
}
export type post = {
    postId:number,
    userId:string
    lang_id:number,
    topic:string,
    detail:string,
    sender:string,
    status:string,
    pinStatus:boolean,
    isApprove:boolean,
    targetType:string,
    targetValue:string,
    postAt:Date,
    expiredOfPost:Date,
    expiredAfterDelete:Date |null , 
    addMoreLang:addMoreLangType[] 
}

export type languageInfo = {
    lang_id:number,
    langName:string
}