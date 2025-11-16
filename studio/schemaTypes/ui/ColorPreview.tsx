import React from "react"

export function ColorPreview({ hex }: { hex?: string }) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: hex || "#ccc",
            }}
        />
    )
}