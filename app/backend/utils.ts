

const sleep = (time:number) => new Promise((resolve) => setTimeout(resolve, time));

export const Print = async () => {
  await sleep(1);
  await new Promise<void>((resolve) => {
    const onAfterPrint = () => {
      window.removeEventListener('afterprint', onAfterPrint);
      resolve();
    };
    window.addEventListener('afterprint', onAfterPrint);
    window.print();
  });
}

export const getMonthString = () => {
  var date = new Date();         // 現在日時を生成
  var yyyy = date.getFullYear(); // 西暦を取得
  var mm = date.getMonth() + 1;  // 月を取得（返り値は実際の月-1なので、+1する）
  var dd = date.getDate(); // 日を取得
  var w = date.getDay();   // 曜日を取得（数値）
   
  // 月と日が一桁の場合は先頭に0をつける
  if (mm < 10) {
      mm = "0" + mm;
  }
  if (dd < 10) {
      dd = "0" + dd;
  }
   
  // 曜日を数値から文字列に変換するための配列
  const week = ["日", "月", "火", "水", "木", "金", "土"];  
   
  var result = yyyy + " 年 " + mm + " 月 " + dd + " 日 " + "( " + week[w] + " )"; // フォーマットを整えて表示
   
  return result
}





