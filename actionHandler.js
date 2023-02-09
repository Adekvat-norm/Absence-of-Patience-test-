const dom = {
  progress: {
    testTitle: document.getElementById("test-title"),
    progressFill: document.getElementById("progress-fill"),
    questionNumber: document.getElementById("question-number"),
    totalQuestions: document.getElementById("total-questions"),
  },
  questionWrap: document.getElementById("question-wrap"),
  step: {
    question: document.getElementById("quest"),
    questionPosition: document.getElementById("question-position"),
  },
  answers: document.getElementById("answers"),
  Next: document.getElementById("next"),
  reset: document.getElementById("newStart"),
  result: {
    resultBlock: document.getElementById("result"),
    validAnswers: document.getElementById("valid-answers"),
    questionsCount: document.getElementById("result-total-questions"),
  },
};

dom.progress.testTitle.innerHTML = data.title;

let totalSteps = data.questions.length;
let step = 0;
let validAnswersCount = 0;

// Клик по кнопке Следующий
dom.Next.onclick = () => {
  if (step < totalSteps) {
    step += 1;
  } else {
    step;
  }
  renderTest(totalSteps, step);
  dom.answers.classList.remove("test_answers_disable");
};

//Вывод всего теста
function renderTest(total, step) {
  renderProgress(total, step);
  if (step + 1 == total) {
    changeBtnOnResult();
  } else if (step == total) {
    restartBtn();
  }
  if (step < total) {
    const answers = data.questions[step].answers;
    const answersHtml = buildAnswerHtml(answers);
    renderQuestion(totalSteps, step);
    renderAnswers(answersHtml);
    isDisableBtn(true);
  } else if (step == total) {
    renderResults();
  }
}
renderTest(totalSteps, step);

// Работа прогресс бара
function renderProgress(total, step) {
  const progressPercent = (100 / total) * step;
  dom.progress.questionNumber.innerHTML = step;
  dom.progress.totalQuestions.innerHTML = total;
  dom.progress.progressFill.style.width = `${progressPercent}%`;
}

renderProgress(totalSteps, step);

//Вывод вопроса
function renderQuestion(total, step) {
  dom.step.questionPosition.innerHTML = `${step + 1}.`;
  dom.step.question.innerHTML = data.questions[step].question;
}

renderQuestion(totalSteps, step);

// Функция создания ХТМЛ кода для ответа
function buildAnswerHtml(answers) {
  const answersHtml = [];

  answers.forEach((answer, idx) => {
    const html = `
   <div class="test_answer" data-id="${idx + 1}">${answer}</div>`;
    answersHtml.push(html);
  });

  return answersHtml.join("");
}

const answersHtml = buildAnswerHtml(data.questions[0].answers);

//Создание и вывод ответов
function renderAnswers(htmlString) {
  dom.answers.innerHTML = htmlString;
}
debugger;

//отслеживание клика на ответ
dom.answers.onclick = (event) => {
  const target = event.target;
  if (target.classList.contains("test_answer")) {
    let counter = 0;
    if (counter === 0) {
      debugger;
      counter++;
      const answerNumber = target.dataset.id;
      const isValid = checkAnswer(step, answerNumber);
      const answerClass = isValid ? "test_answer_valid" : "test_answer_invalid";
      target.classList.add(answerClass);
      isDisableBtn(false);
      validAnswersCount = isValid ? validAnswersCount + 1 : validAnswersCount;
      dom.answers.classList.add("test_answers_disable");
    }
  }
};

//Проверка ответа
function checkAnswer(step, answer) {
  const validAnswer = data.questions[step].validAnswer;
  return validAnswer == answer;
}

//Блокировка кнопки
function isDisableBtn(isDisable) {
  if (isDisable) {
    dom.Next.classList.add("test_btn_disable");
  } else {
    dom.Next.classList.remove("test_btn_disable");
  }
}

// Смена надписи на кнопке
function changeBtnOnResult() {
  dom.Next.innerText = "Посмотреть результат";
  dom.Next.dataset.result = "result";
}

//Показ результата опроса
function renderResults() {
  //Скрываем
  dom.answers.style.display = "none";
  dom.Next.style.display = "none";
  dom.questionWrap.style.display = "none";
  //Показываем
  dom.result.resultBlock.style.display = "block";
  dom.result.validAnswers.innerHTML = validAnswersCount;
  dom.result.questionsCount.innerHTML = totalSteps;
}
debugger;
function restartBtn() {
  let state = dom.reset.style.display; //смотрим, включен ли сейчас элемент
  if (state == "none") {
    dom.reset.style.display = "";
  }
  dom.reset.onclick = () => {
    history.go();
  };
}

function hidden(hidden) {
  let state = hidden.style.display; //смотрим, включен ли сейчас элемент
  if (state == "") {
    hidden.style.display = "none";
  }
}

hidden(dom.reset);
