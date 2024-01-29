export interface USerRoleMap {
    name: string,
    urls: string[]
}
export const UserRoleURLS: USerRoleMap[] = [
    {
        name: "ADMIN",
        urls: ['performance', 'clinic','user','reports']
    },
    {
        name: "USER",
        urls: ['clinic']
    },
    {
        name: "PERMITTED",
        urls: ['feedback', 'authentication']
    }
]