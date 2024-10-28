import { withAuthorization, xiorInstance } from "@/api/instance";
import { useAuth } from "@/core/store/auth";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { IUser } from "@/core/entities";

import s from './auth.module.css';
import Loading from "../loading/loading";

function AuthProvider({children}: {children: any}) {
    
    let auth = useAuth();

    useEffect(() => {
        xiorInstance.get('/user/get', {
            headers: withAuthorization()
            }).then((response) => {
                
                let user: IUser = response.data.data;
                auth.actions.setUser(user);
                auth.actions.setAuthentificated(true);

            }).catch((err) => {
                Cookies.remove('token');
                window.location.href = '/auth';
            })
    }, [])

    if (!auth.authentificated) {
        return <Loading className="min-h-[70vh]"></Loading>
    }

    return (<>
        {children}
    </>);
}

export default AuthProvider;