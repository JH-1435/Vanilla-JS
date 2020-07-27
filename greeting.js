const form = document.querySelector(".js-form"),
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

    //로컬저장소에 유저네임을 저장함(텍스트 형태로)
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

// 누군가 submit 했을때 paintGreeting 을 해주고, 이름(currentValue)도 저장함
function handleSubmit(event) {
    event.preventDefault(); /* 이름을 입력하고 엔터(submit)하면 프로그램 
    되어진 대로 다른곳으로 가고 페이지가 새로고침 된다.고로 이 event 의 기본동작(기본값)을 
    막기위해(페이지가 새로고침 안되게) 설정 */
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
    }

//한개의 인자값(argument) == text  라고 함 
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN); //텍스트를 지움
    greeting.classList.add(SHOWING_CN); //텍스트 추가
    greeting.innerText = `Hello ${text}`; //내가보낸 text를 넣어줌
}
//프로그램을 불러오기만 함 => 프로그램을 저장 하지 않음.
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
      paintGreeting(currentUser);
    }
}
 
function init() {
    loadName(); //loadName 을 화면에 보여줌.
}

init();