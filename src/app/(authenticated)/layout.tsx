'use client'
import Header from "@/components/Header";
import styles from './layoutStyle.module.scss';
import { useSession } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession({
    required: true
  })

  return (
    <>
      {session ? <div className={styles.layout}>
        <Header />
        {children}
      </div> : ""}
    </>
  )
}
