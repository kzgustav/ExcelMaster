(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],S={i:0,f:'all',q:'',raw:{},a:'A1',p:JSON.parse(localStorage.em_progress||'{}'),b:JSON.parse(localStorage.em_books||'{}')};
const R={list:$('#challengeList'),search:$('#searchBox'),random:$('#randomBtn'),prev:$('#prevBtn'),next:$('#nextBtn'),meta:$('#challengeMeta'),title:$('#challengeTitle'),scenario:$('#challengeScenario'),inst:$('#challengeInstruction'),hints:$('#challengeHints'),tags:$('#functionTags'),addr:$('#activeAddress'),bar:$('#formulaBar'),grid:$('#grid'),check:$('#checkBtn'),reset:$('#resetBtn'),answer:$('#answerBtn'),fb:$('#feedback'),gloss:$('#glossary'),done:$('#statCompleted'),tried:$('#statAttempted'),best:$('#statBest')};
for(const [a,b] of [['.main','workspace'],['.challenge-head','challenge-topline'],['#functionTags','tag-row'],['.task-box','task-card'],['.formula-row','sheet-toolbar'],['.grid-wrap','sheet-wrap'],['.two-col','split-row']])document.querySelector(a)?.classList.add(b);
const csv={sales:`ID,地域,担当,商品,数量,単価,売上,日付,状態
1001,東日本,佐藤,ノートPC,4,120000,480000,2026-01-08,完了
1002,西日本,山田,モニター,12,38000,456000,2026-01-10,完了
1003,東日本,鈴木,マウス,45,2600,117000,2026-01-15,処理中
1004,中部,佐藤,ドック,9,28000,252000,2026-01-18,完了
1005,西日本,高橋,ノートPC,3,120000,360000,2026-01-22,完了
1006,東日本,高橋,キーボード,28,7800,218400,2026-02-02,完了
1007,九州,山田,ノートPC,5,120000,600000,2026-02-05,処理中
1008,中部,鈴木,モニター,10,38000,380000,2026-02-07,完了
1009,東日本,佐藤,モニター,16,38000,608000,2026-02-12,完了
1010,西日本,鈴木,Webカメラ,22,9200,202400,2026-02-13,完了`,prod:`商品,カテゴリ,標準単価,粗利率
ノートPC,PC,120000,22%
モニター,周辺機器,38000,18%
マウス,周辺機器,2600,35%
キーボード,周辺機器,7800,31%
ドック,周辺機器,28000,25%
Webカメラ,周辺機器,9200,29%
タブレット,PC,65000,20%`,score:`受講者,部署,Excel,SQL,BI,提出
高橋,営業,82,78,88,提出済
鈴木,開発,76,92,84,提出済
田中,営業,91,65,79,未提出
佐藤,人事,68,74,72,提出済
山田,開発,95,88,90,提出済
伊藤,営業,73,71,69,提出済`,text:`氏名,メール,商品コード,メモ
佐藤 花子,hanako.sato@example.co.jp,PC-2026-001,  VIP 顧客  
鈴木 海,kai.suzuki@example.net,MN-2026-022,要フォロー
田中 陸,riku.tanaka@example.com,KB-2026-105,
山田 空,sora.yamada@example.co.jp,WC-2026-011,至急`,emp:`社員ID,氏名,部署,等級,評価,売上,入社日,在宅日数
E001,佐藤,営業,G3,4,7200000,2021-04-01,6
E002,鈴木,開発,G4,5,0,2019-10-15,12
E003,高橋,営業,G2,3,5100000,2023-01-10,3
E004,田中,人事,G3,4,0,2020-07-01,8`,date:`案件,開始日,終了日,期限,担当
A,2026-04-01,2026-04-30,2026-05-10,佐藤
B,2026-04-10,2026-05-20,2026-06-01,鈴木
C,2026-05-01,2026-06-15,2026-06-30,田中`};
const qs=`s01|中級|条件集計|SUMIFS：東日本ノートPC売上|sales|P2|SUMIFS|=SUMIFS(G2:G11,B2:B11,~東日本~,D2:D11,~ノートPC~)|東日本かつノートPCの売上合計|480,000
s02|中級|条件集計|COUNTIFS：西日本完了件数|sales|P2|COUNTIFS|=COUNTIFS(B2:B11,~西日本~,I2:I11,~完了~)|西日本かつ完了の件数|3
s03|中級|条件集計|AVERAGEIFS：東日本完了平均|sales|P2|AVERAGEIFS|=AVERAGEIFS(G2:G11,B2:B11,~東日本~,I2:I11,~完了~)|東日本かつ完了の売上平均|435,467
s04|中級|条件集計|MAXIFS：モニター最高売上|sales|P2|MAXIFS|=MAXIFS(G2:G11,D2:D11,~モニター~)|モニターの最高売上|608,000
s05|中級|条件集計|MINIFS：東日本最低売上|sales|P2|MINIFS|=MINIFS(G2:G11,B2:B11,~東日本~)|東日本の最低売上|117,000
s06|上級|配列計算|SUMPRODUCT：数量×単価|sales|P2|SUMPRODUCT|=SUMPRODUCT(E2:E11,F2:F11)|数量×単価の総額|3,474,800
s07|中級|集計|COUNTIF：PCを含む商品|prod|P2|COUNTIF|=COUNTIF(A2:A8,~*PC*~)|PCを含む商品名の件数|1
s08|中級|集計|COUNTBLANK：空白メモ|text|F2|COUNTBLANK|=COUNTBLANK(D2:D5)|メモ列の空白数|1
n01|中級|数値|ROUND：平均売上を整数化|sales|P2|ROUND|=ROUND(AVERAGE(G2:G11),0)|平均売上を四捨五入|347,480
n02|中級|数値|ROUNDUP：千円単位切上げ|sales|P2|ROUNDUP|=ROUNDUP(AVERAGE(G2:G11),-3)|平均売上を千円単位切上げ|348,000
n03|中級|数値|ROUNDDOWN：千円単位切捨て|sales|P2|ROUNDDOWN|=ROUNDDOWN(AVERAGE(G2:G11),-3)|平均売上を千円単位切捨て|347,000
l01|中級|検索|XLOOKUP：Webカメラカテゴリ|sales|P2|XLOOKUP|=XLOOKUP(~Webカメラ~,K2:K8,L2:L8)|Webカメラのカテゴリ|周辺機器
l02|中級|検索|XLOOKUP：未登録対応|sales|P2|XLOOKUP|=XLOOKUP(~プリンター~,K2:K8,M2:M8,~未登録~)|ない商品は未登録表示|未登録
l03|中級|検索|VLOOKUP：マウス粗利率|sales|P2|VLOOKUP|=VLOOKUP(~マウス~,K2:N8,4,FALSE)|マウスの粗利率|35%
l04|上級|検索|INDEX＋MATCH：キーボード単価|sales|P2|INDEX・MATCH|=INDEX(M2:M8,MATCH(~キーボード~,K2:K8,0))|INDEXとMATCHで単価|7,800
l05|中級|検索|XMATCH：タブレット位置|sales|P2|XMATCH|=XMATCH(~タブレット~,K2:K8)|商品マスタ内の位置|7
d01|365|動的配列|FILTER：完了行抽出|sales|P2|FILTER|=FILTER(A2:I11,I2:I11=~完了~)|完了行だけ抽出|完了行
d02|365|動的配列|UNIQUE：地域一覧|sales|P2|UNIQUE|=UNIQUE(B2:B11)|地域の重複なし一覧|東日本/西日本/中部/九州
d03|365|動的配列|SORT：売上降順|sales|P2|SORT|=SORT(A2:I11,7,-1)|売上降順に並べ替え|降順
d04|365|動的配列|TAKE＋SORT：上位5件|sales|P2|TAKE・SORT|=TAKE(SORT(A2:I11,7,-1),5)|売上上位5件|上位5件
d05|365|動的配列|CHOOSECOLS：必要列だけ|sales|P2|CHOOSECOLS|=CHOOSECOLS(A1:I11,1,4,7,9)|注文ID・商品・売上・状態|4列
d06|365|動的配列|HSTACK：氏名と提出|score|H2|HSTACK|=HSTACK(A2:A7,F2:F7)|受講者と提出状況を横結合|2列
d07|365|動的配列|VSTACK：見出し＋営業|score|H2|VSTACK・FILTER|=VSTACK(A1:F1,FILTER(A2:F7,B2:B7=~営業~))|見出しと営業行を縦結合|営業一覧
d08|365|動的配列|SEQUENCE：10から5刻み|sales|P2|SEQUENCE|=SEQUENCE(5,1,10,5)|10から5刻みの連番|10,15,20,25,30
t01|中級|文字列|TEXTBEFORE：ユーザー名|text|F2|TEXTBEFORE|=TEXTBEFORE(B2,~@~)|メールの@より前|hanako.sato
t02|中級|文字列|TEXTAFTER：ドメイン|text|F2|TEXTAFTER|=TEXTAFTER(B2,~@~)|メールの@より後|example.co.jp
t03|365|文字列|TEXTSPLIT：コード分割|text|F2|TEXTSPLIT|=TEXTSPLIT(C2,~-~)|商品コードを分割|PC/2026/001
t04|中級|文字列|LEFT＋FIND：先頭コード|text|F2|LEFT・FIND|=LEFT(C2,FIND(~-~,C2)-1)|最初のハイフンより前|PC
t05|中級|文字列|MID：年度抽出|text|F2|MID|=MID(C2,4,4)|商品コードから年度|2026
t06|中級|文字列|RIGHT：末尾番号|text|F2|RIGHT|=RIGHT(C2,3)|末尾3桁|001
t07|中級|文字列|SEARCH＋ISNUMBER：PC判定|text|F2|SEARCH・ISNUMBER|=ISNUMBER(SEARCH(~PC~,C2))|PCを含むか判定|TRUE
t08|中級|文字列|SUBSTITUTE：ハイフン除去|text|F2|SUBSTITUTE|=SUBSTITUTE(C2,~-~,~~)|ハイフン削除|PC2026001
t09|中級|文字列|TRIM：空白整理|text|F2|TRIM|=TRIM(D2)|余分な空白を整理|VIP 顧客
t10|中級|文字列|LOWER：小文字化|text|F2|LOWER|=LOWER(B2)|メールを小文字化|hanako.sato@example.co.jp
t11|上級|文字列|PROPER：先頭大文字化|text|F2|PROPER・TEXTBEFORE|=PROPER(TEXTBEFORE(B2,~@~))|@前を先頭大文字化|Hanako.Sato
t12|中級|文字列|CONCAT：表示名作成|text|F2|CONCAT|=CONCAT(A2,~ <~,B2,~>~)|氏名 <メール>を作成|表示名
t13|中級|文字列|TEXTJOIN：氏名一覧|text|F2|TEXTJOIN|=TEXTJOIN(~ / ~,TRUE,A2:A5)|氏名を区切って結合|氏名一覧
j01|中級|論理|IF：合格判定|score|H2|IF|=IF(C2>=80,~合格~,~要確認~)|80以上なら合格|合格
j02|上級|論理|IFS：ランク付け|score|H2|IFS|=IFS(C2>=90,~S~,C2>=80,~A~,C2>=70,~B~,TRUE,~C~)|S/A/B/Cランク|A
j03|上級|論理|SWITCH：部署コード|emp|J2|SWITCH|=SWITCH(C2,~営業~,~Sales~,~開発~,~Dev~,~人事~,~HR~,~Other~)|部署を英語コード化|Sales
j04|中級|論理|AND：優秀営業|emp|J2|AND|=AND(C2=~営業~,E2>=4,F2>=6000000)|営業かつ高評価高売上|TRUE
j05|中級|論理|OR：要フォロー|emp|J2|OR|=OR(E2<=2,H2>=12)|評価2以下または在宅12以上|FALSE
dt01|中級|日付|EOMONTH：月末日|date|G2|EOMONTH|=EOMONTH(B2,0)|開始月の月末日|2026-04-30
dt02|上級|日付|NETWORKDAYS：営業日数|date|G2|NETWORKDAYS|=NETWORKDAYS(B2,C2)|営業日数|22
dt03|上級|日付|WORKDAY：10営業日後|date|G2|WORKDAY|=WORKDAY(B2,10)|10営業日後|2026-04-15
dt04|中級|日付|YEAR＋MONTH：年月ラベル|date|G2|YEAR・MONTH|=YEAR(B2)&~年~&MONTH(B2)&~月~|年月ラベル作成|2026年4月`.trim().split('\n').map(l=>l.split('|'));
const R0=30,C0=16;function cn(n){let s='';for(;n>0;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s}function ad(c,r){return cn(c)+r}function cell(start,txt){let m=start.match(/([A-Z]+)(\d+)/),c=[...m[1]].reduce((n,x)=>n*26+x.charCodeAt(0)-64,0),r=+m[2],o={};txt.trim().split('\n').forEach((line,i)=>line.split(',').forEach((v,j)=>o[ad(c+j,r+i)]=v));return o}function q(){let x=qs[S.i];return{id:x[0],lv:x[1],cat:x[2],title:x[3],data:x[4],target:x[5],fn:x[6].split('・'),ref:x[7].replaceAll('~',String.fromCharCode(34)),mission:x[8],expect:x[9]}}function seed(k){return Object.assign({},k=='sales'?cell('A1',csv.sales):cell('A1',csv[k]),k=='sales'?cell('K1',csv.prod):{})}function esc(v){return String(v??'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}function norm(v){return String(v??'').trim().toUpperCase().replace(/^=/,'').replace(/[\s　]/g,'').replace(/，/g,',').replaceAll(String.fromCharCode(34),'~')}function input(a){return R.grid.querySelector(`[data-cell=${a}]`)}function render(){let c=q();S.raw=JSON.parse(JSON.stringify(S.b[c.id]||seed(c.data)));S.raw[c.target]??='';R.meta.textContent=c.lv+'・'+c.cat;R.title.textContent=c.title;R.scenario.textContent='表を読み取り、黄色セルに指定の関数式を入力します。';R.inst.textContent=c.mission;R.tags.innerHTML=c.fn.map(f=>`<span class=tag>${f}</span>`).join('');R.hints.innerHTML='<ul><li>黄色セルに式を入力します。</li><li>答えを見るで正解式を確認できます。</li></ul>';R.gloss.innerHTML=c.fn.map(f=>`<article class=glossary-card><strong>${f}</strong><p>この問題で使う関数です。</p></article>`).join('');grid();list();sel(c.target);stats()}function grid(){let c=q(),h='<tr><th class=corner></th>';for(let i=1;i<=C0;i++)h+=`<th>${cn(i)}</th>`;h+='</tr>';for(let r=1;r<=R0;r++){h+=`<tr><th class=row-head>${r}</th>`;for(let col=1;col<=C0;col++){let a=ad(col,r),v=S.raw[a]??'',t=a==c.target,l=!t&&v!=='';h+=`<td data-box=${a}><input data-cell=${a} class='cell-input ${t?'target':''} ${String(v).startsWith('=')?'formula':''} ${l?'locked':''}' value='${esc(v)}' ${l?'readonly':''}></td>`}h+='</tr>'}R.grid.innerHTML=h;R.grid.querySelectorAll('input').forEach(e=>{e.onfocus=()=>sel(e.dataset.cell);e.oninput=()=>{S.raw[e.dataset.cell]=e.value;if(S.a==e.dataset.cell)R.bar.value=e.value;S.b[q().id]=S.raw;localStorage.em_books=JSON.stringify(S.b)}})}function sel(a){S.a=a;R.addr.textContent=a;R.bar.value=S.raw[a]??'';R.grid.querySelectorAll('td').forEach(td=>td.classList.toggle('active-cell',td.dataset.box==a))}function filtered(){let z=S.q.toLowerCase();return qs.map((x,i)=>({x,i})).filter(o=>(S.f=='all'||o.x[1]==S.f)&&(!z||o.x.join(' ').toLowerCase().includes(z)))}function list(){R.list.innerHTML=filtered().map(o=>{let p=S.p[o.x[0]]||{},b=p.best?'完了':p.try?'挑戦済':o.x[1];return`<button class='challenge-item ${o.i==S.i?'active':''}' data-i=${o.i}><span class=row><strong>${o.x[3]}</strong><span class='badge ${p.best?'done':p.try?'try':''}'>${b}</span></span><small>${o.x[2]}｜${o.x[6]}</small></button>`}).join('');$$('.challenge-item').forEach(b=>b.onclick=()=>{S.i=+b.dataset.i;render()})}function check(){let c=q(),v=S.raw[c.target]||'',ok=norm(v)==norm(c.ref),has=c.fn.every(f=>norm(v).includes(f.toUpperCase()+'('));S.p[c.id]={try:1,best:ok?1:S.p[c.id]?.best||0};localStorage.em_progress=JSON.stringify(S.p);R.fb.className='feedback';R.fb.innerHTML=`<div class=score-ring><div class=score-number style='--pct:${ok?100:0}%'><span>${ok?100:0}%</span></div><div><strong>${ok?'1/1 問正解':'要確認'}</strong><br><span>${ok?'正解です。':'式の構造を見直して再挑戦できます。'}</span></div></div><div class=result-list><div class='result-item ${ok?'good':'bad'}'><strong>${ok?'OK':'要確認'}｜${c.target}</strong><br>あなたの式：<code>${esc(v||'未入力')}</code><br>${has?'指定関数は含まれています。':'指定関数が不足している可能性があります。'}<br>期待される結果：<code>${esc(c.expect)}</code></div></div>`;input(c.target)?.classList.add(ok?'correct':'incorrect');stats();list()}function ans(){let c=q();R.fb.className='feedback';R.fb.innerHTML=`<div class=answer-block><div class=answer-line><strong>${c.target}｜解答</strong><code>${esc(c.ref)}</code><p>期待される結果：${esc(c.expect)}</p></div></div>`}function stats(){let p=Object.values(S.p);R.done.textContent=p.filter(x=>x.best).length;R.tried.textContent=p.filter(x=>x.try).length;R.best.textContent=(p.length?Math.round(p.filter(x=>x.best).length/p.length*100):0)+'%'}R.bar.oninput=()=>{S.raw[S.a]=R.bar.value;let e=input(S.a);if(e)e.value=R.bar.value;S.b[q().id]=S.raw;localStorage.em_books=JSON.stringify(S.b)};R.check.onclick=check;R.answer.onclick=ans;R.reset.onclick=()=>{delete S.b[q().id];localStorage.em_books=JSON.stringify(S.b);render()};R.prev.onclick=()=>{S.i=(S.i+qs.length-1)%qs.length;render()};R.next.onclick=()=>{S.i=(S.i+1)%qs.length;render()};R.random.onclick=()=>{S.i=Math.floor(Math.random()*qs.length);render()};R.search.oninput=()=>{S.q=R.search.value;list()};$$('.chip').forEach(b=>b.onclick=()=>{$$('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');S.f=b.dataset.filter;list()});render();
})();
