import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog Articles",
  description: "Read our latest blog articles",
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>{children}</div>
  )
}

