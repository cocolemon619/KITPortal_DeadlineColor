setTimeout(() => {
    // ページ上の even または odd クラスが付与された <tr> 要素を取得
    let trEvenElements = document.querySelectorAll('tr.even, tr.odd');
    console.log(trEvenElements);

    // trElementsがNodeListであるかを確認し、それに基づいて処理を行う
    if (trEvenElements.length > 0) {
        trEvenElements.forEach(tr => {
            // 各<tr>要素の子要素である5番目の<td>要素を取得
            const targetTd = tr.querySelectorAll('td')[4];
            // console.log(targetTd)

            //各<tr>要素の子要素である5番目の<td>要素を取得
            const submittedTd = tr.querySelectorAll('td')[5];

            // <td>要素のテキストから年月日時間情報を抽出してコンソールに表示
            function extractDateTimeFromText(text) {
                const dateTimeRegex = /(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})/; // 正規表現で年月日時間情報を抽出
                const match = text.match(dateTimeRegex);
                if (match) {
                    const year = match[1];
                    const month = match[2];
                    const day = match[3];
                    const hour = match[4];
                    const minute = match[5];
                    const second = match[6];
                    return `${year}-${month}-${day} ${hour}:${minute}:${second}`; // 年月日時間の形式で情報を返す
                }
                return null; // マッチが見つからない場合はnullを返す
            }

            // <td>要素のテキストから年月日時間情報を抽出してコンソールに表示
            if (targetTd) {
                const text = targetTd.textContent;
                const extractedDateTime = extractDateTimeFromText(text);
                if (extractedDateTime) {
                    console.log(extractedDateTime);
                    // 現在の日付と3日前であるかを比較する
                    const threeDaysAgo = new Date();
                    threeDaysAgo.setDate(threeDaysAgo.getDate() + 3);
                    const currentDate = new Date(extractedDateTime);
                    if (currentDate <= threeDaysAgo) {
                        // 3日前の場合、背景色を黒に変更する
                        targetTd.style.backgroundColor = "#feff00";
                    }
                }
                if (extractedDateTime) {
                    console.log(extractedDateTime);
                    // 現在の日付と3日前であるかを比較する
                    const twoDaysAgo = new Date();
                    twoDaysAgo.setDate(twoDaysAgo.getDate() + 1);
                    const currentDate = new Date(extractedDateTime);
                    if (currentDate <= twoDaysAgo) {
                        // 3日前の場合、背景色を黒に変更する
                        targetTd.style.backgroundColor = "#fcc";
                    }
                }
            }
            if(submittedTd && submittedTd.textContent == "提出済"){
                submittedTd.style.backgroundColor = "#66e5ff"
            }
        });
    } else {
        console.error('No matching <tr> elements found.');
    }
}, 1000); // 1000ミリ秒 = 1秒
