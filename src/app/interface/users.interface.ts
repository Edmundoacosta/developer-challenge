interface User {
    id: number;
    fullname: string;
    email: string;
    password: string;
    confirmpassword?: string;
}

export { User };