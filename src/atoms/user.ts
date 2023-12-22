import { atom } from "recoil";
import { IUser } from "../types/types";

export const userAtom = atom({
    key: 'userAtom',
    default: {
        name: '',
        email: ''
    } as IUser
});