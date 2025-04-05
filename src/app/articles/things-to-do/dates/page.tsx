import ArticleLayout from "@/components/ArticleLayout"
import ArticleGrid from "@/components/ArticleGrid"
import { thingstodoNavLinks } from "@/lib/constants/navigation"
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries"



export default async function LifestylePage() {

const articles = await getArticlesByTypes("dates")


  return (
    <ArticleLayout type="things To Do" navLinks={thingstodoNavLinks}>
      <ArticleGrid articles={articles} baseUrl="/articles" />
    </ArticleLayout>
  )
}

