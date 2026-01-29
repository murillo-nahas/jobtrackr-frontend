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

import { useAuth } from "@/contexts/auth-context";
import { useLogin } from "@/hooks/use-login";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { AuthLayout } from "./components/auth-layout";

export default function Login() {
  const loginMutation = useLogin();
  const { isAuthenticated } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues): void => {
    loginMutation.mutate(data);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthLayout>
      <div className="max-w-md w-full px-8">
        <div className="flex items-center justify-center">
          <img src="/jobtrackr-variant.png" className="w-48 cursor-pointer" alt="Jobtrackr" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">Sign in to continue tracking your applications</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
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

            {loginMutation.isError && (
              <p className="text-sm text-red-600">{loginMutation.error.message}</p>
            )}

            <Button type="submit" disabled={loginMutation.isPending} className="w-full">
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-gray-800 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
