import ArticleLayout from "@/components/ArticleLayout"
import ArticleGrid from "@/components/ArticleGrid"
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries"
import { lifestyleNavLinks } from "@/lib/constants/navigation"

export default async function ShoppingPage() {
  const articles = await getArticlesByTypes("shopping")

  return (
    <ArticleLayout type="lifestyle" navLinks={lifestyleNavLinks}>
      <ArticleGrid articles={articles} baseUrl="/articles" />
    </ArticleLayout>
  )
}

