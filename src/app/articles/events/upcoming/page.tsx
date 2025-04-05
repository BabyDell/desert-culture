import ArticleLayout from "@/components/ArticleLayout"
import ArticleGrid from "@/components/ArticleGrid"
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries"
import { eventsNavLinks } from "@/lib/constants/navigation"

export default async function UpcomingEventsPage() {
  const articles = await getArticlesByTypes("upcoming-events")

  return (
    <ArticleLayout type="lifestyle" navLinks={eventsNavLinks}>
      <ArticleGrid articles={articles} baseUrl="/articles" />
    </ArticleLayout>
  )
}

