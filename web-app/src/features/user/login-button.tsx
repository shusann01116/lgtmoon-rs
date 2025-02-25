'use client';

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import { toast } from "sonner";
import { createClient, type Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export function LoginButton() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session) {
        setSession(session.session);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const onLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })

    if (error) {
      console.error(error)
    }
  }

  if (!session) {
    return (
      <Button onClick={onLogin} variant="secondary" className="cursor-pointer">
        Login
      </Button>
    )
  }

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    }
  }

  console.log(session);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image src={session.user.user_metadata.avatar_url} alt="avatar" width={36} height={36} className="cursor-pointer rounded-full" />
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col gap-2">
          <Button variant="ghost" onClick={onLogout}>Logout</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
