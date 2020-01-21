export interface Roles {
    admin?: boolean;
    subscriber?: boolean;
}
export interface User {
    uid: string;
    email: string;
    roles: Roles;
    userCourses: SignedFor[];
}
export interface SignedFor {
    userCourse ?: string;
    userRating?: number;
}