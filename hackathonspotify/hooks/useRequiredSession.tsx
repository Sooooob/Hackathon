import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const useRequiredSession = () => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn("spotify");
    }
  }, [session.status]);

  return session;
};

export default useRequiredSession;
