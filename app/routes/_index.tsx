import type { MetaFunction } from "@remix-run/node";
import { LinearProgress } from '@mui/material';
import { Link, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import Links from '../comp/Links';



export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigation = useNavigation(); // ページ遷移の状態取得
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (navigation.state === "loading") {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, [navigation]);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <div><h2>本部在庫</h2></div>
        <div>
          <Links/>
        </div>
      </div>
    </div>
  );
}
