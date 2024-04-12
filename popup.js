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
                        // 3日前の場合、背景色を黄色に変更する
                        targetTd.style.backgroundColor = "#feff00";
                    }
                }
                if (extractedDateTime) {
                    console.log(extractedDateTime);
                    // 現在の日付と1日前であるかを比較する
                    const twoDaysAgo = new Date();
                    twoDaysAgo.setDate(twoDaysAgo.getDate() + 1);
                    const currentDate = new Date(extractedDateTime);
                    if (currentDate <= twoDaysAgo) {
                        // 1日前の場合、背景色を桜色に変更する
                        targetTd.style.backgroundColor = "#fcc";
                    }
                }
            }
            if (submittedTd && submittedTd.textContent == "提出済") {
                submittedTd.style.backgroundColor = "#66e5ff"
            }
        });
    } else {
        console.error('No matching <tr> elements found.');
    }

    //ここからcalendar機能
    // 新しいdiv要素を作成
    let newCalendar = document.createElement("div");

    // 新しいdiv要素にid属性を設定
    newCalendar.id = "calendar";

    //追加先の指定
    let appndToDiv = document.getElementById("DTDashboardMyList_wrapper");

    // 要素に追加
    appndToDiv.before(newCalendar);

    const weeks = ['日', '月', '火', '水', '木', '金', '土']
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    const endDate = new Date(year, month, 0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const startDay = startDate.getDay() // 月の最初の日の曜日を取得
    let dayCount = 1 // 日にちのカウント
    let calendarHtml = '' // HTMLを組み立てる変数

    calendarHtml += '<p>' + year + '/' + month + '</p>'
    calendarHtml += '<table class="calendarTable">'

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td class="calenderTd" style="border: 1px solid #000; padding: 5px; text-align: center;">' + weeks[i] + '</td>'
    }

    for (let w = 0; w < 6; w++) {
        calendarHtml += '<tr>'

        for (let d = 0; d < 7; d++) {
            if (w == 0 && d < startDay) {
                // 1行目で1日の曜日の前
                calendarHtml += '<td class="calenderTd" style="border: 1px solid #000; padding: 5px; text-align: center;"></td>'
            } else if (dayCount > endDayCount) {
                // 末尾の日数を超えた
                calendarHtml += '<td class="calenderTd"></td>'
            } else {
                calendarHtml += '<td class="calenderTd" style="border: 1px solid #000; padding: 5px; text-align: center;">' + dayCount + '</td>'
                dayCount++
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'

    document.getElementById('calendar').innerHTML = calendarHtml

    //calenderのTable要素にCSSを適用
    let calendarTables = document.querySelectorAll('.calendarTable');
    calendarTables.forEach(function (table) {
        table.style.borderSpacing = '0';
        table.style.borderCollapse = 'collapse';
        // table.style.backgroundColor = '#fcc'
    });
}, 1000); // 1000ミリ秒 = 1秒
