import type { Metadata } from "next";

const SUMMIT_DATE = "2026-03-12T00:00:00Z";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
    const now = new Date();
    const event = new Date(SUMMIT_DATE);

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const diffMs = event.getTime() - now.getTime();

    const days = Math.max(0, Math.ceil(diffMs / MS_PER_DAY));

    const title =
        days === 0
            ? "Today | SUMMIT"
            : `${days} days | SUMMIT`;

    return {
        title,

        openGraph: {
            title,
            images: [
                {
                    url: '/images/summitTest.png',
                    width: 1200,
                    height: 630,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            images: ['/images/summitTest.png'],
        },
    };
}


export default function Page() {
    return (<></>);
}
