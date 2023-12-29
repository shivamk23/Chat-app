import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/layout';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChat from '../components/MyChat';
import Chatbox from '../components/ChatBox';

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
  const {user}= ChatState();

  return(<div style={{width:"100%"}}>
    {user && <SideDrawer />}
    <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
  </div>
  );
}

export default ChatPage
