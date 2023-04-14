import React, { useEffect, useState, useContext } from 'react'
import { onSnapshot, collection, query, orderBy, where, addDoc, updateDoc, doc, arrayUnion,  documentId, or } from 'firebase/firestore'
import { BsArrowLeft } from "react-icons/bs"
import Post from './Post'
import { db } from '@/firebase'
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [following, setFollowing] = useState([])
  const [profile_user, setProfileUser] = useState(null)
  const [dataFetched, setDataFetched] = useState(false);
  const [userObjectId, setUserObjectId] = useState('')
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState("")
  const profile_tag = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (typeof window !== "undefined") {

      setUserId(localStorage.getItem("userId"))
    
    }
  }, [userId])


  useEffect(() => {
    if (userId) {

      setUserId(localStorage.getItem("userId"))
    
      onSnapshot(
        query(collection(db, `users`), where("userId", "==", userId)),
        (snapshot) => {
            let following = snapshot.docs[0].data().following
            console.log(following)
            setFollowing(following)
            setUserObjectId(snapshot.docs[0].id)
        }
      )
    }
  }, [userId])

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `users`), where("tag", "==", profile_tag)
      ),
      (snapshot) => {
        if(snapshot.docs.length > 0) {
        const userWithProfileTag = snapshot.docs[0].data()
        setProfileUser(snapshot.docs[0].data())
          onSnapshot(
            query(
              collection(db, `posts`), where("userId", "==", userWithProfileTag.userId)
            ),
            (snapshot) => {
              setPosts(snapshot.docs.map((doc) => doc.data()).sort((a, b) => b.timestamp - a.timestamp))
            }
          )
        }
        setDataFetched(true);
      }
    )
  }, [])

  const updatePost = (singlePost) => {
    const update = onSnapshot(
      query(
        collection(db, `users`), where("userId", "==", singlePost.userId)
      ),
      async (snapshot) => {
        const postOwner = snapshot.docs[0].data();
        const replaceIndex = postOwner.posts.findIndex((item) => item.id === singlePost.id)
        postOwner.posts[replaceIndex] = singlePost
        await updateDoc(doc(db, "users", singlePost.userId), {
          posts: postOwner.posts
        })
      }
    );
    update();
  }

  const followUser = async (account) => {
    console.log(userObjectId)
    await updateDoc(doc(db, "users", userObjectId), {
      following: [...following, account.userId]
    })
  }

  const unfollowUser = async (account) => {
    await updateDoc(doc(db, "users", userObjectId), {
      following: following.filter((id) => id!== account.userId)
    })
  }

  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  React.useEffect(() => {
    console.log(posts);
  }, [posts]);
  if (!hasMounted) {
    return null;
  }
  return (
    <>
      {profile_user && (
        <>
          <div className='top-bar'>
            <BsArrowLeft className='cursor-pointer' onClick={() => router.push(`/`)} />
            Profile
          </div>
  
          <div className="profile-header">
            <img src={profile_user.userImg} alt={`${profile_user.username}'s profile`} className="profile-image" />
            <h2 className="profile-name">{profile_user.username}</h2>
            <p className="profile-tag">@{profile_user.tag}</p>
            <div className='post_action_bar'>
              {profile_user.userId === userId ? (
                <div
                className="action-button"
                onClick={() => router.push(`/settings/${profile_tag}`)}
              >
                Edit Profile
              </div>
              ) :
                <div
                  className="action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/chat/${userId}/${profile_user.userId}`);
                  }}
                >
                  Chat
                </div>
              }
              {profile_user.userId === userId ? (
                null
              ) : following.includes(profile_user.userId) ? (
                <div
                  className="action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    unfollowUser(profile_user);
                  }}
                >
                  Unfollow
                </div>
              ) : (
                <div
                  className="action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    followUser(profile_user);
                  }}
                >
                  Follow
                </div>
              )}
            </div>
          </div>
      
          {posts.map((post) => {
            return (
              <Post key={post.id} post={post} id={post.id} user={user} updatePost={updatePost} />
            )
          })}
        </>
      )}
  
  {!profile_user && dataFetched && (
      <div className="message-container">
        <h2 className="message-text">User doesn't exist</h2>
      </div>
    )}

    {!profile_user && !dataFetched && (
      <div className="message-container">
        <h2 className="message-text">Loading...</h2>
      </div>
    )}
    </>
  )
  
}

export default Profile
