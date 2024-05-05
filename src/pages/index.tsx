'use client'
import Image from "next/image";
import { Inter } from "next/font/google";
import { useJobdataQuery } from "@/redux/apiSlice";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [limit , setLimit] = useState(10)
 

  const {data , isLoading} = useJobdataQuery({"limit": limit , "offset": 0})
  console.log("data" , data)

  if(isLoading) return "loading.."
  return (
    <main
      className={` ${inter.className}`}
    >
     hellow world

    </main>
  );
}
