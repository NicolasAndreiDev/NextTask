import { Metadata } from "next";
import styles from './login.module.scss';
import AutenticacaoComponent from "@/components/Autenticacao";

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage() {
    return (
        <section className={styles.container}>
            <AutenticacaoComponent />
        </section>
    )
}