import ArticleLayout from "@/components/ArticleLayout"
import ArticleGrid from "@/components/ArticleGrid"
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries"
import { eventsNavLinks } from "@/lib/constants/navigation"

  export default async function NewsPage() {
    const newsTypes = ["upcoming-events", "past-events", "event"]
    const articles = await getArticlesByTypes(newsTypes)
  
    return (
      <ArticleLayout type="news" navLinks={eventsNavLinks}>
        <ArticleGrid articles={articles} baseUrl="/articles" />
      </ArticleLayout>
    )
  }
  
