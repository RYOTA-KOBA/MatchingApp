import React, { useState, useCallback, useEffect } from "react";
import { db } from "../../firebase";
import "./style.css";
import FormDialog from "./Forms/FormDialog";
import Chats from "./Chats";
import Loading from "./Loading";
import AnswersList from "./AnswersList";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset]: any = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const addChats = useCallback(
    (chat: any) => {
      setChats((prevChats): any => {
        return [...prevChats, chat];
      });
    },
    [setChats]
  );

  const displayNextQuestion = (nextQuestionId: string, nextDataset: any) => {
    addChats({
      text: nextDataset.question,
      type: "question",
    });

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  };

  const selectAnswer = useCallback(
    (selectedAnswer: string, nextQuestionId: string) => {
      switch (true) {
        case nextQuestionId === "contact":
          handleOpen();
          break;

        case /^https:*/.test(nextQuestionId):
          const a = document.createElement("a");
          a.href = nextQuestionId;
          a.target = "_blank";
          a.click();
          break;

        default:
          addChats({
            text: selectedAnswer,
            type: "answer",
          });

          setTimeout(
            () => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),
            750
          );
          break;
      }
    },
    [answers]
  );

  useEffect(() => {
    (async () => {
      const initDataset: any = {};

      await db
        .collection("questions")
        .get()
        .then((snapshots): any => {
          snapshots.forEach((doc): any => {
            initDataset[doc.id] = doc.data();
          });
        });

      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
  }, []);

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div>
        {Object.keys(dataset).length === 0 ? (
          <Loading />
        ) : (
          <>
            <Chats chats={chats} />
            <AnswersList answers={answers} select={selectAnswer} />
          </>
        )}
        <FormDialog
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
    </section>
  );
};

export default App;
