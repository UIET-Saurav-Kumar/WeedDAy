"use client";
import { Inter } from "next/font/google";
import { useJobdataQuery } from "@/redux/apiSlice";
import { useState , useEffect} from "react";
import UserCard from "@/components/userCard";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useJobdataQuery({ limit: limit, offset: 0 });
  console.log("data", data);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLimit((prevPage) => prevPage + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return "loading..";
  return (
    <main className={` flex w-full justify-center px-6 ${inter.className}`}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 mb-20">
      {data?.jdList?.map((item) => {
        return (
          <div key={item?.jdUid}>
            <UserCard data={item} />
          </div>
        )
      })}
      </div>
      
    </main>
  );
}
