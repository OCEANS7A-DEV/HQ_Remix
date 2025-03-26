
import { useLoaderData, useNavigate } from "@remix-run/react";
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

  const details = await ListGet('A2:B','商品詳細一覧')

  const datalist = await ListGet('B2:C','在庫一覧')

  const detailsfilter = details.filter(row => row[0] !== 100001)

  const detailmap = detailsfilter.map(items => {
    const resultmap = datalist.find(row => row[0] === items[0])
    const result = [items[0],resultmap[1],items[1]]
    return result
  })

  const filtered = orderdata.filter(row => row[5] !== '');

  const filteredData = filtered
  .filter((row: any) => {
    const utcDate = new Date(row[0]);
    const japanTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
    const formattedJapanDate = japanTime.toISOString().split('T')[0];
    return formattedJapanDate === date;
  });


  const totaldata = detailmap.map(maprow => {
    const datafilter = filteredData.filter(row => row[3] === maprow[0] && row[5] === maprow[2])
    const filtermap = datafilter.map(mrow => mrow[6])
    const total = filtermap.reduce((sum, item) => (sum += item), 0);
    const result = [...maprow, total]
    return result
  })

  result = totaldata;
  return result;
};



export default function ShortagePrint() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect (() => {
    //console.log(loaderData)
    Print()
    //navigate('/process_chack')
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
              <th colSpan={4} className="shortagePrintTitle">
                <div>
                  ノミネなどのカラー剤やサイズの種類などの集計
                </div>
              </th>
            </tr>
            <tr>
              <th>商品コード</th>
              <th>商品名</th>
              <th>詳細名</th>
              <th>注文数</th>
            </tr>
          </thead>
          <tbody>
            {loaderData.filter(row => row[3] !== 0).map((row,index) => (
              <tr key={index}>
                <td className="detailnums">{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td className="detailnums">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}





