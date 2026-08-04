import { CTAButton } from "./CTAButton";
import type { CmsBlock } from "@/types";

/**
 * Renders the structured `CmsBlock[]` body of a WordPress-native CMS page.
 * Each block type maps to a styled component consistent with the site's
 * Minimalism theme (black / white / gold).
 *
 * Inline text (paragraphs, headings, list items, quotes) is sanitised
 * WordPress HTML — links and emphasis made in the editor survive; anything
 * dangerous was stripped by the adapter.
 */
export function CmsPageRenderer({ blocks }: { blocks: CmsBlock[] }) {
  return (
    <div className="mx-auto max-w-4xl">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: CmsBlock }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 2 ? "h2" : block.level === 3 ? "h3" : "h4";
      return (
        <Tag
          className={
            block.level === 2
              ? "text-section text-black"
              : "mt-12 text-xl font-bold text-black sm:text-2xl"
          }
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    }

    case "paragraph":
      return (
        <p
          className="mt-6 text-base leading-relaxed text-mico-dark sm:text-lg"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case "image":
      return (
        <figure className="mt-10">
          <img
            src={block.src}
            alt={block.alt}
            className="aspect-[16/9] w-full object-cover"
          />
          {block.caption && (
            <figcaption className="mt-3 text-sm text-mico-mid">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          className={`mt-6 space-y-3 pl-5 text-base leading-relaxed text-mico-dark sm:text-lg ${
            block.ordered
              ? "list-decimal marker:font-semibold marker:text-mico-gold-deep"
              : "list-disc marker:text-mico-gold-deep"
          }`}
        >
          {block.items.map((item, index) => (
            <li
              key={index}
              className="[&_a]:font-semibold [&_a]:text-mico-gold-deep [&_a]:underline-offset-4 [&_a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ListTag>
      );
    }

    case "quote":
      return (
        <blockquote className="mt-12 border-l-4 border-mico-gold bg-mico-light/60 px-6 py-8 sm:px-10">
          <p
            className="text-lg font-medium leading-relaxed text-black sm:text-xl"
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
          {block.citation && (
            <cite className="mt-4 block text-sm not-italic text-mico-mid">
              — {block.citation}
            </cite>
          )}
        </blockquote>
      );

    case "buttons":
      return (
        <div className="mt-10 flex flex-wrap gap-3">
          {block.buttons.map((button, index) => (
            <CTAButton
              key={index}
              href={button.href}
              variant={button.variant ?? "gold"}
              size="md"
            >
              {button.label}
            </CTAButton>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="mt-10 overflow-x-auto rounded-sm border border-black/10">
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            {block.headers.length > 0 && (
              <thead>
                <tr className="bg-black text-white">
                  {block.headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-5 py-4 font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-black/10 odd:bg-white even:bg-mico-light/40"
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-5 py-4 align-top text-mico-dark">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "separator":
      return <hr className="my-14 border-black/10" />;

    default:
      return null;
  }
}
