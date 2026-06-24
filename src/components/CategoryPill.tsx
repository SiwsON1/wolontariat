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
      className={`inline-flex w-fit items-center rounded-full bg-green-tint px-3 py-1 text-sm font-medium text-green-deep transition duration-200 ease-out hover:bg-clay-tint hover:text-clay-deep ${className}`}
    >
      {category.name}
    </Link>
  );
}
