import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import Header from "../../components/EditProfile/Header";
import UserBio from "../../components/Candidacy/CandidateAgenda";
import UserHero from "../../components/Candidacy/Candidate";
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