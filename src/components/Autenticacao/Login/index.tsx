import FormPadrao from "../FormPadrao";
import { useState, useEffect } from "react";
import { signIn } from 'next-auth/react';
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "@/graphql/user/UserLogin";

interface FormEvent {
  email: string;
  password: string;
  confirmPassword?: string;
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
    confirmPassword: "",
  });
  const [errMessage, setErrMessage] = useState<ErrMessageProps>({
    err: false,
    textErr: "",
  });
  const [userLogin, { loading, error, data: UserData }] = useMutation(USER_LOGIN);

  useEffect(() => {
    if (UserData) {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserData]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (values.email === "" || values.password === "") {
      return setErrMessage({ err: true, textErr: "Email ou senha incorretos!" });
    }

    userLogin({
      variables: {
        user: {
          email: values.email,
          password: values.password,
        },
      },
    })
    .catch(() => {
      setErrMessage({ err: true, textErr: "Email ou senha incorretos!" });
    });
  }

  return (
    <FormPadrao
      textErr={errMessage.textErr}
      errExist={errMessage.err}
      setValuesUser={(values) => { setValues(values), setErrMessage({ err: false, textErr: "" })}}
      onClick={onClick}
      onSubmit={handleSubmit}
      authUser={"Sign in"}
      buttonText={"Sign up"}
      textAuth={"Already have an account?"}
      title={"Welcome Back"}
    />
  );
}
