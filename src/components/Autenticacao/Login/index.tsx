import { useRouter } from "next/navigation";
import FormPadrao from "../FormPadrao";
import { useState } from "react";

interface FormEvent {
    email: string,
    password: string,
    confirmPassword?: string
}

interface LoginProps{
    onClick: () => void;
}

export default function Login({onClick}: LoginProps) {
    const [values, setValues] = useState<FormEvent>({ email: "", password: "", confirmPassword: "" });
    const route = useRouter();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        route.push('/');
    }

    return(
        <FormPadrao setValuesUser={setValues} onClick={onClick} onSubmit={handleSubmit} authUser={"Sign in"} buttonText={"Sign up"} textAuth={"Already have an account?"} title={"Welcome Back"} />
    )
}