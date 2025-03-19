const Get_URL = 'https://script.google.com/macros/s/AKfycbwdZ3lhe2QH2BChceXrTsxzGAkUd9EgZ2AZ7pWXWlMJvwtOtOcjXDTOXUmdBRJgCs25/exec';
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import '../css/about.css'
import Links from '../comp/Links';




export const AllData = async(
) => {
  try {
    const response = await fetch(
      Get_URL,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'allData',
          sheetName: '在庫一覧',
        })
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json();
    return result;

  }catch(e){
    return (e);
  }
};

export const loader = async () => {
  // データ取得が終わるまで待機
  const data = await AllData();
  return json(data);
};

export default function AboutPage() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="aboutwindow">
      <Links/>
      <h1>About Page</h1>
      <p>これはAboutページです。</p>
      <p>テスト用ページ</p>

      <div>{loaderData}</div>
    </div>
  );
}
