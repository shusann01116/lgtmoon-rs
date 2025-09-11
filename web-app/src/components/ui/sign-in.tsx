import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export const SignIn = () => {
	return (
		<Button
			onClick={async () => {
				"use server";
				await signIn("google");
			}}
			variant="secondary"
			className="cursor-pointer"
		>
			<SiGoogle className="size-4" />
			Sign in with Google
		</Button>
	);
};
