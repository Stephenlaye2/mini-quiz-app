const ItemCtrl = (() => {
  const data = [
    {
      question: "Who was the first man in space?",
      a: "Neil Armstrong",
      b: "Cosmonaut Yuri Gagarin",
      c: "Astronaut Eli Cologne",
      d: "Richard Feynman",
      correctAnswer: "b",
      id: "b",
    },
    {
      question: `What colour is Spock's blood?`,
      a: "Red",
      b: "Black",
      c: "Blue",
      d: "Green",
      correctAnswer: "d",
      id: "d",
    },
    {
      question: "Who invented the television?",
      a: "Albert Einstein",
      b: "Isacc Newton",
      c: "John Logie Baird",
      d: "Alan Turing",
      correctAnswer: "c",
      id: "c",
    },
    {
      question: "Who is known as the father of computer?",
      a: "Charles Babbage",
      b: "Alan Turing",
      c: "Nikola Tesla",
      d: "Richard Feynman",
      correctAnswer: "a",
      id: "a",
    },
    {
      question: "How many feet in a fathom?",
      a: "9 feet",
      b: "5 feet",
      c: "7 feet",
      d: "6 feet",
      correctAnswer: "d",
      id: "d",
    },
  ];
  return {
    data: () => {
      return data;
    },
    
  };
})();



let questionCount = 0;
const UICtrl = (() => {

  return {
    getData: () => {
      const data = ItemCtrl.data();
      let question;
      question = data[questionCount];

      const questionList = document.querySelector(".answer-options");
      questionList.innerHTML = `
  
  <h2>${question.question}</h2>
  <ul>
  <li>A <input type="radio" name="answer" id="a" class="option"> <label for="a">${question.a}</label></li>
  <li>B <input type="radio" name="answer" id="b" class="option"> <label for="b">${question.b}</label></li>
  <li>C <input type="radio" name="answer" id="c" class="option"> <label for="c">${question.c}</label></li>
  <li>D <input type="radio" name="answer" id="d" class="option"> <label for="d">${question.d}</label></li>

</ul>
  `;
    },
    getOptionId: () => {
      const options = document.querySelectorAll(".option");
      const optionArr = Array.from(options);
      let ans = undefined;
      optionArr.forEach((option) => {
        if (option.checked) {
          ans = option.id;
        }
      });
      return ans;
    },
  };
})();

const AppCtrl = ((ItemCtrl, UICtrl)=>{

const loadEvents = ()=>{
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".text-primary").style.display = "";
  });
  document.querySelector("#submit").addEventListener("click", startQuiz);
  document.querySelector("#submit-btn").addEventListener("click", submitAnswer);

}

let score = 0;
let secs = 60;
// Get question from the data object
const data = ItemCtrl.data();

function getSeconds() {
  secs--;
  if (secs < 1 ) {
    window.clearInterval(interval);
    const cardBody = document.querySelector(".card-body");
    cardBody.innerHTML = `You scored ${score} out of ${data.length}.`
    cardBody.style.textAlign = 'center';
    cardBody.style.fontSize = '20px';
  }else{
  document.querySelector(".time").textContent = `0:${secs}`;
  }
}
function startQuiz(e) {
  // Set time interval of 1 second
  interval = setInterval(getSeconds, 1000);
  // Display Submit button
  document.querySelector("#submit-btn").style.display = "block";
  // Hide Start quiz button
  document.querySelector("#submit").style.display = "none";
  // Hide the first text from UI
  document.querySelector(".text-primary").style.display = "none";
  // Display the first question 
  UICtrl.getData();
  e.preventDefault();
}
function submitAnswer() {
  
  // Get the id of the checked option from UI
  const answer = UICtrl.getOptionId();
 
  // If an answer is selected and seconds is greater than 1
  if (answer && secs > 1) {
    // If the id of the selected answer is equal to the question id
    if (answer === data[questionCount].correctAnswer) {
      score++;
      
    }
    questionCount++;
    if (questionCount < data.length) {
      UICtrl.getData();
    } else {
      window.clearInterval(interval);
      const cardBody = document.querySelector(".card-body");
      cardBody.innerHTML = `You scored ${score} out of ${data.length}.`;
      cardBody.style.textAlign = 'center';
      cardBody.style.fontSize = '20px';
      
    }
  } else {
    const cardBody = document.querySelector(".card-body");
    cardBody.innerHTML = `You scored ${score} out of ${data.length}.`;
    cardBody.style.textAlign = 'center';
    cardBody.style.fontSize = '20px';
  }
}

return{
  init: ()=>{
    loadEvents()
  }
}
})(ItemCtrl, UICtrl);

AppCtrl.init();