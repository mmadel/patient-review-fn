export interface USerRoleMap {
    name: string,
    urls: string[]
}
export const UserRoleURLS: USerRoleMap[] = [
    {
        name: "ADMIN",
        urls: ['dashboard', 'patient/find/clinic', 'clinic', 'user', 'report',]
    },
    {
        name: "USER",
        urls: ['patient/find/clinic/','/find/clinics/']
    },
    {
        name:"PERMITTED",
        urls: ['/feedback/api/patient/submit']
    }
]