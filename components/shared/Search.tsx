"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(""); // Explicit string type

  // Memoize the debounced URL update logic
  const updateUrl = useCallback(() => {
    if (query.trim()) {
      const newUrl = formUrlQuery({
        searchParams: searchParams.toString(),
        key: "query",
        value: query,
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        searchParams: searchParams.toString(),
        keysToRemove: ["query"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [query, searchParams, router]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(updateUrl, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [updateUrl]);

  return (
    <div className="flex w-full rounded-[16px] border-2 border-purple-200/20 bg-white px-4 shadow-sm shadow-purple-200/15 md:max-w-96">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
        priority={false} // Better for non-critical images
      />
      <Input
        className="border-0 bg-transparent text-dark-600 w-full placeholder:text-dark-400 h-[50px] p-16-medium focus-visible:ring-offset-0 p-3 focus-visible:ring-transparent !important"
        placeholder="Search"
        value={query} // Controlled component
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};