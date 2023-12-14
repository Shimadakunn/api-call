"use client"
import { useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[5vh] bg-slate-500 flex items-center justify-around pr-8 pl-8">
        <div className="cursor-pointer" onClick={() => {router.push("/get");}}>
          Get Coins Info
        </div>
        <div className="cursor-pointer" onClick={() => {router.push("/get2");}}>
          Get Price Info
        </div>
    </div>
  )
}

export default Header