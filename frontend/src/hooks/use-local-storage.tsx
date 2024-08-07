import { useEffect, useState } from "react";

export default function useLocalStorage(itemId: string): { item: string } {

    const [item, setItem] = useState("");

    useEffect(() => {
        setItem(localStorage.getItem(itemId) ?? "")
    }, [itemId]);

    return { item };
}