"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { signInSchema, type SignInFormData } from "@/schema/auth";

interface SignInFormProps {
  onToggleMode: () => void;
}

export function SignInForm({ onToggleMode }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const watchedFields = watch();

  const onSubmit = async (data: SignInFormData) => {
    setSubmitError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random error for demo
      if (Math.random() > 0.7) {
        throw new Error("Invalid credentials");
      }

      console.log("Sign in successful:", data);
      reset();

      // Handle successful sign in (redirect, etc.)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Sign in failed. Please try again."
      );
    }
  };

  return (
    <Card className="w-full max-w-md p-8 border-0 shadow-none">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {submitError && (
          <Alert variant="destructive">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              className={`h-12 ${
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <div className="relative">
              <Input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`h-12 pr-10 ${
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("password")}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled={isSubmitting}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="text-sm text-blue-600 hover:text-blue-800 p-0"
              disabled={isSubmitting}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">{"Don't have an account?"}</p>
          <Button
            variant="link"
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-800 font-semibold"
            disabled={isSubmitting}
          >
            Create Account
          </Button>
        </div>
      </div>
    </Card>
  );
}
