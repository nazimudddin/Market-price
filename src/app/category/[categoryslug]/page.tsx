
import React from "react";
import CategoryProducts from "@/app/components/CategoryProducts";

interface CategorySlugPageProps {
  params: Promise<{
    categoryslug: string;
  }>;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const CategorySlugPage = async ({
  params,
}: CategorySlugPageProps) => {
  const { categoryslug } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryslug}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const data: Product[] = await res.json();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">

      {/* Category Header */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        {/* Category Information */}
        <div className="flex items-center gap-4">

          {/* Category Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50">
            <span className="text-4xl">
              {data[0]?.categoryIcon || "🛒"}
            </span>
          </div>

          {/* Category Name + Product Count */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {data[0]?.categoryNameBn || categoryslug}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              মোট {data.length} টি পণ্য
            </p>
          </div>
        </div>

      </div>

      {/* Products + Sort */}
      <CategoryProducts products={data} />

    </div>
  );
};

export default CategorySlugPage;

