'use client'
import Link from "next/link";
import Image from "next/image";



const UserCard = ({data}) => {
    return (<div className="w-full rounded-xl shadow-lg py-4 px-6 border">
    <div className="py-1 px-2 shadow-md rounded-xl gap-1 inline-flex items-center border">
      <Image
        src="/time.svg"
        height={12}
        width={12}
        alt="time"
        className="flex-none"
      />
      <span className="text-xs">Posted 10 days ago</span>
    </div>

    <div className="mt-4 flex gap-2">
      <div className="flex-none   ">
        <Image
          src={data?.logoUrl}
          height={45}
          width={27}
          alt="time"
          className="h-[45px] w-[27px]"
        />
      </div>
      <div>
        <div className="text-gray-500">{data?.companyName}</div>
        <div>{data?.jobRole}</div>
        <div className="text-xs mt-1">{data?.location}</div>
      </div>
    </div>
    <div className="text-gray-600 flex gap-1 items-center text-sm font-medium">
      <div>Estimated Salary:</div>
      <div className="mt-1">₹{data?.minJdSalary ? data?.minJdSalary : 0 } - {data?.maxJdSalary} LPA ✅ </div>
    </div>
    <div className="font-medium mt-5">About Company:</div>
    <div className="font-semibold text-sm ">About us</div>


    <div className="relative w-full">
      <div className="h-[195px] overflow-hidden">
        {data?.jobDetailsFromCompany}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent opacity-[100%] to-white pointer-events-none" />
      <Link href={data?.jdLink}><div className="absolute -bottom-3 left-[38%] text-blue-400 text-sm cursor-pointer">View job</div></Link>
    </div>

    <div className="text-gray-500 font-medium mt-6">Minium Experience</div>
    <div className="mt-1">{data?.minExp} Years</div>

    <button className="flex items-center w-full bg-[#50ebc3] justify-center rounded-lg h-10 gap-1 font-semibold mt-2">
    <Image
        src="/lightining.svg"
        height={12}
        width={12}
        alt="time"
        className="flex-none"
      />
      Easy Apply
    </button>
    <button className="flex items-center w-full bg-[#4641d7] justify-center rounded-lg h-10 gap-2 text-white mt-2">
      <div></div>
      <div>Unlock referral asks</div>
      </button>
  </div> );
}
 
export default UserCard;