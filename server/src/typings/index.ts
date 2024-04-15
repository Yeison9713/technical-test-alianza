export interface Customer {
    sharedKey: string
    businessId: string
    email: string
    phoneNumber: string
    createdAt?: number
    updatedAt?: number
}

export interface CreateCustomer {
    businessId: string
    name: string
    email: string
    phoneNumber: string
}

export interface DefaultResponse {
    code: number
    message?: string
    data: any
}

export interface Search {
    sharedKey?: string
    name?: string
    email?: string
    phoneNumber?: string
    startDate?: string
    endDate?: string
}