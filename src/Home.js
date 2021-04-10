import {useState} from "react"
import PostList from "./PostList";

const Home = () => {
    
    const [posts, setPosts] = useState([
        {title: "Samil'in beyninde zeka kirintisi bulundu!", author: "A-haber", body: "lorem ipsum...", id: 1},
        {title: "Liseli gencler samil'den daha zeki yapay zeka yaptilar!", author: "A-haber", body: "lorem ipsum...", id: 2}
    ]);

    const handleDelete = (id) => {
        const newPosts = posts.filter(post => post.id !== id);
        setPosts(newPosts);
    }

    return ( 
        <div className="home">
            
            <PostList posts={posts} handleDelete={handleDelete}/>

        </div>
     );
}
 
export default Home;