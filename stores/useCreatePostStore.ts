import { create } from "zustand";

interface CreatePostState {
  community: string;
  target: string;
  content: string;
  images: string[];
  videos: string[];
  setCommunity: (val: string) => void;
  setTarget: (val: string) => void;
  setContent: (val: string) => void;
  setImages: (imgs: string[]) => void;
  setVideos: (vids: string[]) => void;
  reset: () => void;
}

const useCreatePostStore = create<CreatePostState>((set) => ({
  community: "เลือกห้องคอมมูนิตี้",
  target: "เลือกกลุ่มเป้าหมาย",
  content: "",
  images: [],
  videos: [],
  setCommunity: (val) => set({ community: val }),
  setTarget: (val) => set({ target: val }),
  setContent: (val) => set({ content: val }),
  setImages: (imgs) => set({ images: imgs }),
  setVideos: (vids) => set({ videos: vids }),
  reset: () =>
    set({
      community: "เลือกห้องคอมมูนิตี้",
      target: "เลือกกลุ่มเป้าหมาย",
      content: "",
      images: [],
      videos: [],
    }),
}));

export default useCreatePostStore;
