import FormPadrao from "../FormPadrao";
import { useState } from "react";
import { USER_EXIST } from "@/graphql/UserExist";
import { useMutation } from "@apollo/client";
import { signIn } from 'next-auth/react';

interface FormEvent {
	email: string,
	password: string,
	confirmPassword?: string
}

interface LoginProps {
	onClick: () => void;
}

interface ErrMessageProps {
	err: boolean;
	textErr: string;
}

export default function Cadastro({ onClick }: LoginProps) {
	const [values, setValues] = useState<FormEvent>({ email: "", password: "", confirmPassword: "" });
	const [userLogin, { loading, error }] = useMutation(USER_EXIST);
	const [errMessage, setErrMessage] = useState<ErrMessageProps>({
		err: false,
		textErr: ""
	});

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
			signIn('email', {
				callbackUrl: '/',
			});
		}).catch((error) => {
			console.error(error);
		});
	}

	return (
		<FormPadrao
			textErr={errMessage.textErr}
			errExist={errMessage.err}
			setValuesUser={setValues}
			onClick={onClick}
			onSubmit={handleSubmit}
			authUser={"Sign in"}
			buttonText={"Sign up"}
			textAuth={"Already have an account?"}
			title={"Welcome Back"} />
	)
}