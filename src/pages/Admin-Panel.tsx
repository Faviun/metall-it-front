import ParserData from "@/features/adminPanel/ParserData";
import ParserTable from "@/features/adminPanel/ParserTable";
import UnificTable from "@/features/adminPanel/UnificTable";
import { useState } from "react";

export default function AdminPanel() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://185.23.34.85:3000/parser-evraz/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="flex w-ful bg-gray-100 px-[100px] py-[50px] gap-10">
      <div className='flex flex-col gap-10'>
        <div className="bg-blue-gray-200 rounded-lg shadow-md flex flex-col items-center gap-5 w-[300px] px-[25px] pt-8">
        <h1 className="text-2xl font-bold mb-4">Панель настройки парсеров</h1>
        <ParserData link='http://185.23.34.85:3000/parser-brokinvest' name='Brokinvest' urlProvider='https://www.brokinvest.ru/catalog' />
        <ParserData link='http://185.23.34.85:3000/parser-demidov' name='Demidov' urlProvider='https://demidovsteel.ru/catalog/' />
        <ParserData link='http://185.23.34.85:3000/parser-dipos' name='Dipos' urlProvider='https://dipos.ru/' />
        <ParserData link='http://185.23.34.85:3000/parser-ktzholding' name='Ktzholding' urlProvider='https://ktzholding.com/category/truba' />
        <ParserData link='http://185.23.34.85:3000/parser-mc' name='mc' urlProvider='https://mc.ru/products/msk' />
        <ParserData link='http://185.23.34.85:3000/parser-metallotorg' name='Metallotorg' urlProvider='https://metallotorg.ru/info/pricelists/moscow/' />
        <ParserData link='http://185.23.34.85:3000/parser-ntpz' name='Ntpz' urlProvider='https://ntpz.ru/' />
        <ParserData link='http://185.23.34.85:3000/parser-ag' name='AG amrket' urlProvider='https://ag.market/catalog/' />
        {/* Evraz parser */}
        <div className='flex flex-col gap-5 bg-white border-2 border-black rounded-lg w-full h-auto p-4 mb-6'>
            <a className='text-2xl' href="https://evraz.market/pricelist/"><h2>Парсер Evraz</h2></a>
            <input type="file" accept=".xlsx" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          <button className="bg-gray-300" onClick={handleUpload}>Загрузить</button>
        </div>
        </div>
        <UnificTable />
      </div>
      <ParserTable />
    </div>

  );
}