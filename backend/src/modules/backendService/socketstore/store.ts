let store = new Map<string, string>()

export const getSessionIdsByUserIds = (userid: string | string[]) => {
    const userids = typeof userid === "string" ? [userid] : [...userid]
    return [...store.entries()].filter((value) => userids.includes(value[1])).map((item) => item[0])
}

export const set = (key: string, value: string) => {
    store.set(key, value)
}

export const deleteKey = (key: string) => {
    store.delete(key)
}
