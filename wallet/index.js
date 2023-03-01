const validateUser = async (email) => {
 try {
  const result = await fetch(
    'https://mp-wallet-app-api.herokuapp.com/user?email=${email}'
  );
  const user = await result.json();
  return user;
 } catch(erro) {
  return{erro};
 }

 };



const onClickLogin = async () => {
  const email = document.getElementById('input-email').value;
  if (email.length < 5 || !email.includes("@")) {
    alert("E-mail inválido!");
    return;
  }
  const result = await validateUser(email);

  if (result.erro) {
    alert("Falha ao validar o e-mail");
    return;
  }
localStorage.setItem("@walletapp:userEmail", result.email);
localStorage.setItem("@walletapp:userName", result.name);
localStorage.setItem("@walletapp:userId", result.id);
 window.open("./src/pages/home/index.html", "_self"); 
};