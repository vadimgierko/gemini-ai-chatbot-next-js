import { Metadata } from "next";

/**
 * ❗ TODO: ❗🚀
 * - add og tags
 */
export const DEFAULT_METADATA: Metadata = {
    metadataBase: new URL("https://gemini-ai-chatbot.vadimgierko.com"),
    alternates: {
        canonical: "/",
    },
    generator: 'Next.js',
    applicationName: 'Gemini AI Chatbot',
    keywords: ["Gemini", "Gemini API", "Chatbot", "AI Chatbot", 'Next.js', 'React', 'TypeScript', "Firebase", "Vadim", "Gierko", "Vadim Gierko"],
    creator: "Vadim Gierko",
    authors: [{ name: "Vadim Gierko", url: "https://github.com/vadimgierko" }],
    title: "Gemini AI Chatbot",
    description:
        "Free open source Gemini AI Chatbot App integrated with Firebase written in Next.js, React & TypeScript",
};

export function generateRouteMetadata({
    isPrivate, slug, routeTitle, description
}: {
    /**
     * Description that replaces default description.
     */
    description?: string;
    /**
     * If set to true, the route is not indexed & not followed by Google.
     */
    isPrivate: boolean;
    /**
     * This title will be added after | to main title.
     */
    routeTitle: string;
    slug: string;
}) {
    const metadata: Metadata = {
        ...DEFAULT_METADATA,
        title: routeTitle
            ? `${DEFAULT_METADATA.title} | ${routeTitle}`
            : DEFAULT_METADATA.title,
        description: description || DEFAULT_METADATA.description,
        alternates: {
            canonical: `/${slug}`,
        },
        robots: {
            index: !isPrivate,
            googleBot: {
                index: !isPrivate,
                follow: !isPrivate,
            },
            follow: !isPrivate,
        },
    };

    return metadata;
}