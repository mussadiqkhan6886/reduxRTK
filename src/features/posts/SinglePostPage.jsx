import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
 
    return (
        <article className='h-[581px] pt-4 bg-gradient-to-b from-gray-800 to-purple-900 px-12'>
            <h2 className='text-3xl font-bold text-white mb-3'>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h2>
            <p>{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</p>
            <p className="my-2">
                <Link className='mr-10 text-white hover:underline' to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage