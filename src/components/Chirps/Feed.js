import React, { useEffect, useState } from 'react'
import { onSnapshot, collection, query, where, updateDoc, doc } from 'firebase/firestore'
import { HiOutlineSparkles } from 'react-icons/hi'
import Post from './Post'
import { db } from '@/firebase'
import Input from '../Common/Input'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'users'), where('tag', '==', localStorage.getItem('tag'))
      ),
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          setUser(snapshot.docs[0].data())
          console.log(snapshot.docs[0].data())
          localStorage.setItem('userId', snapshot.docs[0].data().userId)
          const followingList = snapshot.docs[0].data().following
          if (followingList !== undefined) {
            onSnapshot(
              query(
                collection(db, 'posts'), where('userId', 'in', followingList)
              ),
              (snapshot) => {
                setPosts(snapshot.docs.map((doc) => doc.data()).sort((a, b) => b.timestamp - a.timestamp))
              }
            )
          }
        }
      }
    )
  }, [])

  const updatePost = (singlePost) => {
    const update = onSnapshot(
      query(
        collection(db, 'users'), where('userId', '==', singlePost.userId)
      ),
      async (snapshot) => {
        const postOwner = snapshot.docs[0].data()
        const replaceIndex = postOwner.posts.findIndex((item) => item.id === singlePost.id)
        postOwner.posts[replaceIndex] = singlePost
        await updateDoc(doc(db, 'users', singlePost.userId), {
          posts: postOwner.posts
        })
      }
    )
    update()
  }
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  React.useEffect(() => {
    console.log(posts)
  }, [posts])
  if (!hasMounted) {
    return null
  }
  return (
    <>

      <div className='top-bar'>
        Feed
        <div className="my-auto">
          <HiOutlineSparkles />
        </div>
      </div>
      <Input className='' user={user} />
      {posts.map((post) => {
        return (
            <Post key={post.id} post={post} id={post.id} user={user} updatePost={updatePost} />
        )
      }
      )}
    </>
  )
}

export default Feed
