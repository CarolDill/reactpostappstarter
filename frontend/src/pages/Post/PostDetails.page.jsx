import DOMAIN from "../../services/endpoint";
import axios from "axios";

import { useLoaderData } from "react-router-dom";


function PostDetailsPage() {
  const post = useLoaderData();
  console.log(post);

  return (
    <>
      <p>{post.title}</p>
      
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  const id = params.id;
  // console.log(typeof(id));
  const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
  console.log(res.data);
  return res.data;
  // return null;
};

export default PostDetailsPage;
