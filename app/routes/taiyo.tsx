import { useEffect, useState } from 'react';
import { kaigisituOrder, taiyoOrder, shortageGet, stockList } from '../backend/Server_end';
import '../css/taiyoPrint.css';
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { Print } from '../backend/utils';


export const loader = async ({ request }: { request: Request }) => {
  let result = [];
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const vendor = url.searchParams.get("vendor");
  const address = url.searchParams.get("address");

  if(address !== '会議室'){
    const resultData = await shortageGet();
    const filterd = resultData.filter((row) => row[0] === vendor && row[12] < 0)
    if (filterd){
      for (let i = 0; i < filterd.length; i++){
        let shortageNum = Number(filterd[i][12]);
        let num = 0;
        if (filterd[i][11] !== "" && Number(filterd[i][11]) > 0) {
          while (shortageNum < 0) {
            shortageNum += Number(filterd[i][11])
            num += Number(filterd[i][11])
          }
          result.push(['', filterd[i][2], num, '', '', ''])
        } else {
          result.push(['', filterd[i][2], -(Number(filterd[i][12])), '', '', ''])
        }
      }
    }
  }else{
    const productdata = await stockList();
    const data = await kaigisituOrder();
    const filterdate = new Date(date)
    filterdate.setHours(filterdate.getHours() - 9)
    const datefilter = data.filter(row => new Date(row[0]).toLocaleString() === filterdate.toLocaleString())

    const filter = datefilter.filter(row => row[2] == '大洋商会' || row[2] == '大洋')
    for (let i = 0; i < filter.length; i++){
      let matchdata = productdata.filter(row => row[1] == filter[i][3])
      let count = 0;
      let num = 0;
      while (num < filter[i][6]) {
        count++
        num += matchdata[0][11] + matchdata[0][10]
      }
      let serviceNum = count * matchdata[0][10]
      result.push(['', filter[i][4], num - serviceNum, '', '', ''])
    }
  }
  
  let calcD = 16 - result.length
  for (let i = 0; i < calcD; i ++){
    result.push(['','','','','',''])
  }
  return result;
};


export default function TaiyoPrint() {
  const taiyoData = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address") || "";
  const [ShippingAddress, setShippingAddress] = useState([]);
  const [VendorData, setVendorData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const vendordata = JSON.parse(sessionStorage.getItem('EtcData') ?? '');
    setVendorData(vendordata.find(row => row[0] == '大洋商会'));
    const Address = vendordata.find(row => row[0] == address)
    setShippingAddress(Address)
  },[])

  useEffect(() => {
    Print();
    navigate(`/process_chack`)
  },[taiyoData])
  
  return(
    <div className="taiyobackGround">
      <div className="taiyotop">
        <h1 className="taiyoH1">FAX注文書</h1>
      </div>
      <div className="sub_top">
        <div className="sub_top2">
          <h2 className="taiyo-Data">　</h2>
          <h2 className="taiyo-Data-name">㈱大洋商会　御中</h2>
        </div>
        <div className="sub_top2">
          <h2 className="taiyo-Data-number">FAX{VendorData[2]}</h2>
          <h2 className="taiyo-Data-number">TAL{VendorData[3]}</h2>
        </div>
      </div>
      <div className="taiyo-tableArea">
        <table className="taiyo-table">
          <thead>
            <tr className="taiyo-table-header">
              <th className="taiyo-number">カタログ<br/>掲載番号</th>
              <th className="taiyo-name">商品名</th>
              <th className="taiyo-num">数量</th>
              <th className="taiyo-Dnum">ディーラー<br/>価格</th>
              <th className="taiyo-Snum">サロン価格</th>
              <th className="taiyo-bikou">備考</th>
            </tr>
          </thead>
          <tbody>
            {taiyoData.map((row, index) => (
              <tr key={index}>
                <td className="taiyo-number-data">{row[0]}</td>
                <td className="taiyo-name-data">{row[1]}</td>
                <td className="taiyo-num-data">{row[2]}</td>
                <td className="etc"></td>
                <td className="etc"></td>
                <td className="etc"></td>
              </tr>
            ))}
            <>
              <tr className="taiyo-saron-last">
                <td colSpan="6" className="special-row-saron">
                  <h2 className="sarontop">サロン直送</h2>
                  <div className="taiyo-saron-table">
                    <tr className="saronname">
                      <td className="sarontitle">サロン名</td>
                      <td className="saronData">{ShippingAddress[6]}</td>
                    </tr>
                    <tr className="saronname">
                      <td className="sarontitle">配送先</td>
                      <td className="saronData">〒{ShippingAddress[4]}　{ShippingAddress[5]}</td>
                    </tr>
                    <tr className="saronname">
                      <td className="sarontitle">電話</td>
                      <td className="saronData">082-569-8401</td>
                    </tr>
                  </div>
                </td>
              </tr>
              <tr className="taiyo-saron-message">
                <td colSpan="6" className="special-row">
                  <h3 className="sarontop">お世話になります。<br/>ご注文よろしくお願いします</h3>
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </div>
    </div>
  )
};



