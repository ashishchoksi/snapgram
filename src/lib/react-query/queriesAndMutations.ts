import { INewUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createUserAccount, signInAccount } from '../appwrite/api';

/**
 * In order to use react-query
 * first wrap api call function with mutation and expose it as function
 * use your function
 */
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    });
}

export const useSignInAccount = () => {
    return useMutation({
        // user: {its schema}
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user)
    });
}