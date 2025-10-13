import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AuthImage from "@/assets/images/authimg.png";
import { Link } from "react-router-dom";
import AppLogo from "@/components/custom/Logo";

const RegisterPage: React.FC = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <AppLogo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6">
              <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">Fill in the form below to create your account</p>
                </div>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                  <FieldDescription>We will not share your email with anyone else.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" required />
                  <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                  <Input id="confirm-password" type="password" required />
                </Field>
                <Field>
                  <Button type="submit">Create Account</Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                  <Button variant="outline" type="button">
                    Sign up with Google
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link to={"/login"}>Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={AuthImage} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default RegisterPage;
