'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Required({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === null) {
      route.push('/login');
    }
  }, [session, route]);

  return (
    <>
      {session ? <div>{children}</div> : null}
    </>
  );
}
