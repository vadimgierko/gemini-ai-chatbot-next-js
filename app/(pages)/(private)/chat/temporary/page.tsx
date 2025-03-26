import Chat from "@/components/Chat"
import PrivateRoute from "@/components/PrivateRoute";
import { generateRouteMetadata } from "@/lib/metadata";

export const metadata = generateRouteMetadata({
    isPrivate: true,
    slug: "chat/temporary",
    routeTitle: "Temporary Chat"
});

export default function TemporaryChatPage() {
    return (
        <PrivateRoute>
            <Chat />
        </PrivateRoute>
    );
}