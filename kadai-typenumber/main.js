//変数の初期化
let untyped='';
let typed='';
let score= 0;

//必要なHTMLの取得
const untypedfield =document.getElementById('untyped');
const typefield =document.getElementById('typed');
const warp =document.getElementById('warp');
const start =document.getElementById('start');
const count =document.getElementById('count');
const countPress =document.getElementsByClassName('keyPressCount');

//複数のテキストを格納する
const textLists =[
	'Hello World','This is my App','How are you?',
	'Today is sunny','I love JavaScript!','Good morning',
	'I am Japanese','Let it be','Samurai',
	'Typing Game','Information Technology',
	'I want to be a programmer','What day is today?',
	'I want to build a web app','Nice to meet you',
	'Chrome Firefox Edge Safari','machine learning',
	'Brendan Eich','John Resig','React Vue Angular',
	'Netscape Communications','undefined null NaN',
	'Thank you very much','Google Apple Facebook Amazon',
	'ECMAScript','console.log','for while if switch',
	'var let const','Windows Mac Linux iOS Android',
	'programming'
];


//ランダムなテキストを表示
const creatText =()=>{
	typed ='';
	typefield.textContent = typed;
	let randam =Math.floor(Math.random()*textLists.length);
	untyped= textLists[randam];
	untypedfield.textContent=untyped;
};


//キー入力の判定
const keyPredd =e=>{
	//誤タイプの場合
	if( e.key !== untyped.substring(0,1)){
		wrap.classList.add('mistyped');
		//100ms後に背景色を元に戻す
		setTimeout(()=>{
			wrap.classList.remove('mistyped');
		},100);
		return;
	}
	//正タイプの場合
	 score++;
	typed +=untyped.substring(0,1);
	untyped =untyped.substring(1);
	typefield.textContent = typed;
	untypedfield.textContent =untyped;
	countPress.textContent =score;
	

	//テキストが無くなったら新しいテキストを表示
	if(untyped ===''){
		creatText();
	}
};

const rankCheck =score =>{
	let text =``;
	if(score < 100){
		text =`あなたのランクはⅭです。\nBランクまであと${100-score}文字です。`;
	}
	else if(score<200){
		text =`あなたのランクはBです。\nAランクまであと${200-score}文字です。`;
	}
	else if(score<300){
		text =`あなたのランクはAです。\nSランクまであと${300-score}文字です。`;
	}
	else if(score>300){
		text =`あなたのランクはSです。\nおめでとうございます!`;
	}
	return `${score}文字打てました！\n ${text}\n【OK】リトライ/【キャンセル】終了`;
};

const gameOver = id =>{
	clearInterval(id);
	const result=confirm(rankCheck(score));

	//OKボタンをクリックしたらリロードする
	if(result ==true){
		window.location.reload();
	}
};

const timer =()=>{

	let time =count.textContent;

	const id = setInterval(()=>{
		time--;
		count.textContent =time;

		if(time <=0){
			gameOver(id);
		}
	},1000);
};

start.addEventListener('click',()=>{
	timer();
	creatText();
	start.style.display= 'none';
	document.addEventListener('keypress',keyPredd);
});

untypedfield.textContent ='スタートボタンで開始';





