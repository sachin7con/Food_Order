// SGN
let takeOrderData = [];
function getMenu(){
  const menu = document.getElementById("menu");

  fetch(`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`)
    .then(response => response.json())
    .then(data => {
        takeOrderData = data;
        data.forEach(item => {

        const menuElement = document.createElement('div');


        const menuElementFooter = document.createElement('div');
        const menuElementFooterLeft = document.createElement('div');
        const menuElementFooterRight = document.createElement('div');

        const menuImage = document.createElement('img');
        const menuPrice = document.createElement('p');
        const name = document.createElement('p');
        const addSign = document.createElement('img');

        menuElementFooter.setAttribute('class', 'menuElementFooter');

        menuImage.setAttribute('class', 'menu');
        menuElement.setAttribute('class', 'card');
        addSign.setAttribute('class', 'addsign');
        menuImage.src = item.imgSrc;
        menuImage.alt = "Image of " + item.name;
        name.textContent = item.name;
        menuPrice.textContent = "$" + item.price + "/-";
        addSign.src = "./plus.svg";
        addSign.style.width = "35px";

        menuElementFooterLeft.appendChild(name);
        menuElementFooterLeft.appendChild(menuPrice);
        menuElementFooterRight.appendChild(addSign);

        menuElementFooter.appendChild(menuElementFooterLeft);
        menuElementFooter.appendChild(menuElementFooterRight);

        menuElement.appendChild(menuImage);
        menuElement.appendChild(menuElementFooter);



        menu.appendChild(menuElement);

      });
    })
    .catch(e => {
      console.error("Error: ", e);
    })
}

const order = {};
function TakeOrder(){

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for(let i=0; i<3; i++){
      const randomInt = Math.floor(Math.random() * 25);
      order[i] = takeOrderData[randomInt];
      }
      resolve(order);
    }, 2500);


  });
}

function orderPrep(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderStatus = {order_status:true, paid:false};
      resolve(orderStatus);
    }, 1500);
  });
}

function payOrder(){
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      resolve({order_status:true, paid:true});
    }, 1000);
  })
}

function thankyouFnc(){

    alert("thankyou for eating with us today!");

}


async function handleOrderProcess() {
      try {
        await getMenu();
        const order = await TakeOrder();
        console.log("Order:", order);
        const orderStatus = await orderPrep();
        console.log("Order preparation status:", orderStatus);
        const paymentStatus = await payOrder();
        console.log("Payment status:", paymentStatus);
        if (paymentStatus.paid) {
          thankyouFnc();
        }
      } catch (error) {
        console.error("Error in the order process:", error);
      }
    }

    // Start the order process when the page loads
    window.onload = handleOrderProcess;
