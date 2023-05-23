import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";
import Unauthenticated from "../PageComponents/Unauthenticated";

export default function Profile() {
    const { data: session, status } = useSession();
    const [authenticated, setAuthenticated] = useState(Boolean(false));

    const fetchUsers = async () => {
        let id = session?.user?.id;
        try {
            const response = await axios.get(`/api/data/User/${id}`);

        } catch (error) {
            console.log('Something went wrong while fetching Voters.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [authenticated]);

    if (status === 'authenticated') {
        setAuthenticated(true);

        return (
            <>
                <div className="flex flex-col items-center justify-center">
    
                </div>
    
            </>
        )
    }
    return (
        <Unauthenticated />
    )

    
}