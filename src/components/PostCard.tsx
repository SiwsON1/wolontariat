import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";
import { CategoryPill } from "@/components/CategoryPill";

type PostCardProps = {
  post: Post;
  variant?: "lead" | "standard" | "compact";
  priority?: boolean;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function PostCard({
  post,
  variant = "standard",
  priority = false,
}: PostCardProps) {
  if (variant === "compact") {
    return (
      <article className="post-card group border-t border-line pt-5">
        <h3 className="font-serif text-2xl leading-tight text-ink">
          <Link href={`/blog/${post.slug}`} className="story-link">
            {post.title}
          </Link>
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-ink-faint">
          <CategoryPill category={post.category} />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>{post.readingMinutes} min czytania</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
      </article>
    );
  }

  const isLead = variant === "lead";

  return (
    <article
      className={`post-card group grid gap-5 border-line ${
        isLead
          ? "md:grid-cols-[1.15fr_0.85fr] md:items-end"
          : "border-t pt-5"
      }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`image-reveal relative block overflow-hidden rounded-[8px] bg-paper-sunken ${
          isLead ? "aspect-[16/11]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes={isLead ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          priority={priority}
          className="post-card-image warm-cover"
        />
      </Link>
      <div>
        <h3
          className={`font-serif leading-tight text-ink ${
            isLead ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="story-link">
            {post.title}
          </Link>
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-ink-faint">
          <CategoryPill category={post.category} />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>{post.readingMinutes} min czytania</span>
        </div>
        <p
          className={`mt-4 leading-7 text-ink-soft ${
            isLead ? "text-lg" : "text-base"
          }`}
        >
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
