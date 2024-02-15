const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromc=document.querySelector(".from select");
const toc=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(code in countryList){
        let newOpt=document.createElement("option");
        newOpt.innerText=code;
        newOpt.value=code;
        if(select.name ==="from" && code==="USD"){
            newOpt.selected="selected";
        }else if(select.name ==="to" && code==="INR"){
            newOpt.selected="selected";
        }
        select.append(newOpt);
    }

    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
}


const updateFlag=(ele)=>{
    let code=ele.value;
    let countrycode=countryList[code];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=ele.parentElement.querySelector("img");
    img.src=newSrc;
};
const update=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value=1
    }
    const url=`${BASE_URL}/${fromc.value.toLowerCase()}/${toc.value.toLowerCase()}.json`
    let resp=await fetch(url);
    let data=await resp.json();
    let rate=data[toc.value.toLowerCase()];

    let final=amtVal*rate;
    msg.innerText=`${amtVal} ${fromc.value} = ${final} ${toc.value}`;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    update();
});

window.addEventListener("load",()=>{
    update();
});
