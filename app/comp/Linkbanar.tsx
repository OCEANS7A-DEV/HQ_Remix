import { useLoaderData, Link, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import ProgressBar from './ProgressBar';
import { LinearProgress } from '@mui/material';
import '../css/Links.css';


const LinkBaner = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(navigation.state === 'loading');


  useEffect(() => {
    console.log(navigation.state)
    if (navigation.state === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigation.state]);
  return(
    <div>
      <div className="loadarea">
        {/* <ProgressBar
          isOpen={loading}
        /> */}
        {/* <LinearProgress color="primary" style={{ width: '100%' }} value={50}/> */}
        {loading && (
          <LinearProgress color="primary" style={{ width: '100%' }} value={50}/>
        )}
      </div>
      <div className="Link-area">
        <Link className="link" to="/">トップ</Link>
        <Link className="link" to="/about">アバウト</Link>
        <Link className="link" to="/Receiving_stock">入庫</Link>
      </div>
      
    </div>
  );
}

export default LinkBaner;