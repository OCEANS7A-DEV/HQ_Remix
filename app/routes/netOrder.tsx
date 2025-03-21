import { useLoaderData, useNavigate } from "@remix-run/react";
import { ListGet } from '../backend/Server_end';
import LinkBaner from '../comp/Linkbanar';
import { TableRow } from "@mui/material";
import '../css/netOrder.css';



export const loader = async() => {
  const URLs = await ListGet('A2:B','ネット発注');

  return URLs;
};

export default function NETOrder() {
  const loaderData = useLoaderData<typeof loader>();
  return(
    <div className="NetOrderLinkWindow">
      <div className="banner">
        <LinkBaner/>
      </div>
      <div className="NetOrderLinkArea">
        <div className="NetOrderLinkTitle">ネット発注リンク一覧</div>
        <table className="NetOrderLinkTable">
          <tr>
            <th>業者</th>
            <th>リンク先</th>
          </tr>
          {loaderData.map((row,index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td><a href={row[1]} target="_blank">{row[1]}</a></td>
            </tr>
          ))}
        </table>
        
      </div>
    </div>
  );
}