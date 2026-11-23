
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

// Login Interface
interface LoginData {
    email?: string;
    mobileNumber?: string;
    password: string;
}

// User Interface
interface User {
    _id: string;
    fullName: string;
    email: string;
    mobileNumber?: string;
}

// Auth Store Interface
interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    registerData: RegisterData;

    // Registration
    updateRegisterData: (data: Partial<RegisterData>) => void;
    register: () => Promise<any>;
    clearRegisterData: () => void;

    // Authentication
    login: (data: LoginData) => Promise<any>;
    logout: () => Promise<void>;
    getMe: () => Promise<void>;

    // User
    setUser: (user: User | null) => void;
}

// Initial Registration Data
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

// LIVE BACKEND API URL
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const useAuthStore = create<AuthStore>((set, get) => ({
    // Initial State
    user: null,
    isAuthenticated: false,
    isLoading: false,

    registerData: initialRegisterData,

    // Update Registration Data
    updateRegisterData: (data) =>
        set((state) => ({
            registerData: {
                ...state.registerData,
                ...data,
            },
        })),

    // Register
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

    // Login
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

            set({
                user: result.user ?? result.data,
                isAuthenticated: true,
            });

            return result;

        } finally {
            set({ isLoading: false });
        }
    },

    // Logout
    logout: async () => {
        set({ isLoading: true });

        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Logout failed");
            }

            set({
                user: null,
                isAuthenticated: false,
            });

        } finally {
            set({ isLoading: false });
        }
    },

    // Get Logged-in User
    getMe: async () => {
        try {
            set({ isLoading: true });

            const response = await fetch(
                `${API_URL}/me`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success || !result.user) {
                set({
                    user: null,
                    isAuthenticated: false,
                });
                return;
            }

            set({
                user: result.user,
                isAuthenticated: true,
            });
        } catch (error) {
            console.error("Get Me Error:", error);

            set({
                user: null,
                isAuthenticated: false,
            });
        } finally {
            set({ isLoading: false });
        }
    },

    // Set User
    setUser: (user) =>
        set({
            user,
            isAuthenticated: !!user,
        }),

    // Clear Registration Data
    clearRegisterData: () =>
        set({
            registerData: initialRegisterData,
        }),
}));

export default useAuthStore;
