import { INewUser } from '@/types'; // or '../../types/index'
import { account } from './config';
import { ID } from 'appwrite';

// make sdk call to create account in appwrite
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        return newAccount;
    } catch (error) {
        console.log(error);
        return error;
    }
}