const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  todoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

//사용자가 값을 치면 toDos array에 저장됨
let toDos = [];

function deleteToDo(event) {
    const btn = event.target; // 이벤트 에 포함된 타겟을 선택함
    const li = btn.parentNode; // 타겟에 포함된 parentNode == 즉 li가 있는곳 
    todoList.removeChild(li); //todoList에서 li를 지워줌 단, 새로고침하면 다시 나옴ㅠ 완벽히 없어지지 않음

     /* filter는 array의 모든 아이템을 통해(위한) 함수를 실행함
    그래서, false인 아이템은 거르고, true인 아이템들만 가지고 새로운 array를 만들어서 해당 값을 추출함 */
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); //모든 toDos.id가 li.id(자바스크립트로 형변환 == parseInt)와 같지 않을때
    });

    /* toDos를 cleanToDos의 id 로 설정.(지우면 더이상 그 잔재가 남아있지 않게 하기 위해)
    그러므로 let toDos = []; 를 해줌 const 는 상수 라서 값 변경 불가 */
    toDos = cleanToDos; 
    saveToDos();
}

// toDos를 가져와서 로컬저장소에 저장함
function saveToDos() {
    // JSON.stringify(값) : 자바스크립트 object를 string 으로 형변환 시켜줌
    // 로컬저장소는 자바스크립트 를 잘 인식못하기때문에 무조건 string으로 형변환 해주어야함
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 텍스트형식으로 보여줌 
function paintToDo(text) {

    //HTML에 원래 뭔가를 찾을때 쿼리셀렉터를 썻다면, HTML에 새로운것을 생성해주기 위해 create를 써줌
    const li = document.createElement("li"); // li 생성
    const delBtn = document.createElement("button"); // 삭제(delete)버튼 을 생성
    delBtn.innerText = "❌"; // 버튼에 이모지(이모티콘 == 텍스트 취급)을 넣어줌
    delBtn.addEventListener("click", deleteToDo); // 버튼을 클릭 하면 deletTo가 실행되면서 삭제함
    const span = document.createElement("span"); //span 생성
    span.innerText = text; // span에 text(사용자가 입력한 값)를 넣어줌
    const newId = toDos.length + 1; // array 안의 저장된 값이 몇개인지 알수 있음 array는 0부터 시작하니까 +1을 해줌

    // li에 span 과 delBtn을 포함 시켜줌 --- <li>  span, delBtn </li> 
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; // li 에 id값을 넣어줌
    todoList.appendChild(li); // </li></ul>
    const toDoObj = {
        text: text,
        id: newId  // li 에 id값을 넣어줌
    };
    toDos.push(toDoObj); // push를 써서, array 안에 엘리멘트 하나를 넣어줌
    saveToDos(); // push를 먼저한 이후 호출, array 에 있는것들을 로컬저장소에 넣음
}

// 이벤트 호출!
function handleSubmit(event){
    event.preventDefault(); //이벤트 기본값 으로 설정
    const currentValue = toDoInput.value; // 사용자가 적은 값 
    paintToDo(currentValue); //사용자가 적은 값  보여줌
    toDoInput.value = ""; // 사용자가 글을 적고 엔터를 치면 기본값(초기화상태 - 아무것도 없는 값)으로 변환함 

}

//로컬 저장소에서 저장한 값을 가져옴(사용자가 적은 값)
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    /* toDos 가 null인 상태면 항상 기본값으로 보여주기 때문에,
    null 이 아닌 상태만 있으면 된다. */
    if (loadedToDos !== null) {
        const parsedToDos  = JSON.parse(loadedToDos); //현재 오브젝트를 스트링으로 바꿧기에, 다시 자바스크립트로 바꿔서 가져옴

        /* foerEach는 기본적으로 array에 담겨있는 것들 각각에  한번씩 함수를 실행시켜줌,
        아래처럼 함수를 바로 호출하는게 아니라 안(function)에다 바로만듬
        즉, 지금 만들 이 함수를, parsedToDos에 있는 것들 각각에 대해 실행해줄  것 이므로, 그 각각을 toDo라고 칭함 */
        parsedToDos.forEach(function(toDo) {  
            paintToDo(toDo.text);  // toDo를 텍스트형식으로 화면에 출력함            
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
 }

init();
