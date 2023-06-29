import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [auth, setAuth] = useState(false);

    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET

    useEffect(() => {   
        const { token } = parseCookies();
        if (!token) {
            router.push('/login');
        } else {
            try{
                jwt.verify(token, jwtSecret!)
                setAuth(true)
            }catch(err){
                console.log(err)
                router.push('/login')
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    return auth ? <>{children}</> : null;
}

export default PrivateRoute