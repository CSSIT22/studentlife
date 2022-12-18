import { InitUserResponse } from "@apiType/user"

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

export type tgType = {
    Faculty:string[],
    Major:string[],
    Year:string[]
}

export type announcement = {
    postId:string,
    userId:string,
    filterId:number,
    annCreate:Date,
    annExpired:Date,
    isApprove:boolean,
    annCreator:InitUserResponse
    annLanguage:post_to_language[],
    annFilter:announcement_filter,
    annPost:announcement_post ,
    annPin:announcement_pin[] ,
    annSee:announcement_seen[],
    annApprove:announcement_approve ,
    annDel:announcement_delete
}

export type announcement_filter = {
    filterId:number,
    filterType:string,
    value:string
    announcement:announcement 
}

export type announcement_language = {
    languageId:number,
    language:string
    announcementPost:post_to_language[] 
}

export type post_to_language = {
    postId:string,
    languageId:number,
    annTopic:string,
    annDetail:string
    post:announcement,
    language:announcement_language 
}

export type post_to_language2 = {
    languageId:number,
    annTopic:string,
    annDetail:string
}

export type announcement_post = {
    postId:string,
    status:string
    announcement:announcement ,
    postTo:post_on_page[] 
}

export type post_on_page = {
    postId:string,
    userId:string
    post:announcement_post ,
    user:InitUserResponse
}

export type announcement_delete = {
    postId:string,
    deleteAt:Date,
    post:announcement 
}
  
export type announcement_pin = {
    postId:string,
    userId:string,
    status:boolean,
    post:announcement 
    user:InitUserResponse
}

export type announcement_seen = {
    postId:string,
    userId:string,
    seenAt:Date,
    post:announcement 
    user:InitUserResponse
}
  
export type announcement_approve = {
    userId:string,
    postId:string,
    approveTime:Date,
    postApprove:announcement[] 
    approvedBy:InitUserResponse
}

export type announcement_approve2 = {
    postId:string,
    approveTime:number,
}

export type existLang = {
    postId:string,
    languageId:number
}
export type checkLanguage = {
    languageId:number,
    found:boolean
}
export type checkNewLanguage = {
    languageId:number,
    found:boolean,
    topic:string,
    detail:string
}
export type allFaculty = {
    facultyName:string
}
export type allMajor = {
    majorName:string
}
export type allStudentId = {
    studentId:string
}
export type yearType = {
    year:string
}