import { useRouter } from "next/navigation";
import FormPadrao from "../FormPadrao";

interface CadastroProps{
    onClick: () => void;
}

export default function Cadastro({onClick}: CadastroProps) {
    const route = useRouter();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        route.push('/');
    }

    return(
        <FormPadrao onClick={onClick} onSubmit={handleSubmit} inputExist={true} authUser={"Sign up"} buttonText={"Sign in"} textAuth={"Don't have account?"} title={"Create Your Account"} />
    )
}