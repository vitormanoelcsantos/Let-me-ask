import { useEffect, useState } from "react";

import { database } from "../services/firebase";

type QuestionsType = {
  id: string,
  author: {
    avatar: string,
    name: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    avatar: string,
    name: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}>

export function useRoom(roomId: string) {

  const [questions, setQuestions] = useState<QuestionsType[]>([]);

  const [title, setTitle] = useState('');

  useEffect(() => {

    const roomRef = database.ref(`/rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val();

      const fireBase: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(fireBase).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId])

  return { questions, title }
}