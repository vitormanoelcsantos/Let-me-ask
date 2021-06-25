import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionsType = {
  id: string,
  author: {
    avatar: string,
    name: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likesCounter: number,
  hasLiked: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    avatar: string,
    name: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>

export function useRoom(roomId: string) {

  const [questions, setQuestions] = useState<QuestionsType[]>([]);

  const [title, setTitle] = useState('');

  const { user } = useAuth();

  useEffect(() => {

    const roomRef = database.ref(`/rooms/${roomId}`)

    const unsubscribeRoomListener = roomRef.on('value', room => {
      const databaseRoom = room.val();

      const fireBase: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(fireBase).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likesCounter: Object.values(value.likes ?? {}).length,
          hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    return () => {
      roomRef.off('value');
    }

  }, [roomId, user?.id])

  return { questions, title }
}