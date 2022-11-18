export type createCommunity = {
    communityName: string
    communityOwnerId: any
    communityDesc: string
    communityPrivacy: boolean
    communityPhoto?: Blob
}

export type getCommunity = {
    name: string
    id: string
    owner: string
    desc?: string
    privacy: boolean
    coverPhoto?: Blob
}