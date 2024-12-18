const tasks = [
  {
    videoUrl: "https://www.youtube.com/embed/ER9SspLe4Hg",
    question:
      "Which of the following is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctAnswer: "var",
  },
  {
    videoUrl: "https://www.youtube.com/embed/IymPq7ik29k",
    question: "Which of the following is true about MongoDB?",
    options: [
      "It is a relational database management system.",
      "It stores data in JSON-like documents.",
      "It does not support indexing.",
      "It requires predefined schemas for collections.",
    ],
    correctAnswer: "It stores data in JSON-like documents",
  },
  {
    videoUrl: "https://www.youtube.com/embed/ajdRvxDWH4w",
    question:
      "Which of the following is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctAnswer: "var",
  },
  {
    videoUrl: "https://www.youtube.com/embed/DsQssLQnu9o",
    question: "Which is the largest state of India by area?",
    options: ["Maharashtra", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh"],
    correctAnswer: "Rajasthan",
  },
  {
    videoUrl: "https://www.youtube.com/embed/IOeERbTl7go",
    question: "Who is known as the Father of the Indian Constitution?",
    options: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Dr. B.R. Ambedkar",
      "Sardar Patel",
    ],
    correctAnswer: "Dr. B.R. Ambedkar",
  },
  {
    videoUrl: "https://www.youtube.com/embed/bUSO6ZEHqOo",
    question: "Which Indian scientist is known as the 'Missile Man of India'?",
    options: [
      "Homi Bhabha",
      "C.V. Raman",
      "Vikram Sarabhai",
      "A.P.J. Abdul Kalam",
    ],
    correctAnswer: "A.P.J. Abdul Kalam",
  },
  {
    videoUrl: "https://www.youtube.com/embed/IvrUTGiTFA0",
    question: "Which festival is called the 'Festival of Lights'?",
    options: ["Holi", "Diwali", "Pongal", "Eid"],
    correctAnswer: "Diwali",
  },
  {
    videoUrl: "https://www.youtube.com/embed/bcRFqs75FZg",
    question: "What is the national animal of India?",
    options: ["Peacock", "Lion", "Tiger", "Elephant"],
    correctAnswer: "Tiger",
  },
  {
    videoUrl: "https://www.youtube.com/embed/hQpmpEalwIA",
    question: "What is the currency of India?",
    options: ["Dollar", "Euro", "Yen", "Rupee"],
    correctAnswer: "Rupee",
  },
  {
    videoUrl: "https://www.youtube.com/embed/ybLhLfkQu8Y",
    question: "Who was the first Prime Minister of India?",
    options: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Sardar Patel",
      "Lal Bahadur Shastri",
    ],
    correctAnswer: "Jawaharlal Nehru",
  },
];

function addAccessibleFeedback(text, isSuccess) {
  const feedbackSection = document.getElementById("feedback-section");
  feedbackSection.innerHTML = `
    <div role="alert" class="p-3 mt-4 rounded ${
      isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }">
      ${text}
    </div>`;
}

function loadAssessment(task, taskIndex) {
  const container = document.getElementById(
    `assessment-container-${taskIndex}`
  );
  container.innerHTML = `
    <p class="text-lg font-semibold">${task.question}</p>
    <div class="mt-3">
      ${task.options
        .map(
          (option, index) => `
        <div class="flex items-center mb-2">
          <input
            type="radio"
            id="option-${taskIndex}-${index}"
            name="answer-${taskIndex}"
            value="${option}"
            class="mr-2 leading-tight"
            aria-label="Option ${index + 1}"
          />
          <label for="option-${taskIndex}-${index}" class="text-gray-800 dark:text-gray-100">${option}</label>
        </div>
      `
        )
        .join("")}
    </div>
    <button
      onclick="checkAnswer(${taskIndex})"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600"
    >
      Submit
    </button>`;
}

function checkAnswer(taskIndex) {
  const task = tasks[taskIndex];
  const selectedOption = document.querySelector(
    `input[name="answer-${taskIndex}"]:checked`
  );

  if (!selectedOption) {
    addAccessibleFeedback("Please select an answer before submitting.", false);
    return;
  }

  const answer = selectedOption.value;
  if (answer === task.correctAnswer) {
    addAccessibleFeedback("Correct! Great job!", true);
  } else {
    addAccessibleFeedback("Incorrect. Please try again.", false);
  }
}

function onPlayerStateChange(event, taskIndex) {
  // When video ends (state = 0), scroll to the assessment section
  if (event.data === YT.PlayerState.ENDED) {
    scrollToAssessment(taskIndex);
  }
}

function scrollToAssessment(taskIndex) {
  const assessmentSection = document.getElementById(
    `assessment-container-${taskIndex}`
  );
  assessmentSection.scrollIntoView({ behavior: "smooth" });
}

let players = [];
function onYouTubeIframeAPIReady() {
  tasks.forEach((task, index) => {
    players.push(
      new YT.Player(`player-${index}`, {
        height: "390",
        width: "640",
        videoId: task.videoUrl.split("/")[4],
        playerVars: { playsinline: 1 },
        events: {
          onStateChange: (event) => onPlayerStateChange(event, index),
        },
      })
    );
  });
}

function loadAllTasks() {
  const taskContainer = document.getElementById("task-container");
  tasks.forEach((task, index) => {
    taskContainer.innerHTML += `
      <div id="task-${index}" class="mb-10 video-section">
        <div class="mb-4">
          <iframe 
            id="player-${index}"
            src="${task.videoUrl}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            class="w-full h-64 rounded-lg shadow-lg bg-black"
          ></iframe>
        </div>
        <div id="assessment-container-${index}" class="assessment-section mt-4"></div>
      </div>
    `;
    loadAssessment(task, index);
  });
}

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    themeToggle.textContent = "🌙";
  } else {
    html.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
});

window.onscroll = function () {
  const moveToTopBtn = document.getElementById("moveToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    moveToTopBtn.style.display = "block";
  } else {
    moveToTopBtn.style.display = "none";
  }
};

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onload = loadAllTasks;
