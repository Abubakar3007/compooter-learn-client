import { useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const getMe = useAuthStore((state) => state.getMe);

    useEffect(() => {
        getMe();
    }, [getMe]);

    return <>{children}</>;
};

export default AuthProvider;