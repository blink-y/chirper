import React, { useEffect, useState } from 'react';
import { onSnapshot, doc, updateDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { BsArrowLeft } from "react-icons/bs"
import { db } from '@/firebase';

const Settings = () => {
  const router = useRouter();
  const profile_tag = window.location.pathname.split('/')[2];
  const [userObjectId, setUserObjectId] = useState('')
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem('userId'));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      onSnapshot(
        query(collection(db, 'users'), where('userId', '==', userId)),
        (snapshot) => {
          setUser(snapshot.docs[0].data());
        }
      );
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      onSnapshot(
        query(collection(db, `users`), where("userId", "==", userId)),
        (snapshot) => {
            setUserObjectId(snapshot.docs[0].id)
        }
      )
    }
  })

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isUnique = async (field, value) => {
    const result = await getDocs(query(collection(db, 'users'), where(field, '==', value)));
    return result.empty;
  };
  
  const fetchUserData = async (userId) => {
    const userSnapshot = await getDoc(doc(db, 'users', userId));
    return userSnapshot.data();
  };
  
  const saveSettings = async () => {
    if (user) {
      let canUpdate = true;
      const existingUserData = await fetchUserData(userObjectId);
  
      if (user.email !== existingUserData.email) {
        const isEmailUnique = await isUnique('email', user.email);
        if (!isEmailUnique) {
          canUpdate = false;
          alert('Email is already in use. Please choose a different one.');
        }
      }
  
      if (user.tag !== existingUserData.tag) {
        const isTagUnique = await isUnique('tag', user.tag);
        if (!isTagUnique) {
          canUpdate = false;
          alert('Tag is already in use. Please choose a different one.');
        }
      }
  
      if (canUpdate) {
        await updateDoc(doc(db, 'users', userObjectId), {
          username: user.username,
          userImg: user.userImg,
          tag: user.tag,
          email: user.email,
        });
  
        // Update localStorage with the new user data
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('userImg', user.userImg);
        localStorage.setItem('username', user.username);
        localStorage.setItem('tag', user.tag);
  
        router.push(`/profile/${user.tag}`);
      }
    }
  };
  
  

  return (
    <div className="settings-container">
      <div className='sticky top-0 bg-black flex items-center gap-4 z-10 font-medium text-[20px] px-4 py-2'>
            <BsArrowLeft className='cursor-pointer' onClick={() => router.push(`/`)} />
            Edit Profile
          </div>
      {user && (
        <>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              className="input-field"
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="userImg">Profile Image URL</label>
            <input
              className="input-field"
              type="text"
              name="userImg"
              value={user.userImg}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tag">Profile Tag</label>
            <input
              className="input-field"
              type="text"
              name="tag"
              value={user.tag}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              className="input-field"
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <button className="save-button" onClick={saveSettings}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Settings;
