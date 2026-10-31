"use client";

import { useState } from "react";
import {
  CATALOG_ITEMS,
  type CatalogCategory,
  type SystemCategory,
} from "@/data/portfolioCatalog";
import { CatalogFilterBar } from "./CatalogFilterBar";
import { CatalogEntry } from "./CatalogEntry";

export function CatalogBrowser() {
  const [selectedCategory, setSelectedCategory] =
    useState<SystemCategory>("ALL");

  const systems =
    selectedCategory === "ALL"
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) =>
          item.categories.includes(selectedCategory as CatalogCategory)
        );

  return (
    <>
      <CatalogFilterBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        totalCount={systems.length}
      />

      <div className="space-y-6">
        {systems.map((item, index) => (
          <CatalogEntry key={item.id} item={item} index={index} />
        ))}
      </div>
    </>
  );
}
