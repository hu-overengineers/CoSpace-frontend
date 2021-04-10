const PostList = (props) => {
    const posts = props.posts;
    const handleDelete = props.handleDelete;
    
    return ( 
        <div className="post-list">
            {posts.map((post) => (
                <div className="post-preview" key={post.id}>
                    <h2>{post.title}</h2>
                    <p>Written by {post.author}</p>
                    <button onClick={() => handleDelete(post.id)}>delete post</button>
                </div>
            ))}
        </div>
     );
}
 
export default PostList;