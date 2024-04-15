import fs from "fs"
import path from "path"
import { CreateCustomer, Customer } from "../src/typings";

const dataFilePath = path.join(__dirname, 'db.json');

export const test = async () => {
    return {}
}

export const registerData = async (payload: CreateCustomer) => {
    const data = await readData();

    let customer: Customer = {
        ...payload,
        sharedKey: payload.name.replace(/\s/g, ""),
        createdAt: new Date().getTime()
    }

    data.push(customer);

    await writeData(data);
    return customer
}

export const updateData = async (payload: CreateCustomer) => {
    const data = await readData()

    let findIndex = data.findIndex((e) => e.businessId == payload.businessId)

    data[findIndex] = {
        ...data[findIndex],
        ...payload,
        sharedKey: payload.name.replace(/\s/g, ""),
        updatedAt: new Date().getTime()
    }

    await writeData(data);

    return findIndex
}

export async function readData() {
    try {
        const fileExists = await fs.existsSync(dataFilePath);
        if (!fileExists) {
            await fs.writeFileSync(dataFilePath, '[]');
        }

        const dataString = await fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(dataString) as Customer[];
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

export async function writeData(data: Customer[]) {
    try {
        await fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return true
    } catch (error) {
        console.error('Error writing data:', error);
        return false
    }
}