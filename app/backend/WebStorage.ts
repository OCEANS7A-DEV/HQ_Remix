import { stockList, ListGet } from '../backend/Server_end';
import * as jaconv from 'jaconv';


export default function main(){}
export const localStoreSet = async () => {
  const storeData = await ListGet('A2:A','その他一覧');
  const filter = storeData.flat(1).filter(row => row !== "本部")
  localStorage.setItem('storeData', JSON.stringify(filter))
}

export const localVendorSet = async () => {
  const vendorData = await ListGet('D2:D','その他一覧');
  localStorage.setItem('vendorData', JSON.stringify(vendorData.flat(1)))
};

export const localStorageSet = async (
) => {
  const data = await stockList();
  localStorage.setItem('data', JSON.stringify(data));
};

export const PrintDataSet = async (
  data: any,
  storename: string
) => {
  sessionStorage.setItem('Printdata', JSON.stringify(data));
  sessionStorage.setItem('Printname', storename);
};

export const searchStr = async (searchword: string) => {
  const swKZ = jaconv.toKatakana(searchword);
  const swHZ = jaconv.toHiragana(swKZ);
  const swKH = jaconv.toHan(swKZ);
  const data = JSON.parse(localStorage.getItem('data'));
  if (!data || data.length === 0) {
    console.log('データが存在しません。');
    return [];
  }
  const result = data.filter((item: any[]) => {
    const productName = item[2];
    if (typeof productName !== 'string') {
      console.log('商品名が文字列ではありません:', productName);
      return false;
    }
    return (
      productName.indexOf(swKZ) !== -1 ||
      productName.indexOf(swKH) !== -1 ||
      productName.indexOf(swHZ) !== -1
    );
  });
  return result;
};

export const SelectlocalStoreSet = async () => {
  const storeData = await ListGet('A2:A','その他一覧');
  const options = storeData.map((store: string) => ({
    value: store[0],
    label: store,
  }));
  localStorage.setItem('SelectstoreData', JSON.stringify(options))
}

export const ETCDATAGET = async () => {
  const data = await ListGet('A2:H','その他データ');
  sessionStorage.setItem('EtcData',JSON.stringify(data))
  return data;
}


export const search = async (searchword: string, searchdata: any) => {
  const swKZ = jaconv.toKatakana(searchword);
  const swHZ = jaconv.toHiragana(swKZ);
  const swKH = jaconv.toHan(swKZ);
  const data = searchdata;
  if (!data || data.length === 0) {
    console.log('データが存在しません。');
    return [];
  }
  const resultdata = data.filter((item: any[]) => {
    const productName = item[2];
    if (typeof productName !== 'string') {
      console.log('商品名が文字列ではありません:', productName);
      return false;
    }
    return (
      productName.indexOf(swKZ) !== -1 ||
      productName.indexOf(swKH) !== -1 ||
      productName.indexOf(swHZ) !== -1
    );
  });

  return resultdata.length > 0;
};
