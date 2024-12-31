import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

// storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/auth";

interface AuthContextType {
    authenticated: boolean;
    user: {
        id_user: number;
        email: string;
        nama: string;
        photo: string;
        menu: any;
        token: string;
    };
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({ id_user: 0, email: '', nama: '', photo: '', menu: [], token: '' });

    useEffect(() => {
        const loadAuthData = async () => {
            const user = await AsyncStorage.getItem('user');

            if (user) {
                setUser(JSON.parse(user));
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        };

        loadAuthData();
    }, []);

    const login = async (username: string, password: string) => {
        const response = await loginUser(username, password);

        if (response.data.status === "00") {
            await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
            setUser(response.data.data);
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem("user");
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            authenticated,
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };