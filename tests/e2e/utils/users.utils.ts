import { UsersApi, UserData } from '../api/users-api';

const usersApi = new UsersApi();

export async function createUserByApi(name: string, email: string, isActivated?: boolean, age?: number, notes?: string) {
    const userData: UserData = { name, email };

    if (age !== undefined) {
        userData.age = age;
    }
    if (notes !== undefined) {
        userData.notes = notes;
    }
    if (isActivated !== undefined) {
        userData.isActivated = isActivated;
    }

    return await usersApi.createUser(userData);
}

export async function deleteUserByApi(userId: string) {
    return await usersApi.deleteUser(userId);
}