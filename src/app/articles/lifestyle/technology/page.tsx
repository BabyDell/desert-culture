import ArticleLayout from "@/components/ArticleLayout"
import ArticleGrid from "@/components/ArticleGrid"
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries"
import { lifestyleNavLinks } from "@/lib/constants/navigation"

export default async function TechnologyPage() {
  const articles = await getArticlesByTypes("technology")

  return (
    <ArticleLayout type="lifestyle" navLinks={lifestyleNavLinks}>
      <ArticleGrid articles={articles} baseUrl="/articles" />
    </ArticleLayout>
  )
}

