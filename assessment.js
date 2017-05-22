(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    
    /**
    *関数の定義 
    * 指定した要素の子どもを全て削除する
    * @param {HTMLElement} element HTMLの要素
    */
    function removeAllChildren(element) {
        while (element.firstChild) { // 子どもの要素があるかぎり削除
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = () => {          //=>はアロー関数
        const userName = userNameInput.value;   //入力された文字列データはuserNameInputオブジェクトのvalueプロパティに格納されている
        if(userName.length === 0) {             //名前が入力されていないとき処理を終了
            return;                             //return;は戻り値なしで終了(関数から出る)という処理で、それ以上下の処理は実行されない
        }
        console.log(userName);
    

    //診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        removeAllChildren(tweetDivided); 

        
        
//        while (resultDivided.firstChild) {   //子要素がある限り削除
//            resultDivided.removeChild(resultDivided.firstChild);
//         }

         const header = document.createElement('h3');    //JSプログラムからHTML要素<h3>タグを作成し、オブジェクトとして取得する
         header.innerText = '診断結果';
         resultDivided.appendChild(header);       //<div>の子要素として生成した<header>を追加する

         const paragraph = document.createElement('p');
         const result = assessment(userName);
         paragraph.innerText = result;
         resultDivided.appendChild(paragraph);    //<div>の子要素として生成した<paragraph>を追加する

        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text='
            + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);     //anchorという定数にssetAttributeで'href'という属性を与える
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();       //tweeter社から提供されている.jsコードをロードしてボタンアイコン作成

     };

      userNameInput.onkeydown = (event) => {
        if(event.keyCode === 13) {
            assessmentButton.onclick();
        }
     };



    //診断結果の配列データを宣言
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を押さえられる{userName}が皆から評価されています。',
        '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振舞に多くの人が癒やされています。'
        
        ];     
    
    
    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前 引数
     * @return {string} 診断結果　返値
     */
    function assessment(userName) {
        //全文字コード番号を取得して、それを足し合わせる
        let sumOfCharCode = 0;
        for (let i = 0; i < userName.length; i++) {    //letはifやfor文中での{}中のみで有効な変数
            sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
        }

        //文字のコード番号の合計を診断の回答数で割って、余りを添え字として用いる
        const index = sumOfCharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);  //正規表現。(第一引数,第二引数)
        
        return result;

     }


    
        
        console.log(assessment('太郎'));
        console.log(assessment('次郎'));
        console.log(assessment('太郎'));
        
        //検証用の関数
        console.assert(
            assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
            '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
        );

        console.assert(
            assessment('太郎') === assessment('太郎'),
            '入力に対する診断結果のパターンの同一性処理が正しくありません。'
        )

})();
