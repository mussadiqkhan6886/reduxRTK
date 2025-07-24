import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))

    return (
        <article className="border p-3 mb-4 rounded-2xl hover:shadow-3xl">
            <h2 className="text-2xl font-bold text-white mb-2">{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h2>
            <p className="mb-2">{post.body.charAt(0).toUpperCase() + post.body.slice(1).substring(0, 75)}...</p>
            <p className="mb-2">
                <Link className="hover:underline mr-10 text-white" to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExcerpt