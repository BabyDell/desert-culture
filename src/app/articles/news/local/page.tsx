import ArticleLayout from "@/components/ArticleLayout"
import ArticleGrid from "@/components/ArticleGrid"
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries"
import { newsNavLinks } from "@/lib/constants/navigation"

export default async function LocalNewsPage() {
  const articles = await getArticlesByTypes("local-news")

  return (
    <ArticleLayout type="news" navLinks={newsNavLinks}>
      <ArticleGrid articles={articles} baseUrl="/articles" />
    </ArticleLayout>
  )
}

