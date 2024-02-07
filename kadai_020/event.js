const btN = document.getElementById('btn');

const texT1=document.getElementById('text'); 
const texT2=document.getElementById('text2');


btN.addEventListener('click',()=>{
	texT1.style.display='none';
	texT2.style.display='block';
});

