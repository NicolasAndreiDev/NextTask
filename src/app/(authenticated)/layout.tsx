import Header from "@/components/Header";
import styles from './layoutStyle.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  )
}
