import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"

interface Article {
  id: string
  title: string
  description: string
  createdAt: Date
  slug: string
  coverURL: string | null
  type: string
}

interface ArticleGridProps {
  articles: Article[]
  baseUrl: string
}

export default function ArticleGrid({ articles, baseUrl }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64  rounded-lg">
        <Image
          src="/img/CCAssets/Logo.jpg"
          alt="No articles"
          width={100}
          height={100}
          className="mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">No articles yet</h2>
        <p className="text-gray-500">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {articles.map((article) => (
        <Link key={article.id} href={`${baseUrl}/${article.slug}`}>
          <div className="flex flex-col h-full group">
            <div className="relative w-full h-48 mb-2 ">
              {article.coverURL && (
                <Image
                  src={article.coverURL || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-opacity group-hover:opacity-90"
                />
              )}
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-semibold font-Playfair mb-1 text-black group-hover:underline">{article.title}</h3>
              <span className="text-sm text-gray-500 mb-1 capitalize">
                {format(new Date(article.createdAt), "MMM d, yyyy")} • {article.type}
              </span>
              <p className="text-gray-900 font-medium flex-grow">{article.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

