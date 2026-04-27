import { getUser } from "@/utils/supabase/database";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode}) {
    const user = await getUser();

    if (!user) redirect("/login");

    return (
        <div>
            {children}
        </div>
    );
}