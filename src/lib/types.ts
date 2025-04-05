
export type ArticleContent = {
  blocks: ArticleBlock[]
}

export type ArticleBlock =
  | TitleBlock
  | SubtitleBlock
  | ParagraphBlock
  | BulletListBlock
  | ImageBlock
  | ConclusionBlock
  | LinkBlock

export type TitleBlock = {
  type: "title"
  content: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export type SubtitleBlock = {
  type: "subtitle"
  content: string
  level: 2 | 3 | 4 | 5 | 6
}

export type ParagraphBlock = {
  type: "paragraph"
  content: (string | LinkBlock)[]
}

export type BulletListBlock = {
  type: "bulletList"
  items: (string | LinkBlock)[]
}

export type ImageBlock = {
  type: "image"
  src: string
  alt: string
  caption?: string
}

export type ConclusionBlock = {
  type: "conclusion"
  content: (string | LinkBlock)[]
}

export type LinkBlock = {
  type: "link"
  url: string
  text: string
  isExternal: boolean
}

export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[]

export type Article = {
  id: string
  title: string
  slug: string
  coverURL: string | null
  imageURL: string[]
  content: JsonValue
  description: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  type: string
  headline: boolean
}

// Define a type for article previews
export type ArticlePreview = Pick<Article, "id" | "title" | "description" | "createdAt" | "slug" | "coverURL" | "type">

