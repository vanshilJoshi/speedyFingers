const typingTest = document.querySelector(".part .text"),
inpField = document.querySelector(".input"),
timetag = document.querySelector(".timer-sec"),
mistakeTag = document.querySelector(".display .mistakes"),
wpmTag = document.querySelector(".wpm"),
cpmTag = document.querySelector(".cpm");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingTest.innerHTML += spanTag;
    });
    typingTest.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingTest.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingTest.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
    if(!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    if(typedChar == null) {
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect")){
            mistakes--;
        }
        characters[charIndex].classList.remove("correct","incorrect");
    } else {
    if(characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
    } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;
} else {
    inpField.value = "";
    clearInterval(timer);
}
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timetag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

randomParagraph();
inpField.addEventListener("input", initTyping);