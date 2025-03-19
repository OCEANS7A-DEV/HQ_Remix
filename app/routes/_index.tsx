import type { MetaFunction } from "@remix-run/node";
import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import LinkBaner from '../comp/Linkbanar';



export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <div><h2>本部在庫</h2></div>
        <div>
          <LinkBaner/>
        </div>
      </div>
    </div>
  );
}
