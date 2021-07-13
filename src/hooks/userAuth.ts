import { useContext } from "react";
import { AuthContent } from "../contexts/AuthContext";

export function useAuth() {
    const value = useContext(AuthContent)

    return value;
}