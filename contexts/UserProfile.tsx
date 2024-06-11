import { UserProfile } from "@/backend";
import { PropsWithChildren, createContext, useEffect, useReducer, useState } from "react";


export const UserProfileContext = createContext<UserProfile | null>(null);
export const SetUserProfileContext = createContext<
    React.Dispatch<React.SetStateAction<UserProfile | null>>>(
        () => { }
    );

export function UserProfileProvider({ children }: PropsWithChildren) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    return (
        <UserProfileContext.Provider value={userProfile}>
            <SetUserProfileContext.Provider value={setUserProfile}>
                {children}
            </SetUserProfileContext.Provider>
        </UserProfileContext.Provider>
    );
}