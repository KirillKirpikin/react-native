export interface User {
    id: number;
    name: string;
    surname?: string;
    photo?: string;
}

export interface IData {
    profile: User;
}
