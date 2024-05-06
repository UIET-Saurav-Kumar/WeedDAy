"use client";
import { Inter } from "next/font/google";
import { useJobdataQuery } from "@/redux/apiSlice";
import { useState, useEffect, useMemo } from "react";
import UserCard from "@/components/userCard";
import React from "react";
import Select from "react-select";
import {roleData , employeesData , remoteData, experienceData, baseSalaryData } from "@/data";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [role, setRole] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [minBasePay , setMinBasePay] = useState(null)
  const [experience  , setExperience] = useState(null)
  const [searchbox  , setSearchBox] = useState("")

  const { data, isLoading } = useJobdataQuery({ limit: limit, offset: 0 });
  console.log("data", experience);

  // const filteredJdList = data?.jdList?.filter(jd => {
  //   return jd.companyName.toLowerCase().includes(searchbox.toLowerCase());
  // });

  const filteredJdList = useMemo(() => {
    return  data?.jdList?.filter((jd : any ) => {
      const matchesSearch =  jd.companyName.toLowerCase().includes(searchbox.toLowerCase());
      //@ts-ignore
      const matchesJobRole = role.length === 0 || role.some(rol => rol?.value === jd?.jobRole);
      //@ts-ignore
      const matchesExperienceLevel = !experience ||  (jd.minExp <= experience?.value && jd.maxExp >= experience?.value);
      //@ts-ignore
      const matchesMinBasePay = !minBasePay || (jd.minJdSalary >= minBasePay?.value);
      return matchesSearch && matchesJobRole && matchesExperienceLevel && matchesMinBasePay;
    });
  }, [data, searchbox , role , experience , minBasePay]);

  console.log("filteredJdList" , filteredJdList)

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
    <main className={`  px-6 ${inter.className}`}>
      
      <div className="flex gap-2 mt-10 flex-wrap">
        <Select
          value={role}
          //@ts-ignore
          onChange={(data) => setRole(data)}
          //@ts-ignore
          options={roleData}
          isMulti
          placeholder="Roles"
          styles={{
            control: (provided, state) => ({
              ...provided,
              minHeight: '50px', 
              minWidth : '200px',
            }),
          }}
        />

        <Select
          value={employees}
          //@ts-ignore
          onChange={(data) => setEmployees(data)}
          //@ts-ignore
          options={employeesData}
          isMulti
          placeholder="Number of Employees"
          styles={{
            control: (provided, state) => ({
              ...provided,
              minHeight: '50px', 
            }),
          }}
        />

        <Select
          value={experience}
          //@ts-ignore
          onChange={(data) => setExperience(data)}
          options={experienceData}
          isClearable
          placeholder="Experience"
          styles={{
            control: (provided, state) => ({
              ...provided,
              minHeight: '50px', 
            }),
          }}
        />

        <Select
          value={jobType}
          //@ts-ignore
          onChange={(data) => setJobType(data)}
          //@ts-ignore
          options={remoteData}
          isMulti
          placeholder="Remote"
          styles={{
            control: (provided, state) => ({
              ...provided,
              minHeight: '50px', 
            }),
          }}
        />

        <Select
          value={minBasePay}
          //@ts-ignore
          onChange={(data) => setMinBasePay(data)}
          options={baseSalaryData}
          isClearable
          placeholder="Minimum Base Pay Salary"
          styles={{
            control: (provided, state) => ({
              ...provided,
              minHeight: '50px', 
            }),
          }}
        />



        <div>
          <input type="text" value={searchbox} onChange={(e)=>setSearchBox(e.target.value)}  placeholder="Search Company Name"  className="px-2 py-0.5 text-gray-500 border border-gray-300 rounded h-[50px] appearance-none outline-none" />
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 mb-20">
          {filteredJdList?.map((item : any) => {
            return (
              <div key={item?.jdUid}>
                <UserCard data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
