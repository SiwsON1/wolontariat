import Link from "next/link";
import type { Category } from "@/lib/content";

type CategoryPillProps = {
  category: Category;
  className?: string;
};

export function CategoryPill({ category, className = "" }: CategoryPillProps) {
  return (
    <Link
      href={`/kategoria/${category.slug}`}
      className={`category-pill ${className}`}
    >
      {category.name}
    </Link>
  );
}
