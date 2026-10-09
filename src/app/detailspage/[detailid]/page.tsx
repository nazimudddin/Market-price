"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Product {
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
  change: PriceChange;
  markets: Market[];
}

const DetailPage = ({
  params,
}: {
  params: Promise<{ detailid: string }>;
}) => {
  const { detailid } = use(params);

  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?slug=${detailid}`
        );

        if (!res.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি");
        }

        const result = await res.json();

        let product: Product | undefined;

        if (Array.isArray(result)) {
          product = result.find(
            (item: Product) => item.slug === detailid
          );
        } else if (Array.isArray(result.products)) {
          product = result.products.find(
            (item: Product) => item.slug === detailid
          );
        } else {
          product = result;
        }

        if (!product || !product.nameBn) {
          throw new Error("পণ্যটি খুঁজে পাওয়া যায়নি");
        }

        setData(product);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "কিছু একটা সমস্যা হয়েছে"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [detailid]);

  // বাংলা সংখ্যায় টাকা দেখানোর জন্য
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 2,
    }).format(price);
  };

  // লোডিং অবস্থা
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <p className="text-lg font-medium text-gray-600">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </div>
    );
  }

  // Error অবস্থা
  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-red-600">
            {error || "পণ্য পাওয়া যায়নি"}
          </h2>

          <p className="mt-2 text-gray-500">
            অনুগ্রহ করে আবার চেষ্টা করো।
          </p>
        </div>
      </div>
    );
  }

  // বাজারগুলোর সর্বনিম্ন ও সর্বোচ্চ দাম
  const minMarketPrice =
    data.markets?.length > 0
      ? Math.min(...data.markets.map((market) => market.min))
      : data.today;

  const maxMarketPrice =
    data.markets?.length > 0
      ? Math.max(...data.markets.map((market) => market.max))
      : data.today;

  // সব বাজারের গড় দাম
  const averagePrice =
    data.markets?.length > 0
      ? data.markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / data.markets.length
      : data.today;

  // দাম বাড়ছে, কমছে নাকি অপরিবর্তিত
  const isUp = data.change?.dir === "up";
  const isDown = data.change?.dir === "down";

  const changeColor = isUp
    ? "text-red-500"
    : isDown
      ? "text-green-600"
      : "text-gray-500";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "●";

  const changeLabel = isUp
    ? "দাম বেড়েছে"
    : isDown
      ? "দাম কমেছে"
      : "দাম অপরিবর্তিত";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#26332b] sm:px-6">
      <div className="mx-auto max-w-6xl space-y-5">

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-5 rounded-xl border border-[#e0e9e0] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef4ee]">
              {/* {data.image ? (
                <Image
                  src={data.image}
                  alt={data.nameBn}
                  width={80}
                  height={80}
                  unoptimized
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <span className="text-3xl">🛒</span>
              )} */}
              <p className="text-4xl">{data.image}</p>
              
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">
                {data.categoryNameBn}
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                {data.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {data.unit}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                সর্বশেষ বাজারদর: {formatPrice(data.today)} টাকা
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="min-w-40 rounded-xl bg-[#eef4ee] px-6 py-4 text-center">
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <h2 className="my-1 text-3xl font-bold">
              {formatPrice(data.today)}
            </h2>

            <p className="text-sm text-gray-500">
              টাকা / {data.unit}
            </p>

            <p className={`mt-2 text-sm font-semibold ${changeColor}`}>
              {changeIcon} {formatPrice(data.change?.pct ?? 0)}%
            </p>

            <p className={`text-xs ${changeColor}`}>
              {changeLabel}
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-xl border border-[#e0e9e0] bg-[#fbfdfb] p-5">
          <h2 className="mb-4 text-lg font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* Minimum Price */}
            <div className="rounded-xl border border-[#e0e9e0] p-4">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <h3 className="mt-1 text-2xl font-bold text-green-600">
                {formatPrice(minMarketPrice)}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বনিম্ন দাম
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-[#e0e9e0] p-4">
              <p className="text-sm text-gray-500">
                সর্বমোট গড় দাম
              </p>

              <h3 className="mt-1 text-2xl font-bold text-red-500">
                {formatPrice(averagePrice)}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                সব বাজারের গড় মূল্য
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-xl border border-[#e0e9e0] p-4">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <h3 className="mt-1 text-2xl font-bold text-green-600">
                {formatPrice(maxMarketPrice)}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বোচ্চ দাম
              </p>
            </div>

          </div>
        </section>

        {/* Market Price Table */}
        <section className="rounded-xl border border-[#e0e9e0] bg-[#fbfdfb] p-5">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                মোট {formatPrice(data.markets?.length ?? 0)} টি বাজারের তথ্য
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#e0e9e0]">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead className="bg-[#f5f8f5] text-gray-500">
                <tr>
                  <th className="px-4 py-4 font-medium">
                    বাজার
                  </th>

                  <th className="px-4 py-4 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-4 py-4 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-4 text-right font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-4 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.markets?.length > 0 ? (
                  data.markets.map((market, index) => {
                    const marketAverage =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-t border-[#dce5dc] ${
                          index % 2 === 0
                            ? "bg-[#fbfdfb]"
                            : "bg-[#f0f5f0]"
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-medium">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right font-semibold">
                          {formatPrice(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      এই পণ্যের বাজারভিত্তিক কোনো তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
};

export default DetailPage;