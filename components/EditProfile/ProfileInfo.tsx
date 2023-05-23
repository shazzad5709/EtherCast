import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Unauthenticated from "../PageComponents/Unauthenticated";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import { InfinitySpin } from "react-loader-spinner";

export default function Profile() {
  const { data: session, status } = useSession();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(session?.user?.id);
  }, [session]);

  const { data: fetchedUser } = useUser(id);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && id) {
      const url = `/profile/${id}`;
      router.push(url);
    }
  }, [status, id, router]);

  if (status === "authenticated") {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </>
    );
  }

  return <Unauthenticated />;
}
