import { useRouter } from "next/navigation";
import FormPadrao from "../FormPadrao";
import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from "@/graphql/CreateUser";
import { GET_USERS } from "@/graphql/GetUser";

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
  const { loading: getUsersLoading, error: getUsersError, data: usersData } = useQuery(GET_USERS);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    console.log("Usuários:", usersData?.users);

    createUser({
      variables: {
        user: {
            email: values.email,
            password: values.password
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
