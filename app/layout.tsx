import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Augen Tec',
  description: 'Si lo que buscas es montar un laboratorio óptico o, si bien, estás evaluando opciones para renovar el que ya tienes, te ofrecemos la respuesta más práctica del mercado: un sistema total que te simplificará la operación. Un equipo de máquinas eficientes por sí mismas que, juntas, completan un proceso ideal, fluido y bien coordinado. Porque no necesitas un par de máquinas nuevas que te darán nuevos problemas. Necesitas un sistema que solo te dé soluciones.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
