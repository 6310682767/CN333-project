import { useEffect, useState } from "react";
import axios from "axios";

type Post = {
  _id: string;
  authorName: string;
  community: string;
  content: string;
  images: string[];
  likes: number;
  comments: any[];
  target: string;
  createdAt: string;
};

export const usePosts = (
  filter: string,
  campus?: string,
  community?: string
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Selected Filter: ", filter);
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://192.168.1.33:5000/api/posts", {
          params: {
            filter,
            campus,
            community,
          },
        });

        console.log("API request params:", {
          filter,
          campus,
          community,
        }); // เพิ่มตรงนี้

        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filter, campus, community]);

  return { posts, loading };
};
