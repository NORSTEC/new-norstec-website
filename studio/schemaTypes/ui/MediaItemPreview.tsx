import React from "react"

type MediaItemPreviewProps = {
    title?: string
    url?: string
}

export function MediaItemPreview({ title, url }: MediaItemPreviewProps) {
    const match =
        typeof url === "string"
            ? url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]+)/)
            : null
    const videoId = match ? match[1] : null

    const thumbnail = videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null

    const displayTitle =
        typeof title === "string" && title.trim() !== ""
            ? title
            : "Media item"

    const altText = `${displayTitle} – thumbnail`

    return (
        <div className="media-item-preview">
            {thumbnail && (
                <img
                    src={thumbnail}
                    alt={altText}
                    className="media-item-thumbnail"
                />
            )}

            <div className="media-item-text">
                <strong>{displayTitle}</strong>
                {url && <div className="media-item-url">{url}</div>}
            </div>
        </div>
    )
}