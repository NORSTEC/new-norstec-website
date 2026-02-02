"use client";

import ChemtrailsFilter from "@/components/items/stripes/chemtrails/ChemtrailsFilter";
import { MediaType } from "@/types/media";
import React from "react";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>;
};

export default function FilterSection({ selected, setSelected }: Props) {
  return (
    <section className="section relative mobile-container no-snap">
      <ChemtrailsFilter selected={selected} setSelected={setSelected} />
    </section>
  );
}
