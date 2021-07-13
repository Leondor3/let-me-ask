import { useHistory, useParams} from 'react-router-dom'
import { database } from '../services/firebase';
import LogoImg from '../assets/images/logo.svg'
import { Button  } from '../components/Button'
import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Questions'
import { useRoom } from '../hooks/useRoom';
import deletImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';




type RoomParams = {
    id: string;
}


export function AdminRoom() {


   // const { user } = useAuth();
    const params = useParams<RoomParams>()
    const history = useHistory();
    const roomId = params.id;
    const {questions, title} = useRoom(roomId)
    
    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        
        history.push('/')
    }
    

     async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswer(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })

    }

    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                <img src={LogoImg} alt="Letmeask" />
                <div>
                <RoomCode code ={roomId} />
                <Button isOutlined onClick={handleEndRoom}>Encerrar a Sala</Button>
                </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
              

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            isAnswered = {question.isAnswered}
                            isHighLighted = {question.isHighLighted}
                            >
                            
                            {!question.isAnswered && (
                                <>
                                <button
                                type="button"
                                onClick={() => handleCheckQuestionAsAnswer(question.id)}
                                
                                >
                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                </button>
    
                                <button
                                type="button"
                                onClick={() => handleHighLightQuestion(question.id)}
                                
                                >
                                <img src={answerImg} alt="Dar destaque á pergunta" />
                                </button>
                                </>
                            )}

                            <button
                            type="button"
                            onClick={() => handleDeleteQuestion(question.id)}
                            
                            >
                            <img src={deletImg} alt="Remover pergunta" />
                            </button>

                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}