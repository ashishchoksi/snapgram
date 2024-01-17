import { INewUser } from '@/types'; // or '../../types/index'
import { account, appwriteConfig, avatars, databases } from './config';
import { ID } from 'appwrite';

// make sdk call to create account in appwrite
export async function createUserAccount(user: INewUser) {
    try {
        // create auth account
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        // save to DB
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatars.getInitials(user.name)
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    name: string,
    email: string,
    imageUrl: URL
    username?: string,
}) {
    try {
        const newUser = databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}