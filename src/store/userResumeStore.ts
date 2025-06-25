import { Resume } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ResumeStore = {
  userData: Resume;
  setUserData: (data: Partial<Resume>) => void;
  replaceUserData: (data: Resume) => void;
};

export const useUserResumeStore = create<ResumeStore>()(
  persist(
    (set)=>({
      userData: {
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          location: "",
          linkedIn: "",
          github: "",
          website: "",
        },
        education: [],
        workExperience: [],
        projects: [],
        skills: [],
        achievements: [],
        certifications: [],
      },
      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),
      replaceUserData: (data) => set({ userData: data }),
    }),
    {
      name: "user-resume-storage", // unique name
    }
  )
)