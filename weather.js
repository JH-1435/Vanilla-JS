const weather = document.querySelector(".js-weather");
const API_KEY = "ff65e2f1aec72f400ee82c158681fa84"; // API 데이터 가져오기
const COORDS = "coords";
// span을 만드는 이유는 날짜값(현재 날씨 아이콘 이름)을 불러오기 위해서
const weather_Icon = document.querySelector(".weather__icon");
const weatherDescription = weather_Icon.querySelector("span");
const weatherLocation = document.querySelector(".weather__location")


//날짜 관련 설정("fetch(http://api.~~~~" == 현재위치 날짜 값 얻기)
function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        //json 으로 날씨 정보 얻기(json 에서 weather 의 첫번째[0]객체 에 접근)
        const weatherMain = json.weather[0].main;
        const weatherIcon = json.weather[0].icon;
        const temperature = json.main.temp;
        const place = json.name;

        // 날씨 이미지 불러오기
        weatherDescription.innerText = weatherMain;
        const weatherImg = document.createElement("img");
        weatherImg.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        weather_Icon.prepend(weatherImg);

        //온도와 현재 위치 지역 텍스트로 나타내기
        weatherLocation.innerText = `${Math.round(temperature)}℃ @ ${place} `;
        
        
    })
     /* 데이터를 얻는 방법 fetch,()안에 가져올 데이터가 들어가되, http:// 넣어주고, 
    단,  "",'' 가 아닌 무조건 `` 을 써야함, then()은 데이터가 완전히 들어온 다음 호출해줌
    then을 뒤에 붙힌 이유는 fetch가 완전히 실행된 다음 then함수를 실행 할거여서임 */
}

// 사용자 좌표 저장하기
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj) );
    //string으로 형변환 하여 저장.
}

//사용자 좌표(위도,경도) 불러오기
function handleGeoSucces(position){
   const latitude =  position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude
   };
   saveCoords(coordsObj); //saveCoords 호출. 
   getWeather(latitude, longitude);
}

//위치정보 못 읽었을때
function handleGeoError() {
    console.log("현 위치정보를 가져올 수 없음");
}

// 사용자 위치정보 읽기(허가구하기)
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

// 사용자 위치정보 판단하여 무엇을 하기
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
       const parseCoords = JSON.parse(loadedCoords); // appendChild()랑 같은 역할.
       getWeather(parseCoords.latitude, parseCoords.longitude); //좌표(위도,경도) 호출
    }
}

function init(){
    loadCoords();
}

init();