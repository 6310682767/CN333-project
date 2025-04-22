import { create } from "zustand";

interface CommentItem {
    id: string;
    user: string;
    content: string;
    createdAt: string;
}

interface PostItem {
    id: string;
    authorName: string;
    content: string;
    community: string;
    target: string;
    images: string[];
    createdAt: string;
    likes: number;
    liked: boolean;
    saved: boolean;
    comments: CommentItem[];
}

interface FeedState {
    posts: PostItem[];
    addPost: (post: Omit<PostItem, "id" | "createdAt" | "likes" | "liked" | "saved" | "comments">) => void;
    toggleLike: (postId: string) => void;
    toggleSave: (postId: string) => void;
    addComment: (postId: string, comment: Omit<CommentItem, "id" | "createdAt">) => void;
    deletePost: (postId: string) => void;
    clearPosts: () => void;
}

const useFeedStore = create<FeedState>((set) => ({
    posts: [],

    addPost: (post) =>
        set((state) => ({
            posts: [
                {
                    ...post,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    liked: false,
                    saved: false,
                    comments: [],
                },
                ...state.posts,
            ],
        })),

    toggleLike: (postId) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        liked: !post.liked,
                        likes: post.liked ? post.likes - 1 : post.likes + 1,
                    }
                    : post
            ),
        })),

    toggleSave: (postId) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId ? { ...post, saved: !post.saved } : post
            ),
        })),

    addComment: (postId, comment) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                ...comment,
                                id: Date.now().toString(),
                                createdAt: new Date().toISOString(),
                            },
                        ],
                    }
                    : post
            ),
        })),

    deletePost: (postId) =>
        set((state) => ({
            posts: state.posts.filter((post) => post.id !== postId),
        })),

    clearPosts: () => set({ posts: [] }),
}));

export default useFeedStore;
