import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import { RoomCode } from '../components/RoomCode';

import { useParams } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import '../styles/room.scss';

import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';

type RoomParams = {
  id: string
}

export function Room() {

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [newQuestion, setNewQuestion] = useState('');

  const { user, signInWithGoogle } = useAuth();

  async function handleSendNewQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighligthed: false,
      isAnsewerd: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button onClick={signInWithGoogle}>faça seu login</button></span>
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}