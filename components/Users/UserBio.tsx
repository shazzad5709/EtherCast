import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "../../hooks/useCurrentUser";
import useUser from "../../hooks/useUser";
// import useFollow from "../../hooks/useFollow";
import useEditModal from "../../hooks/useEditModal";

import Button from "../Utilities/ButtonProfile";
import Voter from "../Dashboard/Voter";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

//   const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])


  return ( 
    <>
    
    {/* <Voter /> */}
    <div className="border-b-[1px] border-neutral-800 pb-4">
    
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <>
          <div> test </div>
          <Button secondary label="Edit" onClick={editModal.onOpen} />
          </>
        ) : (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <br />
          <p className=" text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">
            {fetchedUser?.role}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p >
            {fetchedUser?.email}
          </p>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          ">
            <BiCalendar size={24} />
            <p>
              Joined {createdAt}
            </p>
          </div>
        </div>
        
        </div>
      </div>
      </>
    
   );
}
 
export default UserBio;