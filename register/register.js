document.getElementById("requestBtn").addEventListener("click", () => {
    const verifyBox = document.querySelector(".verify-area");
    verifyBox.classList.remove("hidden");   // 인증창 표시
});

let timerInterval = null;

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);  // 중복 방지

    let time = 180; // 3분

    const timer = document.getElementById("timer");

    timerInterval = setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time % 60;

        // mm:ss 형태로 맞추기
        sec = sec < 10 ? "0" + sec : sec;

        timer.innerText = `${min}:${sec}`;
        time--;

        if (time < 0) {
            clearInterval(timerInterval);
            timer.innerText = "만료";
        }
    }, 1000);
}

// 버튼 클릭 시 타이머 시작
document.getElementById("requestBtn").addEventListener("click", () => {
    startTimer();
});