import React, { useState, useEffect } from 'react';
import { getMonthString } from '../backend/utils'
import { shortageGet, ListGet, orderGet } from '../backend/Server_end';
import '../css/kinbatoPrint.css';
import '../css/taiyoPrint.css';
import { useLoaderData, Link, useNavigation } from "@remix-run/react";

interface SettingProps {
  setCurrentPage: (page: string) => void;
}


export const loader =  async ({ request }: { request: Request }) => {

  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? '2025-03-24';
  const vendor = url.searchParams.get("vendor");
  const address = url.searchParams.get("address");
  const productData = await ListGet('B2:C','在庫一覧');

  const Addressdata = await ListGet('A2:H','その他データ');

  const addressresult = Addressdata.find(row => row[0] === address)
  const Vendorresult = Addressdata.find(row => row[0] === vendor)



  const data = await shortageGet()
  const filtered = data.filter((row) => row[0] === vendor && (row[12] < 0 || (Number(row[14]) >= 1 && Number(row[12]) <= Number(row[14]))))

  let resultData = []
  let subData = []
  let subdata = []



  if(vendor === '三久'){
    //console.log(data.filter((row) => row[0] === vendor && row[12] < 0 ))
    resultData = filtered.map(items => {
      //console.log(items)
      if(items[11] !== ''){
        let shortage = items[12];
        let orderNum = 0
        let ordernumCount = Number(items[11])
        if(shortage < 0){
          while (shortage < 0){
            shortage += ordernumCount
            orderNum += ordernumCount
          }
        }else{
          orderNum += ordernumCount
        }
        
        return [items[2],orderNum]
      }else{
        return [items[2], -(items[12])]
      }
    })
  }else if(vendor === 'タムラ'){
    const TamuraList = (await ListGet('A2:B','商品詳細一覧')).filter(row => row[0] > 700000 && row[0] < 800000 );
    const subFilter = filtered.filter((row) => row[2].indexOf('eco') == -1)
    const ecoData = filtered.filter(row => row[2].indexOf('eco') !== -1)
    resultData = subFilter.map(items => {
      if(items[11] !== ''){
        let shortage = items[12];
        let orderNum = 0
        let ordernumCount = Number(items[11])
        while (shortage < 0){
          shortage += ordernumCount
          orderNum += ordernumCount
        }
        return [items[2],orderNum]
      }else{
        return [items[2], -(items[12])]
      }
    })
    const order = await orderGet()
    const filteredData = order
      .filter((row: any) => {
        const utcDate = new Date(row[0]);
        const japanTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
        const formattedJapanDate = japanTime.toISOString().split('T')[0];
        return formattedJapanDate === date;
      });
    const tamurastoreorder = filteredData.filter(row => row[2] == 'タムラ' || row[2] == 'ﾀﾑﾗ')
    const tamurastring = tamurastoreorder.filter(row => typeof row[3] === 'string')
    const push = [tamurastring[0][4],tamurastring[0][6]]
    resultData.push(push)
    TamuraList.map(maprow => {
      const datafilter = tamurastoreorder.filter(row => row[3] === maprow[0] && row[5] === maprow[1])
      const filtermap = datafilter.map(mrow => mrow[6])
      const total = filtermap.reduce((sum, item) => (sum += item), 0);
      const productName = productData.find(row => row[0] == maprow[0])
      if(total >= 1){
        resultData.push([`${productName[1]} ${maprow[1]}`,total])
      }
    })

  }else if (vendor === 'ムラカミ'){
    const order = await orderGet()
    const murakamidata = order.filter((row:any) => row[2] === vendor && row[3] === 100001)
    const filteredData = murakamidata
      .filter((row: any) => {
        const utcDate = new Date(row[0]);
        const japanTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
        const formattedJapanDate = japanTime.toISOString().split('T')[0];
        return formattedJapanDate === date;
      });
    subdata = [...new Set(filteredData.map(items => items[1]))]
    subData = filteredData
    let returndata = []
    
    if (data){
      for (let i = 0; i < data.length; i++){
        if(data[i][1] !== 100001 && data[i][0] === vendor && data[i][12] < 0){
          //console.log(data[i])
          let shortageNum = Number(data[i][11]);
          let num = 0;
          if (data[i][11] !== "" || Number(data[i][11]) > 0) {
            while (shortageNum < 0) {
              shortageNum += Number(data[i][11])
              num += Number(data[i][11])
            }
          }
          returndata.push([data[i][2], -(Number(data[i][12]))])
        }
      }
    }
    //console.log(returndata)
    resultData = returndata
    //const resultdata = returndata.filter(row => !row[0].includes('ﾙﾍﾞﾙ'))
  }

  let calcD = 24 - resultData.length
  for (let i = 0; i < calcD; i ++){
    resultData.push(['',''])
  }
  
  return [resultData, date, addressresult, Vendorresult, subData, subdata]
}





export default function ThankyouPrintPage() {
  const [data, Date, ShippingAddress, VendorData, subData, subdata] = useLoaderData<typeof loader>();
  const [NowDay, setNowDay] = useState('');

  const [Boolean, setBolean] = useState(false)
  const [TamuraBoolean, setTamuraBoolean] = useState(false);


  useEffect(() => {
    const Now = getMonthString();
    setNowDay(Now)
    return
    const vendordata = JSON.parse(sessionStorage.getItem('EtcData') ?? '');
    const addressdata = sessionStorage.getItem('AddressSet') ?? '本部事務所'
    setShippingAddress(vendordata.find(row => row[0] == addressdata))
    setVendorData(vendordata.find(row => row[0] == '三久'))

    let insertData = JSON.parse(sessionStorage.getItem('shortageSet') ?? '');
    let returndata = []
    if (insertData){
      for (let i = 0; i < insertData.length; i++){
        let shortageNum = Number(insertData[i][12]);
        let num = 0;
        if (insertData[i][11] !== "" && Number(insertData[i][11]) > 0) {
          console.log('true')
          console.log(shortageNum)
          while (shortageNum < 0) {
            shortageNum += Number(insertData[i][11])
            num += Number(insertData[i][11])
          }
          returndata.push(['', insertData[i][2], num, '', '', ''])
        } else {
          console.log('else')
          returndata.push(['', insertData[i][2], -(Number(insertData[i][12])), '', '', ''])
        }
      }
    }
    let calcD = 24 - returndata.length
    for (let i = 0; i < calcD; i ++){
      returndata.push(['','','','','',''])
    }
    
    setMurakamiData(returndata)
  }, [])


  useEffect(() => {
    if(VendorData[0] === 'ムラカミ'){
      setBolean(true)
    }else if (VendorData[0] === 'タムラ'){
      setTamuraBoolean(true)
    }
    console.log(data)
    console.log(Date)
    console.log(NowDay)
    console.log(ShippingAddress)
    console.log(subData)
    console.log(subdata)


  },[])


  return(
    <div className="PrintbackGround">
      <div className="kinbato-top">
        <h1 className="H1">
          注文書
        </h1>
        <div className="address-area">
          <div className="kinbato-left">
            <h2 className="taiyo-Data-name">株式会社　{VendorData[0]}　御中</h2>
            {/* <div className="taiyo-Data-name"><div className="kinbato-date">{NowDay}</div></div> */}
            <div className="taiyo-Data-name">TEL:{VendorData[3]}</div>
            <div className="taiyo-Data-name">FAX:{VendorData[2]}</div>
            <div className="taiyo-Data-name"><h3 className="order-message">お世話になります<br/>ご注文宜しくお願いします。</h3></div>
          </div>
          {TamuraBoolean && 
            <div className="tamura-manager-area">
              <div>タムラ担当者</div>
              <div className="tamura-manager">
                <div>{VendorData[6]}</div>
              </div>
            </div>
          }
          <div className="kinbato-right">
            <div className="ocean-area">
              <div>{ShippingAddress[6]}</div>
              <div>{ShippingAddress[5]}</div>
              <div>TEL {ShippingAddress[3]}</div>
              <div className="kinbato-tantou">担当</div>
              <div>FAX {ShippingAddress[3]}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="taiyo-tableArea">
        <table className="taiyo-table">
          <thead>
            <tr className="kinbato-header">
              <th className="taiyo-name-data">商品名</th>
              <th className="taiyo-num-data">個数</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row,index) => (
              <tr key={index}>
                <td className="murakami-name-data">{row[0]}</td>
                <td className="murakami-num-data">{row[1]}</td>
              </tr>
            ))}
          {Boolean &&
            <tr>
              <td colSpan="2" className="murakami-last-data">プロステップは別紙です</td>
            </tr>
          }
          </tbody>
        </table>
        {Boolean && 
          <div>
            <table className="taiyo-table">
              <thead>
                <tr className="kinbato-header">
                  <th colSpan="2" className="murakami-top-data">プロステップヘアカラー</th>
                </tr>
              </thead>
            </table>
            {subdata.map((row, index) => {
              const matchdata = subData.filter(rowdata => rowdata[1] === row);
              return (
                <table className="taiyo-table">
                  <thead>
                    <tr className="murakami-header">
                      <th colSpan="2" className="murakami-store-data">{row}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchdata.map((Idata, Iindex) => (
                      <tr key={Iindex}>
                        <td className="murakami-name-data">{Idata[5]}</td>
                        <td className="murakami-num-data">{Idata[6]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })}
          </div>
        }
        
        
      </div>
    </div>
  );  
}