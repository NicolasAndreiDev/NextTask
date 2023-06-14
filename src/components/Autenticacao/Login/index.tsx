import { useRouter } from "next/navigation";
import FormPadrao from "../FormPadrao";

interface LoginProps{
    onClick: () => void;
}

export default function Login({onClick}: LoginProps) {
    const route = useRouter();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        route.push('/');
    }

    return(
        <FormPadrao onClick={onClick} onSubmit={handleSubmit} authUser={"Sign in"} buttonText={"Sign up"} textAuth={"Already have an account?"} title={"Create your account"} />
    )
}