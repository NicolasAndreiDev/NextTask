import FormPadrao from "../FormPadrao";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/GetUser";

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

export default function Login({ onClick }: LoginProps) {
	const [values, setValues] = useState<FormEvent>({
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [errMessage, setErrMessage] = useState<ErrMessageProps>({
		err: false,
		textErr: ""
	});
	const { loading: loadingUsers, error: errData, data: dataUsers } = useQuery(GET_USERS);

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (values.email == "" || values.password == "") {
			return setErrMessage({ err: true, textErr: "Email ou senha incorretos!" })
		}

		if (dataUsers) {
			const allUsers = dataUsers.getUsers;
			const emailExists = allUsers.filter((user: any) => user.email === values.email);
			console.log(emailExists);
			if (emailExists.length === 0) {
				return setErrMessage({ err: true, textErr: "Email ou senha incorretos!" });
			}
		}

		signIn('credentials', {
			email: values.email,
			password: values.password,
			callbackUrl: '/'
		})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<FormPadrao
			textErr={errMessage.textErr}
			errExist={errMessage.err}
			setValuesUser={(value) => { setValues(value), setErrMessage({ err: false, textErr: "" }) }}
			onClick={onClick}
			onSubmit={handleSubmit}
			authUser={"Sign in"}
			buttonText={"Sign up"}
			textAuth={"Already have an account?"}
			title={"Welcome Back"} 
			/>
	)
}