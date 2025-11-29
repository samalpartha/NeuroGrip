"use client";

import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import { Loader2 } from "lucide-react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isUserLoading && !user) {
        router.replace("/login");
      }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;
