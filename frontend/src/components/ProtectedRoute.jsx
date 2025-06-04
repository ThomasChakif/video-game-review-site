import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState, useEffect, use } from 'react'

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)) //if an error occurs, set authorized state to false
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN) //get refresh token
        try{
            const res = await api.post("/api/token/refresh/", { //send refresh token to route and hope to get access token returned
                refresh: refreshToken
            });
            if(res.status === 200) { //200 is successful
                localStorage.setItem(ACCESS_TOKEN, res.data.access) //set the access token 
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }catch (err){
            console.log(err)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){ //don't have a token..
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token) //if we have the token, decode it...
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if(tokenExpiration < now){ //token is expired, refresh it
            await refreshToken()
        }else{
            setIsAuthorized(true)
        }

    }

    if(isAuthorized === null){ //return div if we are not yet authorized
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/> // if authorized, return children. Else navigate to the login screen
}

export default ProtectedRoute