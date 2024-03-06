//変数の初期化
let untyped='';
let typed ='';
let score =''

//費用なHTML要素の取得
const untypedfield =document.getElementById('untyped');
const typedfield =document.getElementById('typed');
const wrap =document.getElementById('wrap');
const start=document.getElementById('start');
const count=document.getElementById('count');

//複数のテキストを格納する
const textLists =[
	'Hellow World',
	'This is my App',
	'How are you?',
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

//ランダムなテキストの表示
const creatText =()=>{
	//正しいタイプした文字列をクリア
	typed ='';
	typedfield.textContent=typed;

	//配列のインデックス数からランダムな数値を生成する
	let random =Math.floor(Math.random()*textLists.length);
	
	//配列からランダムにテキストを取得して表示する
	untyped=textLists[random];
	untypedfield.textContent =untyped;
};



//キーの入力判定
const keyPress = e =>{

	//誤ライプの場合
	if(e.key !==untyped.substring(0,1)){
		wrap.classList.add('mistyped');
		setTimeout(()=>{
			wrap.classList.remove('mistyped');
		},100)
		return;
	}

	//正ライプの場合
	//スコアのインクリメント
	score++;
	wrap.classList.remove('mistyped');
	typed += untyped.substring(0,1);
	untyped =untyped.substring(1);
	typedfield.textContent =typed;
	untypedfield.textContent=untyped;

	//テキストが無くなったら新しいテキストを表示
	if( untyped===''){
		creatText();
	}
		
};

//タイピングスキルのランク判定
const rankCheck =score=>{
	//テキストを格納する変数を作る
	let text='';

	//スコアに応じて異なるメッセージを変数textに格納する
	if(score <100){
		text=`あなたのランクはＣです。\nＢランクまであと${100-score}文字です。`;
	}else if(score <200){
		text=`あなたのランクはＢです。\nＡランクまであと${100-score}文字です。`;
	}else if(score <300){
		text=`あなたのランクＡはです。\nＳランクまであと${100-score}文字です。`;
	}else if(score >=300){
		text='おめでとうございます。\nあなたのランクはＳです。';
	}
	//生成したメッセージと一緒に文字列を返す
	return `${score}文字打てました！\n${text}\n【ＯＫ】リトライ/【キャンセル】終了`;
};

//ゲームを終了
const gameOver = () => {
    // ゲーム終了のメッセージを表示
	typedfield.textContent = ''
    untypedfield.textContent = 'タイムアップ';
    
    // ランク判定と結果の表示
	// 画面の更新が即座に反映されるように、setTimeoutを使ってランク判定とその結果の表示を非同期にする
    setTimeout(() => {
        const result = confirm(rankCheck(score));

        // OK（リトライ）が選択された場合、ページをリロード
        if (result) {
            window.location.reload();
        }
    }, 10);
}

//カウントダウンタイマー
const timer =()=>{
	//タイマー部分のHTML要素（ｐ要素）を取得する
	let time =count.textContent;

	const id=setInterval(() =>{
		//カウントダウンする
		time--;
		count.textContent =time;

		//タイマーの終了
		if(time <=0){
			clearInterval(id);
			gameOver(id);
		}
	},1000);
};

//ゲームスタート時の処理
start.addEventListener('click',()=>{

	//カウントダウンタイマーを開始する
	timer();

	//ランダムなテキストを表示する
	creatText();

	//「スタート」ボタンを非常にする
	start.style.display='none';

	//キーボードのイベント処理
	document.addEventListener('keypress',keyPress);

			
});

untypedfield.textContent='スタートボタンで開始';
