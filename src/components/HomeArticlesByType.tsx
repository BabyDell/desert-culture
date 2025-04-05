import ArticleGrid from "./ArticleGrid";
import { getArticlesByTypes } from "@/lib/actions/ArticleQueries";

export default async function HomeArticlesByType({ type }: { type: string }) {

    const articles = await getArticlesByTypes(type, 3);

  return (
    <>
      <div className="mb-2">
        <h1 className="text-5xl text-black font-magioline capitalize">
          {type}
        </h1>
      </div>
      <hr className="border-t-2 border-black w-full mb-4" />
      <ArticleGrid articles={articles} baseUrl="articles" />
    </>
  );
}
