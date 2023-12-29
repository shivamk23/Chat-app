import {createContext, useContext, useEffect, useState} from 'react';
import { useHistory ,BrowserRouter} from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider=({children})=>{
    const [user,setUser]=useState();
    const[selectedChat,setSelectedChat]=useState();
    const [notification, setNotification] = useState([]);
    const [chats,setChats]=useState();


    const history= useHistory();
useEffect(() => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!userInfo) {
            history.push("/");
        }
    } catch (error) {
        console.error("Error parsing userInfo:", error);
        history.push("/");
    }
}, [history]); 
    return(
        <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,notification, setNotification}}>
            {children}
        </ChatContext.Provider>
    )
}
export const ChatState=()=>{
    return useContext(ChatContext)
}
export default ChatProvider;