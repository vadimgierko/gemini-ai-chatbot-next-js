import PrivateRoute from "@/components/PrivateRoute";
import SystemInstructionsPageComponent from "./SystemInstructionPageComponent";
import { generateRouteMetadata } from "@/lib/metadata";

export const metadata = generateRouteMetadata({
	isPrivate: true,
	slug: "system-instruction",
	routeTitle: "System Instruction"
});

export default function SystemInstructionsPage() {
	return (
		<PrivateRoute>
			<SystemInstructionsPageComponent />
		</PrivateRoute>
	);
}