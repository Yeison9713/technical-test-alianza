import { readData, registerData, test, updateData } from "../../services";
import { CreateCustomer, DefaultResponse, Search } from "../typings";

export class CustomersApplication {
    public static async create(payload: CreateCustomer): Promise<DefaultResponse> {
        try {
            const { businessId, name, email, phoneNumber } = payload

            const customers = await readData()

            const existsCustomer = customers.find((e) => e.businessId == businessId)
            let customer = {}

            if (existsCustomer) {
                customer = await updateData({
                    businessId, name, email, phoneNumber
                })
            } else {
                customer = await registerData({
                    businessId, name, email, phoneNumber
                })
            }


            return ({
                code: 200,
                data: customer
            } as DefaultResponse)
        } catch (error) {
            console.trace("[Error creating customer]: ", error)
            return ({
                code: 500,
                message: "Error creating customer"
            } as DefaultResponse)
        }
    }

    public static async findMany(payload: Search): Promise<DefaultResponse> {
        try {
            const { sharedKey } = payload

            let customers = await readData()

            if (sharedKey) {
                customers = customers.filter((e) => e.sharedKey == sharedKey)
            }

            return ({
                code: 200,
                data: customers
            } as DefaultResponse)
        } catch (error) {
            console.trace("[Error querying customer]: ", error)
            return ({
                code: 500,
                message: "Error querying customers"
            } as DefaultResponse)
        }
    }
}