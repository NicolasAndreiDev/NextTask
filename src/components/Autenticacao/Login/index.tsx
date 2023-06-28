import { useRouter } from "next/navigation";
import FormPadrao from "../FormPadrao";
import { useState } from "react";
import { USER_EXIST } from "@/graphql/UserExist";
import { useMutation } from "@apollo/client";

interface FormEvent {
	email: string,
	password: string,
	confirmPassword?: string
}

interface LoginProps {
	onClick: () => void;
}

export default function Login({ onClick }: LoginProps) {
	const route = useRouter();
	const [values, setValues] = useState<FormEvent>({ email: "", password: "", confirmPassword: "" });
	const [userLogin,{loading, error}] = useMutation(USER_EXIST);

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
	
		userLogin({
			variables: {
				user: {
					email: values.email,
					password: values.password,
				}
			}
		}).then(() => {
      route.push('/');
    }).catch((error) => {
      console.error(error);
    });
	}

	return (
		<FormPadrao
			setValuesUser={setValues}
			onClick={onClick}
			onSubmit={handleSubmit}
			authUser={"Sign in"}
			buttonText={"Sign up"}
			textAuth={"Already have an account?"}
			title={"Welcome Back"} />
	)
}