const Get_URL = 'https://script.google.com/macros/s/AKfycbwdZ3lhe2QH2BChceXrTsxzGAkUd9EgZ2AZ7pWXWlMJvwtOtOcjXDTOXUmdBRJgCs25/exec';
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import '../css/about.css'
import LinkBaner from '../comp/Linkbanar';




export const AllData = async(
) => {
  try {
    const response = await fetch(Get_URL, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        sheetName: '在庫一覧',
        action: 'allDataNum',
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    const filter = result.filter(row => row[12] < 0)
    //console.log(result)
    return filter;
  } catch (error) {
    console.error('Error:', error);
    throw error;
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
      <LinkBaner/>
      
      <h1>About Page</h1>
      <p>これはテスト用ページです。</p>

      {/* <div>{loaderData}</div> */}
      <table>
        <tbody>
          {loaderData.map((row,index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[12]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
