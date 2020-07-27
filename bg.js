const body = document.querySelector("body");

const IMG_NUMBER = 5;

//백그라운드 이미지 랜덤하게 불러오기
function paintImage(imgNumber) {
    const image = new Image(); // Image()를 image(변수)로 복사해서 새로 만듬
    image.src = `/images/${imgNumber + 1}.jpg`// 이미지 넘버가 0 부터 시작하므로 +1 을 해줌
    image.classList.add("bgImage"); // image 안에 클래스 추가 이름==변수(bgImage)
    body.appendChild(image); //body 안에 image 추가(appendChild 즉 HTML에 직접 추가하는 방법임)
}

//백그라운드 이미지에 랜덤하게 불러올수 있도록 지정 하는법
function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER); /* Math 함수(수학)사용. floor(바닥 즉 버림),ceil(천장 즉 올림)으로 쓰임
Math.random() <= 랜덤으로 숫자를 뽑음. 몇개? 3개만 즉 3을 곱함(IMG_NUMBER) floor 이므로 소수점 전부 버림 */
    return number;
}

//화면에 추출(보여주기)
function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();