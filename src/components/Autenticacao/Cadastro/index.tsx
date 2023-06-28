import { useRouter } from "next/navigation";
import FormPadrao from "../FormPadrao";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "@/graphql/CreateUser";
import bcrypt from 'bcryptjs';


interface FormEvent {
  email: string,
  password: string,
  confirmPassword?: string
}

interface CadastroProps {
  onClick: () => void;
}

export default function Cadastro({ onClick }: CadastroProps) {
  const route = useRouter();
  const [values, setValues] = useState<FormEvent>({ email: "", password: "" });
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if(values.password != values.confirmPassword) {
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
      inputExist={true}
      authUser={"Sign up"}
      buttonText={"Sign in"}
      textAuth={"Don't have account?"}
      title={"Create Your Account"}
    />
  )
}
