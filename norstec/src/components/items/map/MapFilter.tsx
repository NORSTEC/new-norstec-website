"use client";

import React from "react";
import Button from "@/components/items/Button";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "incubator", label: "Incubators" },
  { id: "non-incubator", label: "Non-incubators" },
] as const;

export type MapFilterId = (typeof FILTERS)[number]["id"];

type MapFilterProps = {
  value: MapFilterId;
  onChange: (value: MapFilterId) => void;
  className?: string;
};

export default function MapFilter({ value, onChange, className }: MapFilterProps) {
  return (
    <div className={"flex w-fit items-center gap-3 rounded-full p-1 " + (className ?? "")}>
      {FILTERS.map((filter) => (
        <Button key={filter.id} active={filter.id === value} onClick={() => onChange(filter.id)}>
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
