import type { ArticleContent } from "@/lib/types";
import { getArticleBySlug } from "@/lib/actions/ArticleQueries";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleRenderer from "@/components/ArticleRender";
import RelatedArticles from "@/components/RelatedArticles";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";


export default async function ArticlePage({
  params,
}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <BackButton />
      <ArticleLayout type={article.type}>
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-4 ">
            <div className="max-w-5xl mx-auto">
              <ArticleRenderer content={article.content as ArticleContent} />
            </div>
          </div>
          <aside className="lg:col-span-1">{/* <TopStories /> */}</aside>
        </div>
      </ArticleLayout>
      <RelatedArticles currentSlug={slug} articleType={article.type} />
    </div>
  );
}
