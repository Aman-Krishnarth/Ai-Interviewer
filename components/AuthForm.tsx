"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { useState } from "react";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(5),
    });
};

function AuthForm({ type }: { type: FormType }) {
    const formSchema = authFormSchema(type);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            if (type === "sign-up") {
                console.log("SIGN UP");

                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if (!result?.success) {
                    toast.error(result?.message || "Something went wrong");
                    return;
                }

                toast.success("Account created successfully");
                router.push("/sign-in");
            } else {
                console.log("SIGN IN");

                const { email, password } = values;

                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const idToken = await userCredential.user.getIdToken();

                if (!idToken) {
                    toast.error("sign in failed");
                    return;
                }

                await signIn({
                    email,
                    idToken,
                });

                toast.success("Sign in Successfull");
                router.push("/");
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error("something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" width={38} height={32} alt="logo" />

                    <h2 className="text-primary-100">Prepare well</h2>
                </div>
                <h3 className="text-center">Practice for interviews with AI</h3>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4 form"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name={"name"}
                                label="Name"
                                placeholder="What should we call you?"
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="What is your email?"
                            type="email"
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="What is your password?"
                            type="password"
                        />

                        <Button
                            className="btn"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Loading...
                                </>
                            ) : isSignIn ? (
                                "Sign in"
                            ) : (
                                "Create an account"
                            )}
                        </Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Already have an account?"}

                    <Link
                        href={isSignIn ? "/sign-up" : "/sign-in"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {isSignIn ? "Sign up" : "Sign in"}
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default AuthForm;
