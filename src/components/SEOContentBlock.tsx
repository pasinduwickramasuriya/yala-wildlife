import Link from "next/link";
import { FC } from "react";

interface SEOContentBlockProps {
  title: string;
  description: string;
  keywords: string[];
  relatedLinks: {
    title: string;
    href: string;
  }[];
  showKeywords?: boolean;
}

const SEOContentBlock: FC<SEOContentBlockProps> = ({
  title,
  description,
  keywords,
  relatedLinks,
  showKeywords = false,
}) => {
  return (
    <div className="prose max-w-none mb-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-2xl text-green-400">
        {title}
      </h1>
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      {showKeywords && (
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Related Content
        </h2>
        <ul className="mt-4 space-y-2">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SEOContentBlock;
