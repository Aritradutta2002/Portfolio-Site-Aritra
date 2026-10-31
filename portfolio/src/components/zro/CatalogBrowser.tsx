"use client";

import { useState } from "react";
import {
  PROJECTS,
  type CatalogCategory,
  type SystemCategory,
} from "@/data/portfolioCatalog";
import { CatalogFilterBar } from "./CatalogFilterBar";
import { CatalogEntry } from "./CatalogEntry";

export function CatalogBrowser() {
  const [selectedCategory, setSelectedCategory] =
    useState<SystemCategory>("ALL");

  const projects =
    selectedCategory === "ALL"
      ? PROJECTS
      : PROJECTS.filter((item) =>
          item.categories.includes(selectedCategory as CatalogCategory)
        );

  return (
    <>
      <CatalogFilterBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        totalCount={projects.length}
      />

      <div className="space-y-6">
        {projects.map((item, index) => (
          <CatalogEntry key={item.id} item={item} index={index} />
        ))}
      </div>
    </>
  );
}
