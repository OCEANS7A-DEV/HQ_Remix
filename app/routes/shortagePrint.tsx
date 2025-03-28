import { useLoaderData, useNavigate } from "@remix-run/react";
import { shortageGet, ListGet } from '../backend/Server_end';
import LinkBaner from '../comp/Linkbanar';
import { TableRow } from "@mui/material";
import '../css/shortagePrint.css';
import { useEffect } from 'react';
import { Print } from '../backend/utils'


export const loader = async() => {
  const shortage = await shortageGet();
  const filter = shortage.filter(row => row[12] < 0)
  const vendordata = await ListGet('A2:H','その他データ');
  const vendorfilter = vendordata.filter(row => row[1] === 'FAX').map(item => item[0])
  const result = filter.filter(row => !vendorfilter.includes(row[0]))
  return result;
};



export default function ShortagePrint() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect (() => {
    Print()
    navigate('/process_chack')
  },[])

  return (
    <div className="shortagePrint">
      <div className="banner">
        <LinkBaner/>
      </div>
      <div className="shortagePrintArea">
        <table className="shortageTable">
          <thead className="shortageHead">
            <tr>
              <th colSpan={5} className="shortagePrintTitle">
                <div>ネット発注不足分(一部FAX有)</div>
              </th>
            </tr>
            <tr>
              <th>業者</th>
              <th>商品コード</th>
              <th>商品名</th>
              <th>不足数</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {loaderData.map((row,index) => (
              <tr key={index}>
                <td>{row[0]}</td>
                <td className="detailnums">{row[1]}</td>
                <td>{row[2]}</td>
                <td className="detailnums">{-(row[12])}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

