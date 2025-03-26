
import { Navigate, useLoaderData, useNavigate } from "@remix-run/react";
import { shortageGet, ListGet, orderGet, detailGet } from '../backend/Server_end';
import LinkBaner from '../comp/Linkbanar';
import { TableRow } from "@mui/material";
import '../css/shortagePrint.css';
import { useEffect } from 'react';
import { Print } from '../backend/utils'




export const loader = async ({ request }: { request: Request }) => {

  const url = new URL(request.url);

  const date = url.searchParams.get("date");

  let result = []

  const orderdata = await orderGet()

  const filteredData = orderdata
  .filter((row: any) => {
    const utcDate = new Date(row[0]);
    const japanTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
    const formattedJapanDate = japanTime.toISOString().split('T')[0];
    return formattedJapanDate === date;
  });
  const elsecase = filteredData.filter(row => typeof row[3] === 'string' && row[12] !== '注文無')

  const resultdata = elsecase.map(row => [row[1],row[2],row[3],row[4],row[6]])

  result = resultdata;
  return result;
};



export default function ShortagePrint() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect (() => {
    //console.log(loaderData)
    Print()
    navigate('/process_chack')

  },[loaderData])

  return (
    <div className="shortagePrint">
      <div className="banner">
        <LinkBaner/>
      </div>
      <div className="shortagePrintArea">
        <table className="detailTable">
          <thead className="detailHead">
            <tr>
              <th colSpan={5} className="shortagePrintTitle">
                <div>
                  在庫一覧外の注文
                </div>
              </th>
            </tr>
            <tr>
              <th>店舗名</th>
              <th>業者名</th>
              <th>カタログコード</th>
              <th>商品名</th>
              <th>注文数</th>
            </tr>
          </thead>
          <tbody>
            {loaderData.filter(row => row[3] !== 0).map((row,index) => (
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td className="detailnums">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



