import { IndexPageContent } from "@/types/IndexPage";
import { BsChatDots, BsCodeSlash, BsGear, BsGoogle, BsMarkdown, BsMoon } from "react-icons/bs";
import { CiStreamOn } from "react-icons/ci";
import { SiBootstrap, SiFirebase, SiGooglegemini, SiMarkdown, SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";

export default function getIndexPageContent() {
    return INDEX_PAGE_CONTENT;
}

const APP_NAME = "Gemini AI Chatbot";

const INDEX_PAGE_CONTENT: IndexPageContent = {
    HEADER: {
        title: `Welcome to ${APP_NAME}!`,
        description: "Free Open Source AI Chatbot App integrated with Gemini.",
    },
    SECTIONS: [
        {
            additionalStyles: { width: 300 },
            id: "app-features",
            items: [
                {
                    Icon: BsGoogle,
                    title: "Google Sign-In",
                    description: "Sign in with your Google account to use the app for free. This helps prevent abuse of API routes by malicious users."
                },
                {
                    Icon: BsChatDots,
                    title: "Temporary Text-Based Chat",
                    description: "A private, temporary chat where messages are not stored in any database. Your chat history disappears on page reload but remains while navigating within the app."
                },
                {
                    Icon: CiStreamOn,
                    title: "AI Response Streaming",
                    description: "Enjoy faster AI responses and a smoother user experience with real-time streaming, delivering content as soon as it's generated."
                },
                {
                    Icon: BsGear,
                    title: "Custom System Instructions",
                    description: "Define system instructions (context) to receive more personalized AI responses tailored to your needs."
                },
                {
                    Icon: BsMarkdown,
                    title: "Markdown Support",
                    description: "Your prompts & AI responses are formatted in Markdown, and the app includes a built-in Markdown renderer for proper formatting and styling."
                },
                {
                    Icon: BsCodeSlash,
                    title: "Code Highlighting",
                    description: "AI-generated code is syntax-highlighted for better readability and a more convenient coding experience."
                },
                {
                    Icon: BsMoon,
                    title: "Dark Mode",
                    description: "Dark mode is the app’s default (and only) theme, providing a sleek and comfortable viewing experience."
                },
            ],
            title: `${APP_NAME} Features`
        },
        {
            id: "app-technologies",
            items: [
                {
                    Icon: SiNextdotjs,
                    title: "Next.js 15+",
                },
                {
                    Icon: SiReact,
                    title: "React 19+",
                },
                {
                    Icon: SiGooglegemini,
                    title: "Gemini 2.0 Flash",
                },
                {
                    Icon: SiFirebase,
                    title: "Firebase 11+",
                },
                {
                    Icon: SiTypescript,
                    title: "TypeScript 5+",
                },
                {
                    Icon: SiBootstrap,
                    title: "Bootstrap 5.3+",
                },
                {
                    Icon: SiMarkdown,
                    title: "Markdown",
                },
            ],
            title: `Technologies used to build the ${APP_NAME} app`
        }
    ]
}

