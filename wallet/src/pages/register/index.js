const onCallRegister = async(email, name) => {
try {
  const data = {
    email,
    name,
  }

  const response = await fetch("https://mp-wallet-app-api.herokuapp.com/user", 
  {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  );

  const user = await response.json();
  return user;

} catch (erro) {
  return {erro};
}
};


const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;

  if(name.length < 3) {
    alert("Nome deve conter mais de 3 caracters.");
    return;
  }

  if (email.length < 5 || !email.includes("@")) {
    alert("E-mail inválido!");
    return;
  }

  const result = await onCallRegister(email,name);

  
  if (result.erro) {
    alert("Falha ao validar o e-mail");
    return;
  }
localStorage.setItem("@walletapp:userEmail", result.email);
localStorage.setItem("@walletapp:userName", result.name);
localStorage.setItem("@walletapp:userId", result.id);
 window.open("../home/index.html", "_self"); 
};


window.onload = () => {
  const form = document.getElementById("form-register")
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };
};