import type React from "react"
import Image from "next/image"
import type { JSX } from "react"
import type { ArticleContent, ArticleBlock } from "@/lib/types"
import Link from "next/link"

const ArticleRenderer: React.FC<{ content: ArticleContent }> = ({ content }) => {
  return (
    <article className="prose prose-lg max-w-none">
      {content.blocks.map((block, index) => renderBlock(block, index))}
    </article>
  )
}

function renderBlock(block: ArticleBlock, index: number) {
  // console.log(block)
  switch (block.type) {
    case "title":
      const TitleTag = `h${block.level}` as keyof JSX.IntrinsicElements
      return (
        <TitleTag key={index} className="mt-8 mb-6 text-2xl md:text-5xl lg:text-5xl font-bold text-black font-Playfair">
          {block.content}
        </TitleTag>
      )
    case "subtitle":
      const SubtitleTag = `h${block.level}` as keyof JSX.IntrinsicElements;
      return (
        <SubtitleTag
          key={index}
          className={`mt-6 mb-4 font-semibold text-gray-800 font-Playfair ${
            block.level === 2
              ? "text-3xl md:text-4xl lg:text-4xl"
              : block.level === 3
              ? "text-xl md:text-2xl lg:text-3xl"
              : "text-lg md:text-xl lg:text-2xl"
          }`}
        >
          {block.content}
        </SubtitleTag>
      );
    case "paragraph":
      return (
        <p key={index} className="mb-6 text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-serif">
          {Array.isArray(block.content)
            ? block.content.map((item, i) =>
                typeof item === "string" ? item : renderBlock(item as ArticleBlock, parseInt(`${index}${i}`)),
              )
            : block.content}
        </p>
      )
    case "bulletList":
      return (
        <ul key={index} className="list-disc pl-6 mb-6 text-base md:text-lg lg:text-xl text-gray-700">
          {block.items.map((item, i) => (
            <li key={i} className="mb-2">
              {typeof item === "string" ? item : renderBlock(item as ArticleBlock, parseInt(`${index}${i}`))}
            </li>
          ))}
        </ul>
      )
    case "image":
      return (
        <figure key={index} className="mb-8">
          <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
            <Image src={block.src || "/placeholder.svg"} alt={block.alt} fill className="rounded-lg object-cover" />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm md:text-base text-gray-600 mt-2">{block.caption}</figcaption>
          )}
        </figure>
      )
    case "conclusion":
      return (
           <p key={index} className="mb-6 text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            {Array.isArray(block.content)
              ? block.content.map((item, i) =>
                  typeof item === "string" ? item : renderBlock(item as ArticleBlock, parseInt(`${index}${i}`)),
                )
              : block.content}
          </p>
      )
    case "link":
      return (
        <span key={index}>
          {block.isExternal ? (
            <a href={block.url} target="_blank" rel="noopener noreferrer" className="underline">
              {block.text}
            </a>
          ) : (
            <Link href={block.url} className="underline">
              {block.text}
            </Link>
          )}
        </span>
      )
    default:
      return null
  }
}

export default ArticleRenderer

