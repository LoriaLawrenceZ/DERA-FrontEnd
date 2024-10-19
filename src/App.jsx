import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'

function App() {

    const [userInput, setUserInput] = useState("");

    const handleSendMessageBtn = () => {
        if(input.value == "" || input.value == null) return;
    }

  return (
    <div className="page">
            <Header />

            <article className='chatbot-container'>
                <section className='chat-messages-container'>
                    <p className="message der-message">Sou o Der</p>
                    <p className="message user-message">Sou o User</p>
                </section>

                <section className='input-container'>
                    <input
                        type="text"
                        name='user-input'
                        className='user-input'
                        id='user-input'
                        placeholder='Fala com o DER aí'
                        autoFocus={true}
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                    />
                    
                    <button 
                        id="user-input-btn"
                        onClick={handleSendMessageBtn}
                    >
                        &gt;
                    </button>
                </section>
            </article>
    </div>
  )
}

export default App
