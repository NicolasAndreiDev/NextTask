import FormPadrao from "../FormPadrao";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "@/graphql/user/CreateUser";
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormEvent {
  email: string,
  password: string,
  confirmPassword?: string
}

interface CadastroProps {
  onClick: () => void;
}

interface ErrMessageProps {
  err: boolean;
  textErr: string;
}

export default function Cadastro({ onClick }: CadastroProps) {
  const [values, setValues] = useState<FormEvent>({ email: "", password: "" });
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [errMessage, setErrMessage] = useState<ErrMessageProps>({
    err: false,
    textErr: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!emailRegex.test(values.email)) {
      return setErrMessage({err: true, textErr: 'Email inválido!'})
    }

    if (values.email == "" || values.password == "" || values.confirmPassword == "") {
      return setErrMessage({err: true, textErr: 'Preencha todos os campos!'})
    }

    if (values.password.length <= 5) {
      return setErrMessage({err: true, textErr: 'A senha precisa ter pelo menos 6 caracteres!'})
    }

    if (values.password != values.confirmPassword) {
      return setErrMessage({err: true, textErr: 'As senhas digitadas não coincidem!'})
    }

    const [username] = values.email.split('@');
    const formattedUsername = username.replace(/^\w/, (c) => c.toUpperCase());
    const hashedPassword = await bcrypt.hash(values.password, 10)

    createUser({
      variables: {
        user: {
          email: values.email,
          username: formattedUsername,
          password: hashedPassword,
        }
      }
    }).then(() => {
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      })
    }).catch((err) => {
      setErrMessage({err: true, textErr: err});
    });
  }

  return (
    <FormPadrao
      textErr={errMessage.textErr}
      errExist={errMessage.err}
      setValuesUser={(values) => {setValues(values), setErrMessage({err: false, textErr: ""})}}
      onClick={onClick}
      onSubmit={handleSubmit}
      inputExist={true}
      authUser={"Sign up"}
      buttonText={"Sign in"}
      textAuth={"Don't have account?"}
      title={"Create Your Account"}
    />
  )
}
