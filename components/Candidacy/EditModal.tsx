import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "../../hooks/useCurrentUser";
import useCandidateEdit from "../../hooks/useCanTask";
import useUser from "../../hooks/useUser";

import Input from "../EditProfile/Input";
import Modal from "../EditProfile/Modal";
import ImageUpload from "../EditProfile/ImageUpload";
import { set } from "mongoose";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useCandidateEdit();

  // const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [symbol,setSymbol] = useState('');
  const [agenda,setAgenda] = useState('');
  // const [password, setPassword] = useState('');

  useEffect(() => {
    // setProfileImage(currentUser?.profileImage);
    setName(currentUser?.name);
    setAgenda(currentUser?.agenda)
    setSymbol(currentUser?.symbol)
  }, [currentUser?.name]);
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.put('/api/editCandidate', { userId: currentUser.id,name, symbol, agenda });
      mutateFetchedUser();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.id, editModal, name, symbol, mutateFetchedUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" /> */}
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
      <Input
        placeholder="Agenda"
        onChange={(e) => setAgenda(e.target.value)}
        value={agenda}
        disabled={isLoading}  
      />
      <Input
        placeholder="Symbol"
        onChange={(e) => setSymbol(e.target.value)}
        value={symbol}
        disabled={isLoading}  
      />
    </div>
  );

  return (
    <>
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your Candidacy......"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
    {/* <div> Test</div> */}
    </>
  );
}

export default EditModal;
