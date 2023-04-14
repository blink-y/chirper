import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import Post from './Post'
import { updateDoc, onSnapshot, collection, query, getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/router'
import Comment from './Comment'

const SinglePost = () => {
  const [post, setPost] = useState(null)
  const router = useRouter()
  const [comments, setComments] = useState([])
  const [user, setUser] = useState(null)

  const incrementViews = async (postData) => {
    await updateDoc(doc(db, 'posts', postData.id), {
      views: postData.views + 1
    })
  }

  useEffect(() => {
    if (window !== 'undefined') {
      const fetchPostData = async () => {
        const postId = window.location.pathname.split('/')[2]
        const postData = await getDoc(doc(db, 'posts', postId))
        if (postData.exists()) {
          const postObj = postData.data()
          setPost(postObj)
          incrementViews(postObj)
        }
      }

      fetchPostData()
    }
  }, [])

  useEffect(() => {
    if (post) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'posts', post.id, 'replies')),
        (snapshot) => {
          const replies = snapshot.docs.map((doc) => doc.data())
          setComments(replies)
        }
      )
      return () => unsubscribe()
    }
  }, [post])

  return (
        <section className='w-[600px] min-h-screen border-r border-gray-400 text-white py-2'>
            <div className='sticky top-0 bg-black flex items-center gap-4 font-medium text-[20px] px-4 py-2'>
                <BsArrowLeft className='cursor-pointer' onClick={() => router.push('/')} />
                Chirper
            </div>
            {
                post ? <Post post={post} /> : null

            }
            <div className='border-t border-gray-700'>
                {comments && comments.length > 0
                  ? (
                    <>
                    <div className="px-4 py-2 border-b border-gray-700">Scroll down for replies...</div>
                    <div className="pb-72">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                comment={comment}
                                ownerTag={post.tag}
                            />
                        ))}
                    </div>
                    </>
                    )
                  : (
                    <div className="px-4 py-2 border-b border-gray-700">This post has no replies, be the first one to comment!</div>
                    )}
            </div>

        </section>
  )
}

export default SinglePost
