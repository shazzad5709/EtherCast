import Image from "next/image";
import useUser from "../../hooks/useUser";
import Avatar from "./Avatar"


interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  console.log(fetchedUser)
  return ( 
    <>
    
      <div className="flex w-full justify-center items-center">
        {/* <Voter /> */}
      <div className="bg-red-500 h-44 relative">
        {fetchedUser?.image && (
          <Image src={fetchedUser.image} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge />
        </div>
      </div>
      </div>
    
    <div>
    </div>
    </>
   );
}
 
export default UserHero;