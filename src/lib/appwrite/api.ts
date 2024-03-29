import { INewUser } from '@/types'; // or '../../types/index'
import { account, appwriteConfig, avatars, databases } from './config';
import { ID, Query } from 'appwrite';

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

export async function signInAccount(user: {
    email: string,
    password: string
}) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        ); 
        if (!currentAccount) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}
