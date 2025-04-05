import ArticleLayout from "@/components/ArticleLayout"
import ArticleGrid from "@/components/ArticleGrid"
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries"
import { newsNavLinks } from "@/lib/constants/navigation"

export default async function NewsPage() {
  const newsTypes = ["local-news", "global-news", "tech-news", "finance-news"]
  const articles = await getArticlesByTypes(newsTypes)

  return (
    <ArticleLayout type="news" navLinks={newsNavLinks}>
      <ArticleGrid articles={articles} baseUrl="/articles" />
    </ArticleLayout>
  )
}

