import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInValidation } from "@/lib/validations"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
 
const SignInForm = () => {

  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  async function onSubmit(values: z.infer<typeof SignInValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if (!session) {
      return toast({ title: "SignIn failed please try again!!!" });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({ title: "User is not logged in!!" });
    }
  }
  
  return (
    <Form {...form}>
      
      <div className="flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5">Login to account</h2>
        <p className="text-light-3 small-medium mt-2 md:base-regular">To use Snapgram, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            { isSigningIn ? 
            (<div className="flex-center gap-2"> <Loader /> Loading... </div>) : 
            (<div>Sign up</div>)}
          </Button>

          <p className="text-small-regular text-center text-light-2 mt-2">
            New here ? 
            <Link className="text-primary-500 ml-1" to="/sign-up">Signup</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignInForm