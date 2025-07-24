import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const [addNewPost, {isLoading}] = useAddNewPostMutation()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addNewPost({title, body: content, userId}).unwrap
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }

    }

    const usersOptions = users.map(user => (
        <option className="bg-black" key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section className="h-[581px] shadow-gray-950 py-6 bg-gradient-to-b from-gray-800 to-purple-900 flex flex-col items-center px-10 ">
            <h2 className="text-3xl text-white font-semibold mb-5">Add a New Post</h2>
            <form className="flex flex-col justify-between items-center h-full w-full">
                
                <label className="text-white mb-2" htmlFor="postTitle">Post Title:</label>
                <input
                className="w-full md:w-[50%] border-b shadow-xl bg-purple-950   p-1 px-4 outline-none text-xl"
                autoComplete="off"
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                
                
                <label className="text-white mr-5" htmlFor="postAuthor">Author:</label>
                <select className="border-b w-full md:w-[50%] shadow-xl bg-purple-950 p-2 outline-none" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value="">Choose Author</option>
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
                className="border w-full md:w-[50%] py-2 not-disabled:bg-purple-950 not-disabled:cursor-pointer not-disabled:text-white"
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm