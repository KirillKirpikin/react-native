import axios, { AxiosError } from "axios";
import { atom } from "jotai";
import { authAtom } from "../../auth/model/auth.state";
import { IDataCourse, StudentCourseDescription } from "./course.module";
import { API } from "../api/api";

export const courseAtom = atom<CurseState>({
    courses: [],
    isLoading: false,
    error: null,
});

export const loadCourseAtom = atom(
    async (get) => {
        return get(courseAtom);
    },
    async (get, set) => {
        try {
            const { access_token } = await get(authAtom);
            set(courseAtom, {
                isLoading: true,
                courses: [],
                error: null,
            });
            const { data } = await axios.get<IDataCourse>(API.my, {
                params: {
                    studentCourse: "dontMy",
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            set(courseAtom, {
                isLoading: false,
                courses: data.other,
                error: null,
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                set(courseAtom, {
                    isLoading: false,
                    courses: [],
                    error: error.response?.data.message,
                });
            }
            console.log(error);
        }
    }
);

export interface CurseState {
    courses: StudentCourseDescription[];
    isLoading: boolean;
    error: string | null;
}
