import Header from "@/components/Header";
import Required from "./required";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Required>
      <Header />
      {children}
    </Required>
  )
}
