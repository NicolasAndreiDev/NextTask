import AsideBar from "@/components/AsideBar"
import Header from "@/components/Header"
import styles from './layoutStyle.module.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.layout}>
        <Header />
        <div className={styles.infoBody}>
            <AsideBar />
            {children}
        </div>
      </body>
    </html>
  )
}
