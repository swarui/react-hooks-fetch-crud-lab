import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const fetchingQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => setQuestions(questions));
  };

  useEffect(() => {
    fetchingQuestions();
  }, []);

  function handleCreatingNewQuestion(question) {
    setPage("List");
    setQuestions([...questions, question]);
  }

  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter(
      (questions) => questions.id !== id
    );
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleCreatingNewQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;