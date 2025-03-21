import React, { useEffect, useState } from 'react';
import { ProcessConfirmationGet, OrderDeadline, orderGet, GASProcessUpdate, QuantityReset, shortageGet,kaigisituOrder } from '../backend/Server_end';
import { localStoreSet, PrintDataSet, SelectlocalStoreSet, ETCDATAGET } from '../backend/WebStorage';
import Select from 'react-select';
import '../css/process_check.css';
import '../css/a_button.css';
import LinkBaner from '../comp/Linkbanar';
//import DeadLineDialog from './DeadLineDialog';
//import QuantityResetDialog from './QuantityResetDialog';
import toast from 'react-hot-toast';

import MoonLoader from 'react-spinners/MoonLoader';

import { useNavigate } from "@remix-run/react";


import { useLoaderData, Link, useNavigation } from "@remix-run/react";





interface SelectOption {
  value: string;
  label: string;
}







const CurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  const resultdate = year + '/' + month + '/' + day
  return resultdate
}
const DateNow = CurrentDate();

export default function HQPage() {
  const [checkresult, setCheckResult] = useState([]); // 処理結果を管理する状態
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [storeSelect, setStoreSelect] = useState<SelectOption | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const message = `今回の店舗からの注文を${DateNow}で締め切りますか？`;
  const rowNum = 19;
  const [getDate, setGetDate] = useState('');
  const [addressSelect, setAdoressSelect] = useState<SelectOption | null>(null);
  const [vendorSelect, setVendorSelect] = useState<SelectOption | null>(null);
  const [VendorList, setVendorList] = useState<SelectOption | null>(null);
  const [AddressList, setAddressList] = useState<SelectOption | null>(null);

  const [orderData, setOrderData] = useState([]);

  const [Listload, setListload] = useState(false);

  const navigate = useNavigate();

  const VendorListGet = async () => {
    const vendordata = await ETCDATAGET()
    //console.log(vendordata)
    const list = vendordata.filter(row => row[1] === "FAX");
    const result = list.map((row) => ({
      value: row[0],
      label: row[0]
    }))
    //console.log(result)
    setVendorList(result)
  };


  const OceanListGet = async () => {
    const alllist = await ETCDATAGET()
    const list = alllist.filter(row => row[7] === 'オーシャン');
    const result = list.map((row) => ({
      value: row[0],
      label: row[0]
    }))
    //console.log(result)
    setAddressList(result)
  };


  const PrintProcessList = async () => {
    //sessionStorage.setItem('setDATE',getDate)
    const setdate = sessionStorage.getItem('setDATE')
    if(getDate === '') {
      toast.error('取得する日付が入力されていません。')
      return
    }
    setListload(true)
    const ordersGet = await ProcessConfirmationGet(setdate);
    const storeList = await JSON.parse(localStorage.getItem('storeData') ?? '').flat(1);
    setOrderData(ordersGet)
    const store = [...new Set(ordersGet.map(row => row[1]))]
    store.sort((a,b) => {
      return storeList.indexOf(a) - storeList.indexOf(b);
    })
    let resultData = []
    storeList.map((row) => {
      const storefilter = ordersGet.filter((rowData) => rowData[1] === row)
      const processlist = storefilter.map(process => process[12])
      let resultdata = {storeName: row, process: ''}
      const donere = processlist.includes('印刷済')
      const notre = processlist.includes('未印刷')
      const nonere = processlist.includes('注文無')
      if(donere && !notre && !nonere){
        resultdata.process = '印刷済';
      }else if(!donere && notre && !nonere){
        resultdata.process = '未印刷';
      }else if(donere && notre && !nonere){
        resultdata.process = '一部未印刷';
      }else if(!donere && !notre && !nonere){
        resultdata.process = '未注文';
      }else if(nonere && !donere && !notre){
        resultdata.process = '注文無';
      }
      resultData.push(resultdata)
    })
    setCheckResult(resultData);
    setListload(false)
  };


  useEffect(() => {
    const getLocalStorageSize = async () => {
      const cachedData = await JSON.parse(localStorage.getItem('storeData') ?? '');
      const storedatalist: SelectOption[] = [];
      for (let i = 0; i < cachedData.length; i++){
        storedatalist.push(
          {
            value: cachedData[i],
            label: cachedData[i],
          }
        )
      }
      setSelectOptions(storedatalist);
      await SelectlocalStoreSet(storedatalist);
    }
    setGetDate(sessionStorage.getItem('setDATE') ?? '');
    getLocalStorageSize();
    VendorListGet();
    OceanListGet();
  },[])

  useEffect(() => {
    if(getDate !== ''){
      PrintProcessList()
    }
  },[getDate])

  useEffect(() =>{
    const resetDate = sessionStorage.getItem('printdate') ?? ''
    if(resetDate !== ''){
      setGetDate(resetDate);
      PrintProcessList(resetDate);
    }
  },[])




  const handleConfirm = () => {
    OrderDeadline();
    alert('確認が完了しました');
    setDialogOpen(false);
  };

  const handleCancel = () => {
    alert('キャンセルされました');
    setDialogOpen(false);
  };

  const handleOrderPrint = async () => {
    //console.log(storeSelect)
    let storeprintname = '';
    if (storeSelect){
      storeprintname = storeSelect.value
    }
    //console.log(storeprintname)
    const setdate = sessionStorage.getItem('setDATE') ?? '';
    //console.log(setdate)
    const params = new URLSearchParams();
    if (setdate !== '' && storeprintname !== '') {
      params.set("date", setdate);
      params.set("store", storeprintname);
      navigate(
        `/orderPrint?${params.toString()}`
      )
    }
    //console.log(params.toString())
  };

  const allPrint = async () => {
    const printstoreList = checkresult.filter(row => row.process == '未印刷' || row.process == '一部未印刷')
    console.log(checkresult)
    checkresult.map((row) => {
      console.log(row.storeName)
    })
    return
    printstoreList.map((row) => {
      
      handleOrderPrint(row.storeName)
    })
    return
  };

  const VendorPrint = async () => {
    if (!addressSelect || !vendorSelect) {
      toast.error('業者の選択、もしくは配送先の選択がされていません。')
      return
    }
    const setdate = sessionStorage.getItem('setDATE') ?? '';
    const Vendorparams = new URLSearchParams();
    Vendorparams.set("date", setdate);
    Vendorparams.set("address", addressSelect.value);
    Vendorparams.set("vendor",vendorSelect.value)

    if (vendorSelect.value == '大洋商会') {
      navigate(`/taiyo?${Vendorparams.toString()}`);
    }else if (vendorSelect.value == 'キンバト') {
      //await setCurrentPage('KinbatoPrint');
    }else if (vendorSelect.value == 'ムラカミ') {
      //await setCurrentPage('MurakamiPrint');
    }else if (vendorSelect.value == '三久') {
      //await setCurrentPage('ThankyouPrint');
    }else if (vendorSelect.value == 'タムラ'){
      //await setCurrentPage('TamuraPrint');
    }
  }



  const Dateset = (date) => {
    setGetDate(date)
    sessionStorage.setItem('setDATE',date)
  }


  return (
    <div className='check_window'>
      <div className="banner">
        <LinkBaner/>
      </div>
      <div className="chack_etc">
        <div className="check_area">
          <div className="check_set">
            <button type="button" onClick={() => PrintProcessList()}>取得</button>
            <input
              type="date"
              className="insert_order_date"
              max="9999-12-31"
              value={getDate}
              onChange={(e) => Dateset(e.target.value)}
            />
          </div>
          {/* テーブルを表示 */}
          <div className="check">
            <table className='check'>
              <thead>
                <tr>
                  <th>店舗名</th>
                  <th>処理状況</th>
                </tr>
              </thead>
              <tbody>
                {Listload ? (
                  <tr>
                    <td colSpan={2}>
                      <MoonLoader loading={Listload} color="blue" />
                    </td>
                  </tr>
                ) : (
                  checkresult.map((row, index) => (
                    <tr key={index}>
                      <td className='PCstoreName'>{row.storeName}</td>
                      <td className='PCprocess'>{row.process}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className='operation_area'>
          <a className="buttonUnderline" type="button" onClick={() => setDialogOpen(true)}>
            発注区切
          </a>
          {/* <DeadLineDialog
            title="確認"
            message={message}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            isOpen={isDialogOpen}
          /> */}
        </div>
        <div className="print-set-area">
          <div className="explanation">
            印刷の際は余白をデフォルトにしてください
          </div>
          <div className="print-select-area">
            <div className="order-print">
              <div>
                <div className="title-explanation">納品書印刷</div>
                <Select
                  className="store-select"
                  placeholder="店舗選択"
                  isSearchable={false}
                  value={storeSelect}
                  onChange={(e) => setStoreSelect(e)}
                  options={selectOptions}
                />
              </div>
              <a className="buttonUnderline" type="button" onClick={() => handleOrderPrint()}>
                個別印刷
              </a>
              <a className="buttonUnderline" type="button" onClick={allPrint}>
                全未印刷
              </a>
            </div>
            <div className="order-print-vendor">
              <div>
                <div className="title-explanation">業者への発注書印刷</div>
                <Select
                  className="store-select"
                  placeholder="業者選択"
                  isSearchable={false}
                  value={vendorSelect}
                  onChange={(e) => setVendorSelect(e)}
                  options={VendorList}
                  // menuPlacement="auto"
                  // menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                />
              </div>
              <div>
                <Select
                  className="store-select"
                  placeholder="配送先選択"
                  isSearchable={false}
                  value={addressSelect}
                  onChange={(e) => setAdoressSelect(e)}
                  options={AddressList}
                  // menuPlacement="auto"
                  // menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                />
              </div>
              <a className="buttonUnderline" type="button" onClick={VendorPrint}>
                業者発注印刷
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
