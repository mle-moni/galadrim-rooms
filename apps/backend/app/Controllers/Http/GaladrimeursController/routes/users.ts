import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../../../Models/User'

export const usersRoute = async (_params: HttpContextContract) => {
    const rawUsers = await User.all()
    return rawUsers.map(({ id, username, imageUrl }) => ({ id, username, imageUrl }))
}
