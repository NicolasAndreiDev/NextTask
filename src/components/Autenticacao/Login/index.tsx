import { useRouter } from "next/navigation";
import FormPadrao from "../FormPadrao";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "@/graphql/CreateUser";
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

export default function Login({ onClick }: CadastroProps) {
  const route = useRouter();
  const [values, setValues] = useState<FormEvent>({ email: "", password: "" });
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [errMessage, setErrMessage] = useState<ErrMessageProps>({
    err: false,
    textErr: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (values.password != values.confirmPassword) {
      return
    }

    const hashedPassword = await bcrypt.hash(values.password, 10)

    createUser({
      variables: {
        user: {
          email: values.email,
          password: hashedPassword,
        }
      }
    }).then(() => {
      sign({ user: values.email}, 'chaveSecreta')
      route.push('/')
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
      inputExist={true}
      authUser={"Sign up"}
      buttonText={"Sign in"}
      textAuth={"Don't have account?"}
      title={"Create Your Account"}
    />
  )
}
