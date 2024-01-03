let tabla = document.getElementById("jelentkezok_tabla");
let uj_sor=document.getElementById("uj_sor");
let ujSorBeszuras_ablak=document.getElementById("ujSorBeszuras_ablak");
let elso_input=tabla.querySelector("input");

let button_t="";
for(let adat_tomb of adatok){
	let sor= document.createElement("tr");
	let cella=document.createElement("td");
	cella.innerHTML="<input type='checkbox' onchange='sorKijelolve(this);'>"
	sor.appendChild(cella);
	for(let adat in adat_tomb){
		cella=document.createElement("td");
		cella.innerHTML=adat_tomb[adat];
		cella.setAttribute("disabled", "");
		sor.appendChild(cella);
	}
	cella=document.createElement("td");
	szerkesztGomb(cella);
	cella.style.display="flex";
	torlesGomb(cella);
	sor.appendChild(cella);
	tabla.appendChild(sor);
}

uj_sor.addEventListener("click", function(){
	document.getElementById("ujSorBeszuras_ablak").style.display="block"
});

let btn_YesNo=document.getElementsByClassName("btn_YesNo");

let sorok = tabla.getElementsByTagName("tr");
sorok.max=sorok.length-1;
document.getElementById("sorok_szama_p").innerHTML=" Sorok száma: "+ sorok.max;

let kepzes=document.getElementById("kepzes");
let option=document.createElement("option");
option.setAttribute("value", "");
option.setAttribute("selected", "selected");
option.setAttribute("disabled", "disabled");
kepzes.appendChild(option);
let kivalasztott_kepzes=kepzes.value;
	for(let i=0; i<= kepzesek.length; i++)
	{
		option=document.createElement("option");
		option.innerHTML=kepzesek[i];
		kepzes.appendChild(option);
	}


function ujAdatMentes(){
	let parbeszed_ablak=document.getElementById("ujSorBeszuras_ablak");
	let input =parbeszed_ablak.getElementsByTagName("input");
	if(nincsMindenKitoltve(input)) {
		figyelmezteto("Minden adatot ki kell tölteni!");
		return;
	}
	let sor=document.createElement("tr");
	let cella=document.createElement("td");
	cella.innerHTML="<input type='checkbox' onchange='sorKijelolve(this);'>"
	sor.appendChild(cella);
	for(let elem of input){
		cella=document.createElement("td");
		cella.innerHTML=elem.value.trim();
		sor.appendChild(cella);
		elem.value="";
	}
	cella=document.createElement("td");
	cella.innerHTML=kepzes.value;
	sor.appendChild(cella);
	kepzes.value="";
	tabla.appendChild(sor);

	cella=document.createElement("td");
	szerkesztGomb(cella);
	cella.style.display="flex";
	torlesGomb(cella);
	sor.appendChild(cella);
	tabla.appendChild(sor);

	parbeszed_ablak.style.display="none";
	sorok.max=sorok.length-1;
    document.getElementById("sorok_szama_p").innerHTML=" Sorok száma: "+ sorok.max;
}



function ujAdatMegse(){
	let parbeszed_ablak=document.getElementById("ujSorBeszuras_ablak");
	parbeszed_ablak.removeAttribute("style");
	let input =parbeszed_ablak.getElementsByTagName("input");
	input[0].value="";
	input[1].value="";
	input[2].value="";
    input[3].value="";
}


let vezerlo1= document.getElementById("vezerlo1");
let vezerlo2= document.getElementById("vezerlo2");

function sorokTorlese(){
	let muveletMegerosit_ablak=document.getElementById("muveletMegerosit_ablak");
	muveletMegerosit_ablak.style.display="block";

	let megse=document.getElementById("megse");
	megse.addEventListener("click", function(){
		muveletMegerosit_ablak.style.display="none";
	})

	let igen=document.getElementById("igen");
	igen.addEventListener("click", function()
	{
		let jelolok= tabla.getElementsByTagName("input");
		jelolok=Array.from(jelolok);
		jelolok.forEach(function(input){
			if(input.checked){
				let sor= input.parentElement.parentElement;
				tabla.removeChild(sor);
			}
		});
		muveletMegerosit_ablak.style.display="none";
		vezerlo1.style.display="block";
        vezerlo2.style.display="none";
		sorok.max=sorok.length-1;
        document.getElementById("sorok_szama_p").innerHTML=" Sorok száma: "+ sorok.max;
	});
		
};


elso_input.addEventListener("click", function(){
	let jelolok= tabla.getElementsByTagName("input");
	jelolok=Array.from(jelolok);
	jelolok.shift();

	if(this.checked){
		vezerlo2.querySelector("span").innerHTML= jelolok.length + " sor kijelölve";
		vezerlo1.style.display="none";
		vezerlo2.style.display="block";
		for(let input of jelolok){
			input.checked=true;
			let szulo=input.parentElement.parentElement;
			let buttonok=szulo.querySelectorAll("button");
			for(let i of buttonok){
			i.setAttribute("disabled", "disabled");
			}
		}
	}
	else{
		vezerlo1.removeAttribute("style");
		vezerlo2.removeAttribute("style");
		for(let input of jelolok){
			input.checked=false;
			let szulo=input.parentElement.parentElement;
			let buttonok=szulo.querySelectorAll("button");
			for(let i of buttonok){
				i.removeAttribute("disabled");
			}
		}
	}
})

function sorKijelolve(input){
	let jelolok= tabla.getElementsByTagName("input");
	jelolok=Array.from(jelolok);
	jelolok2=Array.from(jelolok);
	jelolok.shift();


	let bejelolve_db=jelolok.reduce(function(total, input){
		if(input.checked){
			return total +1;}
		else return total;
	}, 0);


	if(input.checked){
		let szulo=input.parentElement.parentElement;
		let buttonok=szulo.querySelectorAll("button");
		for(let i of buttonok){
			i.setAttribute("disabled", "disabled");
		}
		
	}
	else{
		let szulo=input.parentElement.parentElement;
		let buttonok=szulo.querySelectorAll("button");
		for(let i of buttonok){
			i.removeAttribute("disabled");
		}
	}
	if(bejelolve_db>0){
		vezerlo1.style.display="none";
        vezerlo2.style.display="block";
        vezerlo2.querySelector("span").innerHTML= bejelolve_db + " sor kijelölve";
	}
    else{
        vezerlo1.removeAttribute("style");
        vezerlo2.removeAttribute("style");
		sorok.max=sorok.length-1;
        document.getElementById("sorok_szama_p").innerHTML=" Sorok száma: "+ sorok.max;
    }
	if(bejelolve_db==sorok.length-1){
		elso_input.checked=true;
		vezerlo1.style.display="none";
        vezerlo2.style.display="block";
        vezerlo2.querySelector("span").innerHTML= bejelolve_db + " sor kijelölve";
	}
	if(bejelolve_db<sorok.length-1){
		elso_input.checked=false;
	}

}

function torlesMegse(){
	let jelolok= tabla.getElementsByTagName("input");
	jelolok=Array.from(jelolok);
	vezerlo1.removeAttribute("style");
	vezerlo2.removeAttribute("style");
	let bejelolve_db=jelolok.forEach(function(input){
		input.checked=false;
		let szulo=input.parentElement.parentElement;
		let buttonok=szulo.querySelectorAll("button");
		for(let i of buttonok){
			i.removeAttribute("disabled");
		}
	});
}


function nincsMindenKitoltve(input){
	input=Array.from(input);
	let nincs=input.some(function(elem){
		return elem.value.trim().length==0;
	});
	return nincs;
}

function figyelmezteto(uzenet){
	let div=document.createElement("div");
	div.innerHTML=uzenet;
	div.style.padding="15px";
	div.style.backgroundColor="#ff9800";
	div.style.color="#fff";
	div.style.position="absolute";
	div.style.top="12%";
	div.style.left="0";
	div.style.right="0";
	div.style.margin="auto";
	div.style.width="500px";
	let szulo=document.getElementById("ujSorBeszuras_ablak");
	szulo.appendChild(div);
	setTimeout(blokkEltuntetes,2020,szulo,div,1);
}
function blokkEltuntetes(szulo, elem,opa){
	opa-=0.1;
	elem.style.opacity=opa;
	if(opa>0){
		setTimeout(blokkEltuntetes,2020,szulo,elem, opa);
	}else{
		szulo.removeChild(elem);
	}
}


function torlesGomb(td){
	 button_t=document.createElement("button");
	let i=document.createElement("i");
	button_t.appendChild(i);
	i.setAttribute("class", "far fa-trash-alt");
	button_t.setAttribute("data-tooltip", "Törlés");

	button_t.classList.add("hide");
	button_t.classList.add("edit_btn");
	button_t.classList.add("transparent");
	button_t.style.display="flex";
	td.appendChild(button_t);
	button_t.addEventListener("click", function(){
		let torol=td.parentElement;
		torol.remove();
	});
	/*button_t.addEventListener("mouseover", function(){
		
	})*/

}

function szerkesztGomb(td){
	let button=document.createElement("button");
	let i=document.createElement("i");
	button.appendChild(i);
	i.setAttribute("class", "far fa-edit");
	button.setAttribute("data-tooltip", "Szerkesztés");

	button.classList.add("hide");
	button.classList.add("edit_btn");
	button.classList.add("transparent");

	td.appendChild(button);

	//Szerkeszt gomb kattintás
	button.addEventListener("click", function(){
		button.style.display="none";

		/*let torles_button=document.getElementsByClassName("far fa-trash-alt");
		console.log(torles_button);
		torles_button.style.display="none";*/

		let sor=this.parentElement.parentElement;	
		let elso_input=sor.querySelector("input");
		elso_input.setAttribute("disabled", "disabled");


		let szerkeszto_cellak=sor.getElementsByTagName("td");
		szerkeszto_cellak=Array.from(szerkeszto_cellak);
		let regi=[];
		for(let sz=1; sz< szerkeszto_cellak.length-2; sz++ ){
			regi[sz-1]=szerkeszto_cellak[sz].innerText;
			szerkeszto_cellak[sz].innerHTML="<input type=text>";
			let input=szerkeszto_cellak[sz].querySelector("input");
			input.setAttribute("value", regi[sz-1]);
		}

		let kivalasztott=szerkeszto_cellak[5].innerHTML;
		szerkeszto_cellak[5].innerHTML="<select></select>";
		let select=szerkeszto_cellak[5].querySelector("select");
		for(let k of kepzesek){
			let option=document.createElement("option");
			option.setAttribute("value", k);
			option.innerHTML=k;
			select.appendChild(option);
		}
		select.value=kivalasztott;
		select.setAttribute("data-value", kivalasztott);

		//Mentés
		let button1=document.createElement("button");
		let i=document.createElement("i");
		button1.appendChild(i);
		i.setAttribute("class", "far fa-check-circle");
		i.setAttribute("data-tooltip", "Mentés");
		button1.classList.add("hide");
		button1.classList.add("edit_btn");
		button1.classList.add("transparent");
		button1.style.display="flex";
		td.appendChild(button1);


		button1.addEventListener("click", function(){
			for(let sz=1; sz< szerkeszto_cellak.length-2; sz++ ){
				let input=szerkeszto_cellak[sz].querySelector("input");
				szerkeszto_cellak[sz].innerHTML=input.value;
			}
			let select=szerkeszto_cellak[5].querySelector("select");
			szerkeszto_cellak[5].innerHTML=select.value;
			button1.remove();
			button2.remove();
			button.style.display="flex";
			elso_input.removeAttribute("disabled");
		})

		//Mégse
		let button2=document.createElement("button");
		 i=document.createElement("i");
		button2.appendChild(i);
		i.setAttribute("class", "far fa-times-circle");
		i.setAttribute("data-tooltip", "Mégse");
		button2.classList.add("hide");
		button2.classList.add("edit_btn");
		button2.classList.add("transparent");
		button2.style.display="flex";
		td.appendChild(button2);

		button2.addEventListener("click", function(){
			for(let sz=1; sz< szerkeszto_cellak.length-2; sz++ ){
				let input=szerkeszto_cellak[sz].querySelector("input");
				if(input.hasAttribute("value")){
					let value_attributum = input.getAttribute("value");
					szerkeszto_cellak[sz].innerHTML=value_attributum;
				}
			}
			szerkeszto_cellak[5].innerHTML=select.dataset.value;
			button1.remove();
			button2.remove();
			button.style.display="flex";
			elso_input.removeAttribute("disabled");
		})


	});

}

//Tooltip


let tooltip = document.createElement("div");
let szoveg = document.createElement("p");
let nyil = document.createElement("div");
tooltip.classList.add("tooltip");
tooltip.appendChild(szoveg);
tooltip.appendChild(nyil);

document.addEventListener("mouseover", function(event){
    let elem = event.target;
	if(elem.closest("[data-tooltip]") != null)
		elem=elem.closest("[data-tooltip]");
    if(elem.dataset.tooltip == undefined)
        return;

    tooltip.querySelector("p").innerHTML = elem.dataset.tooltip;
    elem.appendChild(tooltip);

    tooltip.style.top = (tooltip.offsetHeight + 10) + "px";
    tooltip.style.left = (elem.offsetWidth - tooltip.offsetWidth)/2 + "px";
});

document.addEventListener("mouseout", function(event){
    let elem = event.target;
	if(elem.closest("[data-tooltip]") != null)
		elem=elem.closest("[data-tooltip]");
    if(elem.dataset.tooltip == undefined)
        return;

    elem.removeChild(tooltip);
});


