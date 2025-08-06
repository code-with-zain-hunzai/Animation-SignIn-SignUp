"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { signUpSchema, type SignUpFormData } from "@/schema/auth";

interface SignUpFormProps {
  onToggleMode: () => void;
}

export function SignUpForm({ onToggleMode }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const watchedFields = watch();
  const password = watch("password");

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters", key: "length" },
    { regex: /[A-Z]/, text: "One uppercase letter", key: "uppercase" },
    { regex: /[a-z]/, text: "One lowercase letter", key: "lowercase" },
    { regex: /\d/, text: "One number", key: "number" },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      text: "One special character",
      key: "special",
    },
  ];

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random error for demo
      if (Math.random() > 0.8) {
        throw new Error("Email already exists");
      }

      console.log("Sign up successful:", data);
      reset();

      // Handle successful sign up (redirect, show success message, etc.)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Sign up failed. Please try again."
      );
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setValue("acceptTerms", checked, { shouldValidate: true });
  };

  return (
    <Card className="w-full max-w-md p-8 border-0 shadow-none">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">
            Sign up to get started with your account
          </p>
        </div>

        {submitError && (
          <Alert variant="destructive">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              className={`h-12 ${
                errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
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
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
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

            {/* Password Requirements */}
            {password && (
              <div className="space-y-1 mt-2">
                {passwordRequirements.map((req, index) => {
                  const isValid = req.regex.test(password);
                  return (
                    <div
                      key={req.key}
                      className="flex items-center space-x-2 text-sm"
                    >
                      {isValid ? (
                        <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-3 w-3 text-red-500 flex-shrink-0" />
                      )}
                      <span
                        className={`transition-colors ${
                          isValid ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`h-12 pr-10 ${
                  errors.confirmPassword
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("confirmPassword")}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled={isSubmitting}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={watchedFields.acceptTerms}
                onCheckedChange={handleTermsChange}
                disabled={isSubmitting}
                className={errors.acceptTerms ? "border-red-500" : ""}
              />
              <Label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I accept the{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800"
                  type="button"
                  disabled={isSubmitting}
                >
                  Terms and Conditions
                </Button>
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Button
            variant="link"
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-800 font-semibold"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </div>  
      </div>
    </Card>
  );
}
