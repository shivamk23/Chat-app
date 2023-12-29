import React, { useEffect } from 'react'
import {Container,Box,Text,Button,Icon,Image,Spinner} from '@chakra-ui/react'
import {Tabs,TabList,TabPanels,Tab,TabPanel} from '@chakra-ui/react'
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom';


const HomePage = () => {
  const history=useHistory();
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("userInfo"));
        
        if(user) history.push("/chats");
    },[history])

  return (
    <Container maxW='xl' centerContent>
      <Box 
        d='flex'
        justifyContent='center'
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Let's Talk</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" color={'black'} borderWidth="1px">
    <Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList mb={'1em'}>
    <Tab w={"50%"}>Login</Tab>
    <Tab w={"50%"}>Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel><Login /></TabPanel>
    <TabPanel><SignUp /></TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
