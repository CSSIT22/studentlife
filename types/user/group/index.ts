export type Community = {
    name: string
    id: number
    owner: string
    desc?: string
    privacy: boolean
    coverPhoto?: Blob
}