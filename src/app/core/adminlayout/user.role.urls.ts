export interface USerRoleMap {
    name: string,
    urls: string[]
}
export const UserRoleURLS: USerRoleMap[] = [
    {
        name: "ADMIN",
        urls: ['performance', 'clinic','user']
    },
    {
        name: "USER",
        urls: []
    },
    {
        name: "PERMITTED",
        urls: ['feedback', 'authentication']
    }
]