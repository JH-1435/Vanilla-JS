/* clockContainer 이라는 변수안에 document(웹페이지에 존재하는 HTML에 접근하기 위한 객체
.js-clock 이라는 속상값을 가진  요소를 선택함.) */
const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".js-title");

//getTime 이라는 함수  변수를 만듬
//$ == document 같은의미로 쓰임. $()은 j쿼리이다.
function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds }`; // clockTitle 변수 안에 텍스트를 넣어줌
    /* ${seconds 가 < 10 보다 작으면(? == 만약) `0${seconds}`0을 포함한 세컨드스로 리턴함, else(:) 일반 seconds 추출} */
}
function init() {
    getTime();
    setInterval(getTime, 1000);  /* setInterval(a , b)두 인자값(argument)을 받는데,첫번째 인자로 실행할  함수를 받고,
    두번째 인자는 실행할 시간 간격을 받음. 1초당 1000 */
}

init(); //init인 객체들을 보호해주기에 넣어줌.