
"use client";

import { useState } from "react";
import { Field, Input } from "@base-ui/react";
import { Button } from "@/components/ui/button";


const Loginpage: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleUsernameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPassword(e.target.value);
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ): void => {
        e.preventDefault();

        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-mono">

       
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">

           
                <h1 className="text-2xl font-bold text-center mb-6 font-[Caveat] ">
                    Login into the CRM
                </h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >

 
                    <Field.Root className="space-y-2">
                        <Field.Label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Your username
                        </Field.Label>

                        <Input
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter your username"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-50 "
                        />
                    </Field.Root>

 
                    <Field.Root className="space-y-2">
                        <Field.Label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Your password
                        </Field.Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </Field.Root>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        variant="default"
                        size="default"
                        className="w-full"
                    >
                        Login
                    </Button>

                </form>

            </div>
        </div>
    );
};

export default Loginpage;

