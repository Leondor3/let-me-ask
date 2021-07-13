import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button'
import '../styles/auth.scss'

import { useAuth } from '../hooks/userAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');

   async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  
  }

  async function handleJoinRoom(event:FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert ('Room does not exists.');
     
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.')
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie sua sala e faça sua pergunta&amp;A ao-vivo</strong>
        <p>Tire sua dúvidas da sua audiciente em tempo-real</p>
      </aside>
      <main>
        
        <div className="main-content">
          <img src={LogoImg} alt="letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>

          
          <div className="separator">
            ou entre em uma sala
          </div>
            <form onSubmit={handleJoinRoom}>
              <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value = {roomCode}
              />
              <Button type="submit">
                Entrar na sala
              </Button >
            </form>
          </div>
         
        
      </main>
    </div>
  )
}