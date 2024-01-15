// zod is validation library
import * as z from 'zod';

// create schema for signup page
// zod take care of validation out-of-box
export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
})