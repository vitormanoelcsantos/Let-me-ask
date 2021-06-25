import { useParams } from 'react-router-dom';

import { Question } from '../Question';
import { useRoom } from '../../hooks/useRoom';
import { Button } from '../../components/Button/Button';
import { RoomCode } from '../../components/RoomCode/RoomCode';
import logoImg from '../../assets/images/logo.svg';
import '../Room/styles.scss'

type RoomParams = {
  id: string
}

export function AdminRoom() {

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(questions => {
            return (
              <Question
                key={questions.id}
                content={questions.content}
                author={questions.author}
              />
            )
          })}
        </div>
      </main>
    </div>
  );
}