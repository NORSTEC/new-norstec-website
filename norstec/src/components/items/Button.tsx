"use client";

import React from "react";

type ButtonPillProps = {
    active?: boolean;
    children: React.ReactNode;
    onClick: () => void;
};

export default function Button({ active, children, onClick }: ButtonPillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                "rounded-full px-4 py-1 transition-all border-2 border-moody cursor-pointer " +
                (active
                    ? "bg-moody text-egg"
                    : "hover:bg-moody hover:text-egg")
            }
        >
            {children}
        </button>
    );
}