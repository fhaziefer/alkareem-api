import {prismaClient} from '../src/application/database.js'
import bcrypt from 'bcrypt'

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("test12345678", 10),
            token: "test"
        }
    })
}

export const removeTestAdmin = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "admin"
        }
    })
}

export const createTestAdmin = async () => {
    await prismaClient.user.create({
        data: {
            username: "admin",
            password: await bcrypt.hash("admin12345678", 10),
            token: "admin",
            role: "ADMIN"
        }
    })

}