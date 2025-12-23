"use client";

import Link from "next/link";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import Button from "@/components/items/Button";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";

export default function NotFound() {
    return (
        <div className="relative chemtrails-right lg:min-h-screen">
            <ChemtrailsRight />

            <main className="mobile-container flex items-center h-full justify-center">
                <div className="w-full">
                    <h1 className="text-[4.5rem] leading-none md:text-[6.5rem] lg:text-[8rem] font-light text-moody tracking-tight">
                        404
                    </h1>

                    <div className="mt-6 max-w-2xl">
                        <h2 className="text-h2 text-moody">
                            Page not found
                            <span aria-hidden className="star-inline" />
                        </h2>

                        <p className="mt-3  leading-relaxed">
                            The page you are looking for either moved, never existed,
                            or is hiding exceptionally well.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link href="/">
                            <Button active onClick={() => {}}>
                                Return to homepage
                            </Button>
                        </Link>

                        <Button onClick={() => window.history.back()}>
                            Go back
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
