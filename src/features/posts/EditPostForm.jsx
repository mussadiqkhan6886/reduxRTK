import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useUpdatePostMutation, useDeletePostMutation } from './postsSlice'
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [updatePost, {isLoading}] = useUpdatePostMutation
    const [deletePost] = useDeletePostMutation


    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)


    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await updatePost({id: post.id, title, body: content, userId}).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePostClicked = async () => {
        try {
            await deletePost({id: post.id}).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } 
    }

    return (
        <section className="h-[581px] shadow-gray-950 py-6 bg-gradient-to-b from-gray-800 to-purple-900 flex flex-col items-center px-10">
        <h2 className="text-3xl text-white font-semibold mb-5">Edit Post</h2>
            <form className="flex flex-col justify-between items-center h-full w-full ">
                <label className="text-white mb-2" htmlFor="postTitle">Post Title:</label>
                <input
                className="w-full md:w-[50%] border-b shadow-xl bg-purple-950   p-1 px-4 outline-none text-xl "
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label className="text-white mr-5" htmlFor="postAuthor">Author:</label>
                <select className="border-b shadow-xl bg-purple-950 p-2 outline-none w-full md:w-[50%]" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
               <label className="text-white" htmlFor="postContent">Content:</label>
                <textarea
                rows={4}
                className="border-b shadow-xl bg-purple-950 w-full md:w-[50%] outline-none p-2 mt-2"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                className="border py-2 w-full md:w-[50%]  not-disabled:bg-purple-950 not-disabled:cursor-pointer not-disabled:text-white"
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button className="bg-red-600  w-full md:w-[50%] border p-2 text-black"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
            </form>
        </section>
    )
}

export default EditPostForm