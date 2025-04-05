import prisma from "@/config/prisma"
import type { ArticlePreview } from "../types"
/**
 * Fetches articles based on specified types
 * @param types - Single article type or array of article types
 * @param limit - Optional limit for number of articles to return
 * @returns Array of article previews
 */
export async function getArticlesByTypes(types: string | string[], limit?: number): Promise<ArticlePreview[]> {
  const typeCondition = Array.isArray(types) ? { in: types } : types

  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
        type: typeCondition,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        slug: true,
        coverURL: true,
        type: true,
      },
      ...(limit ? { take: limit } : {}),
    })

    return articles
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    throw new Error("Failed to fetch articles")
  }
}

/**
 * Fetches a single article by slug
 * @param slug - Article slug
 * @returns Article or null if not found
 */
export async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    })

    if (!article) return null

    return article
  } catch (error) {
    console.error("Failed to fetch article:", error)
    throw new Error("Failed to fetch article")
  }
}

/**
 * Fetches featured articles for the home page
 * @param type - Type of featured articles to fetch
 * @param limit - Number of articles to return
 * @returns Array of featured article previews
 */
export async function getFeaturedArticles(type = "news", limit = 4): Promise<ArticlePreview[]> {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
        type: type.includes("-") ? type : `${type}-news`,
        // Note: 'featured' field is mentioned in the comment but not in the schema
        // If you don't have a 'featured' field, you should remove this condition
        // featured: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        slug: true,
        coverURL: true,
        type: true,
      },
    })

    return articles
  } catch (error) {
    console.error("Failed to fetch featured articles:", error)
    throw new Error("Failed to fetch featured articles")
  }
}

/**
 * Fetches upcoming events for the home page
 * @param limit - Number of events to return
 * @returns Array of upcoming events
 */
export async function getUpcomingEvents(limit = 5) {
  try {
    const events = await prisma.article.findMany({
      where: {
        published: true,
        type: "upcoming-events",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        slug: true,
        coverURL: true,
        type: true,
      },
    })

    return events
  } catch (error) {
    console.error("Failed to fetch upcoming events:", error)
    throw new Error("Failed to fetch upcoming events")
  }
}

/**
 * Fetches places to visit for the home page
 * @param limit - Number of places to return
 * @returns Array of places to visit
 */
export async function getPlacesToVisit(limit = 3) {
  try {
    const places = await prisma.article.findMany({
      where: {
        published: true,
        type: "places-to-visit",
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        slug: true,
        coverURL: true,
        type: true,
      },
    })

    return places
  } catch (error) {
    console.error("Failed to fetch places to visit:", error)
    throw new Error("Failed to fetch places to visit")
  }
}

/**
 * Fetches places to eat for the home page
 * @param limit - Number of places to return
 * @returns Array of places to eat
 */
export async function getPlacesToEat(limit = 3) {
  try {
    const restaurants = await prisma.article.findMany({
      where: {
        published: true,
        type: "places-to-eat",
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        slug: true,
        coverURL: true,
        type: true,
      },
    })

    return restaurants
  } catch (error) {
    console.error("Failed to fetch places to eat:", error)
    throw new Error("Failed to fetch places to eat")
  }
}

/**
 * Fetches all home page content in a single function
 * @returns Object containing all home page content
 */
export async function getHomePageContent() {
  try {
    const [featuredNews, upcomingEvents, placesToVisit, placesToEat] = await Promise.all([
      getFeaturedArticles("news", 4),
      getUpcomingEvents(5),
      getPlacesToVisit(3),
      getPlacesToEat(3),
    ])

    return {
      featuredNews,
      upcomingEvents,
      placesToVisit,
      placesToEat,
    }
  } catch (error) {
    console.error("Failed to fetch home page content:", error)
    throw new Error("Failed to fetch home page content")
  }
}

