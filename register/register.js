document.getElementById("requestBtn").addEventListener("click", () => {
    const verifyBox = document.querySelector(".verify-area");
    verifyBox.classList.remove("hidden");   // 인증창 표시

 

});

document.addEventListener('DOMContentLoaded', () => {
       // 이름 입력창 선택
    const usernameInput = document.querySelector('.username');

    // 입력 중 숫자/특수문자 자동 제거
    usernameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
    });

    // 전화번호 선택
    const phoneInputs = document.querySelectorAll('.phone');

    // 입력 중 글자/특수문자 자동 제거
    phoneInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, "");
        });
    });

    // 학번 선택
    const studentInput = document.querySelector('.student-id');

    // 입력 중 글자/특수문자 자동 제거
    studentInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });
    // 생년월일 선택
    const birthInput = document.querySelector('.birth');

    // 입력 중 글자/특수문자 자동 제거
    birthInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });
    // 생년월일 선택
    const birthfirstInput = document.querySelector('.birth-first');

    // 입력 중 글자/특수문자 자동 제거
    birthfirstInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });

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

const verifyInput = document.querySelector('.verify-code');
const verifyWrapper = document.querySelector('.verify-wrapper');

verifyInput.addEventListener('focus', () => {
    verifyWrapper.classList.add('focus');
});

verifyInput.addEventListener('blur', () => {
    verifyWrapper.classList.remove('focus');
});









document.querySelector(".submit-btn").addEventListener("click", async () => {
    const data = {
        student_id: document.querySelector(".student-id").value,
        password: document.querySelector(".password").value,
        username: document.querySelector(".username").value,
        birth: document.querySelector(".birth").value,
        birth_first: document.querySelector(".birth-first").value,
        phone: 
            document.querySelectorAll(".phone")[0].value + "-" +
            document.querySelectorAll(".phone")[1].value + "-" +
            document.querySelectorAll(".phone")[2].value,
        carrier: document.querySelector(".carrier").value
    };

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if(result.success) {
        alert("회원가입 완료!");
        location.href = "login.html";
    } else {
        alert("회원가입 실패");
    }
});