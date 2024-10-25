import { withAuthorization, xiorInstance } from "@/api/instance";
import { useAuth } from "@/core/store/auth";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { IUser } from "@/core/entities";

import LoadingIcon from './../../_assets/icons/loading.svg';

import s from './auth.module.css';

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
        return <>
            <div className={s.loading}>
                <LoadingIcon></LoadingIcon>
            </div>
        </>
    }

    return (<>
        {children}
    </>);
}

export default AuthProvider;