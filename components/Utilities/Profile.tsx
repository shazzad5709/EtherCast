import { useState } from 'react';
import NextImage from 'next/image';

function Profile({ profileData }:any) {
  return (
    <div className="profile">
      <div className="profile-picture">
        <NextImage src={profileData.profilePicture} alt="Profile picture" width={150} height={150} />
      </div>
      <div className="profile-info">
        <h2>{profileData.name}</h2>
        <p>{profileData.bio}</p>
      </div>
    </div>
  );
}

function ProfileForm({ profileData, onSubmit }:any) {
  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState(profileData.bio);
  const [profilePicture, setProfilePicture] = useState(null);

  function handleNameChange(event:any) {
    setName(event.target.value);
  }

  function handleBioChange(event:any) {
    setBio(event.target.value);
  }

  function handleProfilePictureChange(event:any) {
    const file = event.target.files[0];
    setProfilePicture(file);
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" value={bio} onChange={handleBioChange}></textarea>
      </div>
      <div>
        <label htmlFor="profilePicture">Profile picture:</label>
        <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default function EditProfile() {
    const [profileData, setProfileData] = useState({
      name: 'John Doe',
      bio: 'I am a software engineer.',
      profilePicture: '/default-profile-picture.png',
    });
  
    function handleProfileUpdate(formData:any) {
      // TODO: Update the profile data in the database and/or storage service
      // and then update the profileData state variable with the new data.
      console.log(formData);
      setProfileData({
        name: formData.get('name'),
        bio: formData.get('bio'),
        profilePicture: formData.get('profilePicture') ? URL.createObjectURL(formData.get('profilePicture')) : profileData.profilePicture,
      });
    }
  
    return (
      <div className="edit-profile">
        <Profile profileData={profileData} />
        <ProfileForm profileData={profileData} onSubmit={handleProfileUpdate} />
        
      </div>
    );
  }
  