import { useContext, useEffect, useState } from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm'
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Response } from "../types"

const ResetPassword = () => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const { setSession } = useContext(AuthContext)
    
    useEffect(() => {
      if (typeof window !== "undefined") {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        setAccessToken(hashParams.get("access_token") || "");
        setRefreshToken(hashParams.get("refresh_token") || "");
      }
    }, []);
  
    useEffect(() => {
        console.log(accessToken, refreshToken)
      const getSessionWithTokens = async () => {
            const response = await setSession(accessToken, refreshToken) as Response
            if (!response.success) return toast.error(`${response.error}`)
      };
        if (accessToken && refreshToken) {
        getSessionWithTokens();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, refreshToken]);

  return (
    <>
    <h3>Set a new password below</h3>
    <ResetPasswordForm />
    </>
  )
}

export default ResetPassword