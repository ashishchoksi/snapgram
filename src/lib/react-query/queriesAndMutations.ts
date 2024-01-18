import { INewUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createUserAccount } from '../appwrite/api';

/**
 * In order to use react-query
 * first wrap api call function with mutation and expose it as function
 * use your function
 */
export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    });
}


