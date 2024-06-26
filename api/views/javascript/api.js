const btn = document.getElementById("btn");
const tirai = document.getElementsByClassName("tirai")[0];
const logo = document.getElementsByClassName("logo")[0];
const login = document.getElementById("login");
const signUp = document.getElementById("signUp");
const LOinput = login.getElementsByTagName("input");
const SOinput = signUp.getElementsByTagName("input");

const loop = (variable, param) => {
  let arr = [];
  let Rdata = Array.from(variable);
  Rdata.map((inp) => {
    arr.push(inp.value);
  });
  // return Rdata
  let data = {};
  if (param == "L") {
    arr.map(() => {
      data = {
        username: arr[0],
        password: arr[1],
      };
    })
    return data;
  }
  arr.map(() => {
    data = {
      username: arr[0],
      email: arr[1],
      password: arr[2],
    };
  });
  return data;
};

let i = 0;
btn.addEventListener("click", () => {
  tirai.classList.toggle("slide");
  if (i === 1) {
    Array.from(LOinput)
    .map((inp) => (inp.value = ""));
    i--;
  } else if (i === 0) {
    Array.from(SOinput)
    .map((inp) => (inp.value = ""));
    i++;
  }
});
document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = loop(LOinput, "L");
  fetch(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
});
document.getElementById("signUp").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = loop(SOinput);
  fetch(`/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
});
