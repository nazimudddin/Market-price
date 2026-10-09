"use client"
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn, signUp, useSession } from "../lib/auth-client";
import { toast } from "react-toastify";
import { SiAlwaysdata } from "react-icons/si";

const SignUp = () => {
const { data: session, isPending } = useSession();

const login = async () => {
  const { error } = await signIn.social({
    provider: "google",
    callbackURL: "/",
  });

  if (error) {
    toast.error(error.message || "Google login failed!");
  }
};

const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();

const formData = new FormData(e.currentTarget);

const data: Record<string, string> = {};

formData.forEach((value, key) => {
data[key] = value.toString();
});

const { data: resdata, error } = await signUp.email({
name: data.name,
email: data.email,
password: data.password,
callbackURL: "/",
});


if (error) {
toast.error(error.message || "Account creation failed!");
return;
}

toast.success(`${data.name}, you have successfully created an account!`);

console.log(resdata);
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-8">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">
              Create Account
            </h1>
            <p className="text-base-content/60 mt-2">
              Sign up to get started with BazarDor
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
              name="name"
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
              name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
              name="password"
                type="password"
                placeholder="Create a password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-base-content/50">OR</div>

          {/* Google Sign Up */}
          <button
          onClick={login}
            type="button"
            className="btn btn-outline w-full gap-3"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          {/* GitHub Sign Up */}
          <button
            type="button"
            className="btn btn-neutral w-full gap-3"
          >
            <FaGithub className="text-xl" />
            Sign up with GitHub
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm mt-5">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;

