import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRegister } from "@/hooks/useRegister";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth";
import { AuthLayout } from "./components/AuthLayout";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const registerMutation = useRegister();
  const { isAuthenticated } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues): void => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthLayout>
      <div className="max-w-md w-full px-8">
        <Link to="/login">
          <ArrowLeft className="text-gray-800 hover:text-gray-600 h-6 w-6 my-4" />
        </Link>

        <h1 className="text-xl font-bold text-gray-800">Welcome to Jobtrackr</h1>
        <p className="mt-1 text-sm text-gray-600">
          Create your account and start tracking applications
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input type="email" placeholder="john@example.com" {...field} />
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
                    <PasswordInput placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {registerMutation.isError && (
              <p className="text-sm text-red-600">{registerMutation.error.message}</p>
            )}

            <Button type="submit" disabled={registerMutation.isPending} className="w-full">
              {registerMutation.isPending ? "Creating account..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-800 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
