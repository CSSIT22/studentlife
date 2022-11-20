export type createCommunity = {
    communityName: string
    communityOwnerId: any
    communityDesc: string
    communityPrivacy: boolean
    communityPhoto?: Blob
}

export type editCommunity = {
    communityId: string
    communityName: string
    communityDesc: string
    communityPrivacy: boolean
    communityPhoto?: Blob
}

