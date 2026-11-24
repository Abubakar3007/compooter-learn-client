
import { create } from "zustand";

// Registration Interface
interface RegisterData {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    className: string;
    interests: string[];
    codingLevel: string;
    buildPreference: string;
}

interface LoginData {
    email?: string;
    mobileNumber?: string;
    password: string;
}

interface User {
    _id: string;
    fullName: string;
    email: string;
    mobileNumber?: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;

    registerData: RegisterData;

    updateRegisterData: (data: Partial<RegisterData>) => void;
    register: () => Promise<any>;
    clearRegisterData: () => void;

    login: (data: LoginData) => Promise<any>;
    logout: () => Promise<void>;
    getMe: () => Promise<void>;

    setUser: (user: User | null) => void;
}

const initialRegisterData: RegisterData = {
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    className: "",
    interests: [],
    codingLevel: "",
    buildPreference: "",
};

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,

    registerData: initialRegisterData,

    updateRegisterData: (data) =>
        set((state) => ({
            registerData: {
                ...state.registerData,
                ...data,
            },
        })),

    register: async () => {
        const { registerData } = get();

        set({ isLoading: true });

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(registerData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }

            return result;
        } finally {
            set({ isLoading: false });
        }
    },

    login: async (data) => {
        set({ isLoading: true });

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            const loggedInUser = result.user ?? result.data?.user ?? result.data;

            if (!loggedInUser?._id) {
                throw new Error("User data missing in login response");
            }

            set({
                user: loggedInUser,
                isAuthenticated: true,
                isInitialized: true,
            });

            return result;

        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });

        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

        } finally {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
            });
        }
    },

    getMe: async () => {
        if (get().isInitialized) return;

        set({ isLoading: true });

        try {
            const response = await fetch(`${API_URL}/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 401) {
                set({
                    user: null,
                    isAuthenticated: false,
                });
                return;
            }

            const result = await response.json();

            if (!response.ok || !result.success || !result.user) {
                throw new Error(result.message || "Failed to fetch user");
            }

            set({
                user: result.user,
                isAuthenticated: true,
            });

        } catch (error) {
            console.error("Authentication restoration failed:", error);
        } finally {
            set({
                isLoading: false,
                isInitialized: true,
            });
        }
    },

    setUser: (user) =>
        set({
            user,
            isAuthenticated: !!user,
        }),

    clearRegisterData: () =>
        set({
            registerData: initialRegisterData,
        }),
}));

export default useAuthStore;
