import { Request, Response } from "express";
import { CustomersApplication } from "./application";
import { Search } from "../typings";

export class CustomerHandle {
    public static async create(req: Request, res: Response): Promise<any> {
        try {
            const {
                businessId,
                name,
                email,
                phoneNumber
            } = req.body

            const response = await CustomersApplication.create({
                businessId,
                name,
                email,
                phoneNumber
            })

            return res.status(response.code).json(response)
        } catch (error) {
            return res.status(500).json({ message: "Error creating customer" })
        }
    }

    public static async findMany(req: Request, res: Response): Promise<any> {
        try {
            const { search }: { search?: string } = req.query || ""

            const response = await CustomersApplication.findMany({ sharedKey: search || "" })

            return res.status(response.code).json(response)
        } catch (error) {
            return res.status(500).json({ message: "Error querying customers" })
        }
    }
}