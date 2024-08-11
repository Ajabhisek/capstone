import { useEffect, useState } from "react";
import { IUser } from "../users/dto/index.dto";
import useLocalStorage from "./use-local-storage";

export default function useUserInfo(): IUser {

    const { item } = useLocalStorage("userId");
    const [user, setUser] = useState<IUser>({});

    useEffect(() => {
        const userString = localStorage.getItem("user") ?? "{}";
        setUser(JSON.parse(userString));
    }, [item]);

    return user;

}