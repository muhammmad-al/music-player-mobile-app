import { UserProfile } from "@/backend";
import useUserProfile from "@/hooks/useUserProfile";
import { PropsWithChildren, createContext, useEffect, useReducer, useState } from "react";


export const UserProfileContext = createContext<UserProfile | undefined>(undefined);
export const SetUserProfileContext = createContext<any>(() => { });

export function UserProfileProvider({ children }: PropsWithChildren) {
    const [userProfile, setUserProfile] = useState<UserProfile>(useUserProfile());

    return (
        <UserProfileContext.Provider value={userProfile}>
            <SetUserProfileContext.Provider value={setUserProfile}>
                {children}
            </SetUserProfileContext.Provider>
        </UserProfileContext.Provider>
    );
}