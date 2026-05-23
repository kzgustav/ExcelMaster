(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mobileCss=document.createElement('style');
mobileCss.textContent=`
.mobile-jump{display:none;margin-top:10px}.mobile-current{display:none}
@media(max-width:760px){
  html{scroll-behavior:smooth} .app-shell{padding:10px}.hero{gap:10px;margin-bottom:12px}.hero>div:first-child{padding:22px 18px;border-radius:22px}.hero-card{display:none}.lead{font-size:.95rem}.layout{display:block}.sidebar{position:relative;top:auto;max-height:none;margin-bottom:12px}.compact{padding:12px}.mobile-current{display:block;margin-top:10px;padding:10px 12px;border-radius:14px;background:#fff;border:1px solid var(--line);color:var(--muted);font-size:.9rem;line-height:1.5}.mobile-jump{display:block}.challenge-list{display:flex!important;flex-direction:column!important;max-height:40vh!important;overflow:auto!important;-webkit-overflow-scrolling:touch;padding-right:0;margin-bottom:14px}.challenge-item{padding:12px}.main,.workspace{display:flex!important;flex-direction:column!important;gap:12px;scroll-margin-top:10px}.challenge-panel,.feedback-panel,.glossary-panel{padding:14px}.challenge-head,.challenge-topline{display:flex;flex-direction:column;gap:12px}.nav-buttons{width:100%;display:grid;grid-template-columns:1fr 1fr}.task-box,.task-card{padding:13px}.formula-row,.sheet-toolbar{position:sticky;top:0;z-index:20;display:grid!important;grid-template-columns:1fr!important;gap:8px;padding:10px;background:#fffaf1}.address-box{justify-content:flex-start;padding-left:12px}.formula-bar{width:100%;min-width:0}.grid-wrap,.sheet-wrap{height:62vh!important;overflow:auto!important;-webkit-overflow-scrolling:touch}.grid{min-width:980px}.two-col,.split-row{display:grid!important;grid-template-columns:1fr!important;gap:12px}.feedback,.glossary{max-height:none}.sheet-help{font-size:.82rem;line-height:1.6}
}`;
document.head.appendChild(mobileCss);
for(const [a,b] of [['.main','workspace'],['.challenge-head','challenge-topline'],['#functionTags','tag-row'],['.task-box','task-card'],['.formula-row','sheet-toolbar'],['.grid-wrap','sheet-wrap'],['.two-col','split-row']])document.querySelector(a)?.classList.add(b);
const R={list:$('#challengeList'),search:$('#searchBox'),random:$('#randomBtn'),prev:$('#prevBtn'),next:$('#nextBtn'),meta:$('#challengeMeta'),title:$('#challengeTitle'),scenario:$('#challengeScenario'),inst:$('#challengeInstruction'),hints:$('#challengeHints'),tags:$('#functionTags'),addr:$('#activeAddress'),bar:$('#formulaBar'),grid:$('#grid'),check:$('#checkBtn'),reset:$('#resetBtn'),answer:$('#answerBtn'),fb:$('#feedback'),gloss:$('#glossary'),done:$('#statCompleted'),tried:$('#statAttempted'),best:$('#statBest')};
const DATA={
sales:`ID,地域,担当,商品,数量,単価,売上,日付,状態
1001,東日本,佐藤,ノートPC,4,120000,480000,2026-01-08,完了
1002,西日本,山田,モニター,12,38000,456000,2026-01-10,完了
1003,東日本,鈴木,マウス,45,2600,117000,2026-01-15,処理中
1004,中部,佐藤,ドック,9,28000,252000,2026-01-18,完了
1005,西日本,高橋,ノートPC,3,120000,360000,2026-01-22,完了
1006,東日本,高橋,キーボード,28,7800,218400,2026-02-02,完了
1007,九州,山田,ノートPC,5,120000,600000,2026-02-05,処理中
1008,中部,鈴木,モニター,10,38000,380000,2026-02-07,完了
1009,東日本,佐藤,モニター,16,38000,608000,2026-02-12,完了
1010,西日本,鈴木,Webカメラ,22,9200,202400,2026-02-13,完了`,
prod:`商品,カテゴリ,標準単価,粗利率
ノートPC,PC,120000,22%
モニター,周辺機器,38000,18%
マウス,周辺機器,2600,35%
キーボード,周辺機器,7800,31%
ドック,周辺機器,28000,25%
Webカメラ,周辺機器,9200,29%
タブレット,PC,65000,20%`,
score:`受講者,部署,Excel,SQL,BI,提出
高橋,営業,82,78,88,提出済
鈴木,開発,76,92,84,提出済
田中,営業,91,65,79,未提出
佐藤,人事,68,74,72,提出済
山田,開発,95,88,90,提出済
伊藤,営業,73,71,69,提出済`,
text:`氏名,メール,商品コード,メモ
佐藤 花子,hanako.sato@example.co.jp,PC-2026-001,  VIP 顧客  
鈴木 海,kai.suzuki@example.net,MN-2026-022,要フォロー
田中 陸,riku.tanaka@example.com,KB-2026-105,
山田 空,sora.yamada@example.co.jp,WC-2026-011,至急`,
emp:`社員ID,氏名,部署,等級,評価,売上,入社日,在宅日数
E001,佐藤,営業,G3,4,7200000,2021-04-01,6
E002,鈴木,開発,G4,5,0,2019-10-15,12
E003,高橋,営業,G2,3,5100000,2023-01-10,3
E004,田中,人事,G3,4,0,2020-07-01,8`,
date:`案件,開始日,終了日,期限,担当
A,2026-04-01,2026-04-30,2026-05-10,佐藤
B,2026-04-10,2026-05-20,2026-06-01,鈴木
C,2026-05-01,2026-06-15,2026-06-30,田中`};
const RAW=`s01|中級|条件集計|SUMIFS：東日本ノートPC売上|sales|P2|SUMIFS|=SUMIFS(G2:G11,B2:B11,~東日本~,D2:D11,~ノートPC~)|東日本かつノートPCの売上合計を求めます。|480,000
s02|中級|条件集計|COUNTIFS：西日本完了件数|sales|P2|COUNTIFS|=COUNTIFS(B2:B11,~西日本~,I2:I11,~完了~)|西日本かつ完了の件数を数えます。|3
s03|中級|条件集計|AVERAGEIFS：東日本完了平均|sales|P2|AVERAGEIFS|=AVERAGEIFS(G2:G11,B2:B11,~東日本~,I2:I11,~完了~)|東日本かつ完了の売上平均を求めます。|435,467
s04|中級|条件集計|MAXIFS：モニター最高売上|sales|P2|MAXIFS|=MAXIFS(G2:G11,D2:D11,~モニター~)|モニターの最高売上を求めます。|608,000
s05|中級|条件集計|MINIFS：東日本最低売上|sales|P2|MINIFS|=MINIFS(G2:G11,B2:B11,~東日本~)|東日本の最低売上を求めます。|117,000
s06|上級|配列計算|SUMPRODUCT：数量×単価|sales|P2|SUMPRODUCT|=SUMPRODUCT(E2:E11,F2:F11)|数量×単価の総額を求めます。|3,474,800
s07|中級|集計|COUNTIF：PCを含む商品|sales|P2|COUNTIF|=COUNTIF(K2:K8,~*PC*~)|商品マスタからPCを含む商品名の件数を数えます。|1
s08|中級|集計|COUNTBLANK：空白メモ|text|F2|COUNTBLANK|=COUNTBLANK(D2:D5)|メモ列の空白数を数えます。|1
n01|中級|数値|ROUND：平均売上を整数化|sales|P2|ROUND|=ROUND(AVERAGE(G2:G11),0)|平均売上を四捨五入します。|347,480
n02|中級|数値|ROUNDUP：千円単位切上げ|sales|P2|ROUNDUP|=ROUNDUP(AVERAGE(G2:G11),-3)|平均売上を千円単位で切り上げます。|348,000
n03|中級|数値|ROUNDDOWN：千円単位切捨て|sales|P2|ROUNDDOWN|=ROUNDDOWN(AVERAGE(G2:G11),-3)|平均売上を千円単位で切り捨てます。|347,000
l01|中級|検索|XLOOKUP：Webカメラカテゴリ|sales|P2|XLOOKUP|=XLOOKUP(~Webカメラ~,K2:K8,L2:L8)|商品マスタからWebカメラのカテゴリを返します。|周辺機器
l02|中級|検索|XLOOKUP：未登録対応|sales|P2|XLOOKUP|=XLOOKUP(~プリンター~,K2:K8,M2:M8,~未登録~)|見つからない商品は未登録と表示します。|未登録
l03|中級|検索|VLOOKUP：マウス粗利率|sales|P2|VLOOKUP|=VLOOKUP(~マウス~,K2:N8,4,FALSE)|マウスの粗利率をVLOOKUPで返します。|35%
l04|上級|検索|INDEX＋MATCH：キーボード単価|sales|P2|INDEX・MATCH|=INDEX(M2:M8,MATCH(~キーボード~,K2:K8,0))|INDEXとMATCHでキーボードの単価を返します。|7,800
l05|中級|検索|XMATCH：タブレット位置|sales|P2|XMATCH|=XMATCH(~タブレット~,K2:K8)|商品マスタ内でタブレットが何番目か返します。|7
d01|365|動的配列|FILTER：完了行抽出|sales|P2|FILTER|=FILTER(A2:I11,I2:I11=~完了~)|完了行だけ抽出します。|完了行
d02|365|動的配列|UNIQUE：地域一覧|sales|P2|UNIQUE|=UNIQUE(B2:B11)|地域の重複なし一覧を作ります。|東日本/西日本/中部/九州
d03|365|動的配列|SORT：売上降順|sales|P2|SORT|=SORT(A2:I11,7,-1)|売上降順に並べ替えます。|降順
d04|365|動的配列|TAKE＋SORT：上位5件|sales|P2|TAKE・SORT|=TAKE(SORT(A2:I11,7,-1),5)|売上上位5件だけ取り出します。|上位5件
d05|365|動的配列|CHOOSECOLS：必要列だけ|sales|P2|CHOOSECOLS|=CHOOSECOLS(A1:I11,1,4,7,9)|注文ID・商品・売上・状態だけ抜き出します。|4列
d06|365|動的配列|HSTACK：氏名と提出|score|H2|HSTACK|=HSTACK(A2:A7,F2:F7)|受講者と提出状況を横に結合します。|2列
d07|365|動的配列|VSTACK：見出し＋営業|score|H2|VSTACK・FILTER|=VSTACK(A1:F1,FILTER(A2:F7,B2:B7=~営業~))|見出しと営業部の行を縦に結合します。|営業一覧
d08|365|動的配列|SEQUENCE：10から5刻み|sales|P2|SEQUENCE|=SEQUENCE(5,1,10,5)|10から5刻みの連番を作ります。|10,15,20,25,30
t01|中級|文字列|TEXTBEFORE：ユーザー名|text|F2|TEXTBEFORE|=TEXTBEFORE(B2,~@~)|メールの@より前を取り出します。|hanako.sato
t02|中級|文字列|TEXTAFTER：ドメイン|text|F2|TEXTAFTER|=TEXTAFTER(B2,~@~)|メールの@より後を取り出します。|example.co.jp
t03|365|文字列|TEXTSPLIT：コード分割|text|F2|TEXTSPLIT|=TEXTSPLIT(C2,~-~)|商品コードをハイフンで分割します。|PC/2026/001
t04|中級|文字列|LEFT＋FIND：先頭コード|text|F2|LEFT・FIND|=LEFT(C2,FIND(~-~,C2)-1)|最初のハイフンより前を取り出します。|PC
t05|中級|文字列|MID：年度抽出|text|F2|MID|=MID(C2,4,4)|商品コードから年度を取り出します。|2026
t06|中級|文字列|RIGHT：末尾番号|text|F2|RIGHT|=RIGHT(C2,3)|末尾3桁を取り出します。|001
t07|中級|文字列|SEARCH＋ISNUMBER：PC判定|text|F2|SEARCH・ISNUMBER|=ISNUMBER(SEARCH(~PC~,C2))|PCを含むか判定します。|TRUE
t08|中級|文字列|SUBSTITUTE：ハイフン除去|text|F2|SUBSTITUTE|=SUBSTITUTE(C2,~-~,~~)|ハイフンを削除します。|PC2026001
t09|中級|文字列|TRIM：空白整理|text|F2|TRIM|=TRIM(D2)|余分な空白を整理します。|VIP 顧客
t10|中級|文字列|LOWER：小文字化|text|F2|LOWER|=LOWER(B2)|メールを小文字化します。|hanako.sato@example.co.jp
t11|上級|文字列|PROPER：先頭大文字化|text|F2|PROPER・TEXTBEFORE|=PROPER(TEXTBEFORE(B2,~@~))|@前を先頭大文字化します。|Hanako.Sato
t12|中級|文字列|CONCAT：表示名作成|text|F2|CONCAT|=CONCAT(A2,~ <~,B2,~>~)|氏名 <メール> の表示名を作ります。|表示名
t13|中級|文字列|TEXTJOIN：氏名一覧|text|F2|TEXTJOIN|=TEXTJOIN(~ / ~,TRUE,A2:A5)|氏名を区切って結合します。|氏名一覧
j01|中級|論理|IF：合格判定|score|H2|IF|=IF(C2>=80,~合格~,~要確認~)|80以上なら合格を返します。|合格
j02|上級|論理|IFS：ランク付け|score|H2|IFS|=IFS(C2>=90,~S~,C2>=80,~A~,C2>=70,~B~,TRUE,~C~)|点数に応じたランクを返します。|A
j03|上級|論理|SWITCH：部署コード|emp|J2|SWITCH|=SWITCH(C2,~営業~,~Sales~,~開発~,~Dev~,~人事~,~HR~,~Other~)|部署を英語コードに変換します。|Sales
j04|中級|論理|AND：優秀営業|emp|J2|AND|=AND(C2=~営業~,E2>=4,F2>=6000000)|営業かつ高評価高売上か判定します。|TRUE
j05|中級|論理|OR：要フォロー|emp|J2|OR|=OR(E2<=2,H2>=12)|評価2以下または在宅12以上か判定します。|FALSE
j06|中級|論理|IFERROR：検索エラー対応|sales|P2|IFERROR・XLOOKUP|=IFERROR(XLOOKUP(~プリンター~,K2:K8,M2:M8),~確認~)|検索エラー時に確認と表示します。|確認
dt01|中級|日付|EOMONTH：月末日|date|G2|EOMONTH|=EOMONTH(B2,0)|開始月の月末日を返します。|2026-04-30
dt02|上級|日付|NETWORKDAYS：営業日数|date|G2|NETWORKDAYS|=NETWORKDAYS(B2,C2)|開始日から終了日までの営業日数を求めます。|22
dt03|上級|日付|WORKDAY：10営業日後|date|G2|WORKDAY|=WORKDAY(B2,10)|開始日から10営業日後を返します。|2026-04-15
dt04|中級|日付|YEAR＋MONTH：年月ラベル|date|G2|YEAR・MONTH|=YEAR(B2)&~年~&MONTH(B2)&~月~|開始日から年月ラベルを作ります。|2026年4月
x01|上級|可読性|LET：平均売上を再利用|sales|P2|LET|=LET(avg,AVERAGE(G2:G11),ROUNDUP(avg,-3))|平均売上をLETで変数化し、千円単位で切り上げます。|348,000
x02|上級|可読性|LAMBDA：税込計算|sales|P2|LAMBDA|=LAMBDA(x,x*1.1)(M2)|単価を受け取り税込額を返すLAMBDAを実行します。|132,000`.trim().split('\n').map(line=>{const p=line.split('|');return{id:p[0],level:p[1],category:p[2],title:p[3],data:p[4],target:p[5],funcs:p[6].split('・'),answer:p[7].replaceAll('~','"'),mission:p[8],expected:p[9]}});
const S={i:0,filter:'all',query:'',active:'A1',raw:{},progress:safe('em_progress',{}),books:safe('em_books',{})};
function safe(k,d){try{return JSON.parse(localStorage[k]||JSON.stringify(d))}catch{return d}}
function save(){localStorage.em_progress=JSON.stringify(S.progress);localStorage.em_books=JSON.stringify(S.books)}
function colName(n){let s='';for(;n>0;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s}
function colNum(s){return [...s].reduce((n,c)=>n*26+c.charCodeAt(0)-64,0)}
function addr(c,r){return colName(c)+r}
function toMap(start,text){const m=start.match(/([A-Z]+)(\d+)/),c0=colNum(m[1]),r0=+m[2],o={};text.trim().split('\n').forEach((line,r)=>line.split(',').forEach((v,c)=>o[addr(c0+c,r0+r)]=v));return o}
function seed(kind){const base=toMap('A1',DATA[kind]);if(kind==='sales')Object.assign(base,toMap('K1',DATA.prod));return base}
function cur(){return RAW[S.i]}
function mainEl(){return document.querySelector('.main,.workspace')}
function isMobile(){return matchMedia('(max-width:760px)').matches}
function jump(el){if(el)setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),60)}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function normalize(v){return String(v??'').trim().replace(/^=/,'').toUpperCase().replace(/[\s　]/g,'').replace(/，/g,',').replace(/["']/g,'~')}
function render(opts={}){const c=cur();S.raw=structuredClone(S.books[c.id]||seed(c.data));S.raw[c.target]??='';S.active=c.target;R.meta.textContent=`${c.level}・${c.category}`;R.title.textContent=c.title;R.scenario.textContent='サンプル表をもとに、黄色の解答セルへ関数式を入力します。';R.inst.textContent=c.mission;R.tags.innerHTML=c.funcs.map(f=>`<span class="tag">${esc(f)}</span>`).join('');R.hints.innerHTML='<ul><li>黄色セルが解答セルです。</li><li>まずは関数名と範囲の順番を意識して組み立てます。</li><li>迷ったら「答えを見る」で型を確認して、もう一度リセットして練習できます。</li></ul>';R.gloss.innerHTML=c.funcs.map(f=>`<article class="glossary-card"><strong>${esc(f)}</strong><p>この問題の主役になる関数です。範囲・条件・戻り値の順番を確認しながら入力しましょう。</p></article>`).join('');R.fb.className='feedback empty';R.fb.textContent='まだ採点していません。式を入力したら「答え合わせ」を押してください。';renderGrid();renderList();selectCell(c.target);stats();if(opts.jump&&isMobile())jump(mainEl())}
function renderGrid(){const c=cur(),rows=32,cols=18;let html='<tr><th class="corner"></th>';for(let col=1;col<=cols;col++)html+=`<th>${colName(col)}</th>`;html+='</tr>';for(let r=1;r<=rows;r++){html+=`<tr><th class="row-head">${r}</th>`;for(let col=1;col<=cols;col++){const a=addr(col,r),v=S.raw[a]??'',target=a===c.target,locked=!target&&v!=='';html+=`<td data-box="${a}"><input data-cell="${a}" class="cell-input ${target?'target':''} ${String(v).startsWith('=')?'formula':''} ${locked?'locked':''}" value="${esc(v)}" ${locked?'readonly':''}></td>`}html+='</tr>'}R.grid.innerHTML=html;R.grid.querySelectorAll('input').forEach(el=>{el.addEventListener('focus',()=>selectCell(el.dataset.cell));el.addEventListener('input',()=>{S.raw[el.dataset.cell]=el.value;if(S.active===el.dataset.cell)R.bar.value=el.value;S.books[cur().id]=S.raw;save()})})}
function selectCell(a){S.active=a;R.addr.textContent=a;R.bar.value=S.raw[a]??'';R.grid.querySelectorAll('td').forEach(td=>td.classList.toggle('active-cell',td.dataset.box===a));R.bar.placeholder=a===cur().target?'=SUMIFS(...) など':'このセルは参照用です'}
function filtered(){const q=S.query.toLowerCase();return RAW.map((p,i)=>({p,i})).filter(x=>(S.filter==='all'||x.p.level===S.filter)&&(!q||[x.p.title,x.p.category,x.p.level,x.p.funcs.join(' ')].join(' ').toLowerCase().includes(q)))}
function renderList(){const items=filtered();let helper=document.querySelector('.mobile-current');if(!helper){helper=document.createElement('div');helper.className='mobile-current';R.list.before(helper)}helper.innerHTML=`選択中：<strong>${esc(cur().title)}</strong>`;let btn=document.querySelector('.mobile-jump');if(!btn){btn=document.createElement('button');btn.className='primary full mobile-jump';btn.textContent='選んだ問題を開く';btn.onclick=()=>jump(mainEl());R.list.before(btn)}R.list.innerHTML=items.map(({p,i})=>{const pr=S.progress[p.id]||{},state=pr.best?'完了':pr.tried?'挑戦済':p.level;return`<button class="challenge-item ${i===S.i?'active':''}" data-i="${i}"><span class="row"><strong>${esc(p.title)}</strong><span class="badge ${pr.best?'done':pr.tried?'try':''}">${state}</span></span><small>${esc(p.category)}｜${esc(p.funcs.join('・'))}</small></button>`}).join('');R.list.querySelectorAll('.challenge-item').forEach(b=>b.onclick=()=>{S.i=+b.dataset.i;render({jump:true})})}
function check(){const c=cur(),v=S.raw[c.target]||'',exact=normalize(v)===normalize(c.answer),has=c.funcs.every(f=>normalize(v).includes(f.toUpperCase()+'('));S.progress[c.id]={tried:1,best:exact?1:S.progress[c.id]?.best||0};save();R.fb.className='feedback';R.fb.innerHTML=`<div class="score-ring"><div class="score-number" style="--pct:${exact?100:0}%"><span>${exact?100:0}%</span></div><div><strong>${exact?'正解です':'もう少しです'}</strong><br><span>${exact?'きれいに組み立てられています。':'関数名・範囲・条件の順番を確認してみましょう。'}</span></div></div><div class="result-list"><div class="result-item ${exact?'good':'bad'}"><strong>${c.target}｜${exact?'OK':'要確認'}</strong><br>あなたの式：<code>${esc(v||'未入力')}</code><br>${has?'指定関数は含まれています。':'指定関数が不足している可能性があります。'}<br>期待される結果：<code>${esc(c.expected)}</code></div></div>`;const el=R.grid.querySelector(`[data-cell="${c.target}"]`);if(el)el.classList.add(exact?'correct':'incorrect');stats();renderList();if(isMobile())jump(R.fb)}
function showAnswer(){const c=cur();S.raw[c.target]=c.answer;S.books[c.id]=S.raw;save();const el=R.grid.querySelector(`[data-cell="${c.target}"]`);if(el)el.value=c.answer;selectCell(c.target);R.fb.className='feedback';R.fb.innerHTML=`<div class="answer-block"><div class="answer-line"><strong>${c.target}｜解答例</strong><code>${esc(c.answer)}</code><p>期待される結果：${esc(c.expected)}</p></div></div>`;if(isMobile())jump(R.fb)}
function stats(){const vals=Object.values(S.progress);R.done.textContent=vals.filter(v=>v.best).length;R.tried.textContent=vals.filter(v=>v.tried).length;R.best.textContent=(vals.length?Math.round(vals.filter(v=>v.best).length/vals.length*100):0)+'%'}
R.bar.addEventListener('input',()=>{const c=cur();if(S.active!==c.target){selectCell(c.target)}S.raw[c.target]=R.bar.value;const el=R.grid.querySelector(`[data-cell="${c.target}"]`);if(el)el.value=R.bar.value;S.books[c.id]=S.raw;save()});
R.check.onclick=check;R.answer.onclick=showAnswer;R.reset.onclick=()=>{delete S.books[cur().id];save();render({jump:false})};R.prev.onclick=()=>{S.i=(S.i+RAW.length-1)%RAW.length;render({jump:isMobile()})};R.next.onclick=()=>{S.i=(S.i+1)%RAW.length;render({jump:isMobile()})};R.random.onclick=()=>{S.i=Math.floor(Math.random()*RAW.length);render({jump:true})};R.search.oninput=()=>{S.query=R.search.value;renderList()};$$('.chip').forEach(b=>b.onclick=()=>{$$('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');S.filter=b.dataset.filter;if(!filtered().some(x=>x.i===S.i)&&filtered()[0])S.i=filtered()[0].i;renderList()});
render();
})();
