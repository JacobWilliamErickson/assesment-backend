const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const seeFortuneBtn = document.getElementById("seeFortuneButton");
const seeComplimentBtn = document.getElementById("seeComplimentButton");
const requestContainer = document.querySelector('#request-container')
const form = document.getElementById('requestForm')
const baseURL = "http://localhost:4000/api"
const RequestCallback = ({ data: requests}) => displayRequests (requests)
const errCallback = err => console.log(err)
const getAllRequests = () => axios.get(baseURL).then(RequestCallback).catch(errCallback)
const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment").then((res) => {
    const data = res.data;
    alert(data);
  });
};
const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};
const createCompReq = (body) => {
    axios.post(baseURL,body).then(RequestCallback).catch(errCallback)
};
const deleteRequest = id => axios.delete(`${baseURL}/${id}`).then(RequestCallback).catch(errCallback)
const acceptRequest = id => {axios.put(`${baseURL}/${id}`).then(RequestCallback).catch(errCallback)}
const submitHandler = (e) => {
  e.preventDefault();
  let comptext = document.getElementById("comptext");
  let rank = document.getElementById("rank");
  let bodyObj = {
    comptext: comptext.value,
    rank: rank.value, 
}
  createCompReq(bodyObj);
  comptext.value= ''
  rank.value = ''
};
function createRequestCard(request) {
    const requestCard = document.createElement('div')
    requestCard.classList.add('house-card')

    requestCard.innerHTML = `
    <div id=card>
    <p class="id"> Id: ${request.id}</p>
    <p class="comptext">Compliment: ${request.comptext}</p>
    <p class="rank">User ranked it: ${request.rank}/10</p>
    <button onclick="acceptRequest(${request.id})">Accept</button>
    <button onclick="deleteRequest(${request.id})">Delete</button>
    </div>
    `


    requestContainer.appendChild(requestCard)
}
function displayRequests(arr) {
    requestContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createRequestCard(arr[i])
    }
}
seeFortune = () => {
    axios.get(`${baseURL}/fortunelist`).then((res) => {
        const data = res.data;
        alert(data);
      }).catch(errCallback)
}
seeCompliment = () => {
    axios.get(`${baseURL}/complimentlist`).then((res) => {
        const data = res.data;
        alert(data);
      }).catch(errCallback)
}
complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
seeFortuneBtn.addEventListener("click", seeFortune);
seeComplimentBtn.addEventListener("click", seeCompliment);
form.addEventListener('submit', submitHandler)
getAllRequests()