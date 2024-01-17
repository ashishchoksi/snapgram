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
import { SignupValidation } from "@/lib/validations"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
 
const SignupForm = () => {

  const { toast } = useToast();
  const isLoading: boolean = false;

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
  })

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const user = await createUserAccount(values);
    if (!user) {
      return toast({
        title: "Scheduled: Catch up"
      });
    }    
  }
  
  return (
    <Form {...form}>
      
      <div className="flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5">Create new account</h2>
        <p className="text-light-3 small-medium mt-2 md:base-regular">To use Snapgram, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isLoading ? 
            (<div className="flex-center gap-2"> <Loader /> Loading... </div>) : 
            (<div>Sign up</div>)}
          </Button>

          <p className="text-small-regular text-center text-light-2 mt-2">
            Already have an account ? 
            <Link className="text-primary-500 ml-1" to="/sign-in">Login</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm