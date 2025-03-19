import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import "./tailwind.css";
import { LinearProgress } from '@mui/material';
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {

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
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 100,
            }}
          >
            <LinearProgress color="primary" style={{ width: '100%' }} value={50}/>
          </div>
        )}
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload/>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
