import Image from "next/image"

export default function Home() {
  return (
    <>
      <Image src={"/Logo.png"} alt={"NextTask"} height={54} width={54} />
      <p>Página Home</p>
    </>
  )
}
