import { useState } from "react";
import {Container, Box} from "@chakra-ui/react"; 
import Header from "./components/Header"
import Footer from "./components/Footer";
import TextInput from "./components/TextInput";
import KeywordsModal from './components/KeywordsModal';
function App() {
  const [keywords, setKeywords] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const extractKeywords = async (text) => {
    setLoading(true)
    setIsOpen(true)

    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt: "Extract keywords from this text. Make the first letter of each word uppercase and separate with commas. End it with a smiley face\n\n" + text + "",
        temperature: 0.5,
        max_tokens: 60,
        frequency_penalty: 0.8,
      })
    }

    const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options)
    

    const json = await response.json();
    console.log(json); // check if you exceeded the current quota 
    
    const data = json.data.choices[0].text.trim(); 
    
    setKeywords(data)
    setLoading(false)
    
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Box bg="blue.600" color="white" height="100vh" pt={130}>
      <Container maxW="3xl" centerContent>
      <Header />
      <TextInput extractKeywords={extractKeywords}/>
    <Footer/>
      </Container>
      <KeywordsModal keywords={keywords} loading={loading} isOpen={isOpen} closeModal={closeModal}/>
    </Box>
  );
};

export default App

