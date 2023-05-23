import { useRouter } from "next/router";
// import { ClipLoader } from "react-spinners";

import useUser from "../../hooks/useUser";

// import PostFeed from "../../../components/posts/PostFeed";
import Header from "../../components/EditProfile/Header";
import UserBio from "../../components/Users/UserBio";
import UserHero from "../../components/Users/UserHero";
import Voter from "../../components/Dashboard/Voter";
import {InfinitySpin} from "react-loader-spinner";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <InfinitySpin 
        width='200'
        color="#4fa94d"
      />
      </div>
    )
  }

  return (
    <>
      {/* <Voter /> */}
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      {/* <PostFeed userId={userId as string} /> */}
    </>
   );
}
 
export default UserView;