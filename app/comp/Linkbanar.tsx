import { useLoaderData, Link, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import ProgressBar from './ProgressBar';
import { LinearProgress } from '@mui/material';
import '../css/banner.css';


const LinkBaner = () => {
  // const navigation = useNavigation();
  // const [loading, setLoading] = useState(navigation.state === 'loading');


  // useEffect(() => {
  //   //console.log(navigation.state)
  //   if (navigation.state === "loading") {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [navigation.state]);
  return(
    <div>
      <div className="Link-area">
        <Link className="link" to="/">トップ</Link>
        {/* <Link className="link" to="/about">テスト用</Link> */}
        <Link className="link" to="/Receiving_stock">入庫</Link>
        <Link className="link" to="/process_chack">印刷関係</Link>
        <Link className="link" to="/netOrder">発注サイトリンク</Link>
      </div>
    </div>
  );
}

export default LinkBaner;