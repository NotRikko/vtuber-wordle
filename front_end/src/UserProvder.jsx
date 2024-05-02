import { createContext, useState, useContext, useEffect } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(
        {
            user_name: '',
            image: '',
            current_score: '',
            high_score: '',
            isAdmin: false,
        }
    );

    const refreshToken = async () => {
            try {
                const token = localStorage.getItem('refreshtoken');
                if (token) {
                    const response = await fetch('http://localhost:3100/users/token', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token
                        })
                    });
                    
                    const data = await response.json();
                    console.log(data);
                    localStorage.setItem('accesstoken', data.accessToken);
                }
            } catch (error) {
                console.error('Token validation failed:', error);
            }
    };

    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('accesstoken');
                console.log(token);
                if(token) {
                    const response = await fetch('http://localhost:3100/users/user_session', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if(response.status !== 200 ) {
                        await refreshToken();
                        const newToken = localStorage.getItem('accesstoken');
                        if(newToken) {
                            const refreshedResponse = await fetch('http://localhost:3100/users/user_session', {
                                headers: {
                                    Authorization: `Bearer ${newToken}`
                                }
                            });
                            const data = await refreshedResponse.json();
                            setIsLoggedIn(true);
                            setUser(data);
                        }
                    } else {
                        const data = await response.json(); 
                        setIsLoggedIn(true);
                        setUser(data);
                    }
                }
            } catch (error) { 
                console.error('Token validation failed:', error);
            }
        };
    
        fetchUserData(); 
    }, []);


    const handleLoginStatus = () => {
        setIsLoggedIn(!isLoggedIn);
    }
    
    const handleUser = (user) => {
        setUser(user);
    }

    const handleLogout = async () => {
        const token = localStorage.getItem('refreshtoken');
        console.log(token);
        if(token) {
            const response = await fetch('http://localhost:3100/users/logout', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token
                        })
                    });
            if(response.status === 204) {
                localStorage.removeItem('accesstoken');
                localStorage.removeItem('refreshtoken');
                setIsLoggedIn(false);
                setUser({});
            } else {
                console.log('Failed to logout')
            }
        } else {
            console.log('No refresh token found')
        }
    }

    return (
        <UserContext.Provider value={{ isLoggedIn, user, handleLoginStatus, handleUser, handleLogout}}>
            {children}
        </UserContext.Provider>
    )

};

export const useUser = () => {
    return useContext(UserContext);
}
