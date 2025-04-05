import { ArrowRight } from "lucide-react";
import { Article } from "@/lib/types";
import prisma from "@/config/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function Headline() {
  // Fetch the headline article
  const headlineArticle = await prisma.article.findFirst({
    where: {
      published: true,
      headline: true,
    },
  });

  // Fetch the 3 most recent articles, excluding the headline article
  const recentArticles = (await prisma.article.findMany({
    where: {
      published: true,
      id: { not: headlineArticle?.id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  })) as Article[];

  // If no headline article exists, use the most recent article as the headline
  const mainArticle = headlineArticle || recentArticles[0];
  const topStories = headlineArticle ? recentArticles : recentArticles.slice(1);

  return (
    <>
      <main className="max-w-7xl w-full mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {mainArticle && (
              <Link href={`/articles/${mainArticle.slug}`}>
                <article className="lg:border-none border-b border-gray-200 pb-8 group">
                  <Image
                    src={
                      mainArticle.coverURL ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    width={600}
                    height={400}
                    alt="Headline story"
                    className="w-full md:h-[400px] h-[300px] object-cover mb-4"
                  />
                  <h2 className="text-3xl font-bold mb-2 font-Playfair group-hover:underline">
                    {mainArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-4 font-Poly">
                    {mainArticle.description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center font-Poly group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </button>
                </article>
              </Link>
            )}
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 font-Playfair">
              Top Stories
            </h3>
            <div className="space-y-8">
                {topStories.map((article) => (
                <article key={article.id} className="group">
                  <Link
                  href={`/articles/${article.slug}`}
                  className="flex items-start"
                  >
                  <Image
                    width={600}
                    height={400}
                    src={
                    article.coverURL ||
                    "/placeholder.svg?height=96&width=96"
                    }
                    alt={`Top story ${article.title}`}
                    className="w-32 md:w-24 h-32 md:h-24 object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold leading-tight mb-2 font-Playfair group-hover:underline">
                    {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm font-Poly">
                    {article.description}
                    </p>
                  </div>
                  </Link>
                </article>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
