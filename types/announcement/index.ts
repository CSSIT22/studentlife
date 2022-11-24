export type addMoreLangType = {
    id:number
    languageId:number,
    annTopic:string,
    annDetail:string
}
export type post = {
    postId:number,
    userId:string
    languageId:number,
    annTopic:string,
    annDetail:string,
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