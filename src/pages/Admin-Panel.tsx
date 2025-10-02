import ParserData from "@/features/adminPanel/ParserData";
import ParserTable from "@/features/adminPanel/ParserTable";
import UnificTable from "@/features/adminPanel/UnificTable";
import { useState } from "react";
import AdminMenu from "@/features/adminPanel/AdminMenu";
import EmployeeManagement from "@/features/adminPanel/EmployeeManagement";

export default function AdminPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [activeView, setActiveView] = useState('parsers');

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch(`${import.meta.env.VITE_API_URL}parser-evraz/upload`, {
      method: "POST",
      body: formData,
    });
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'parsers':
        return (
          <><div className='flex flex-col gap-10'>
              <div className="bg-blue-gray-200 rounded-lg shadow-md flex flex-col items-center gap-5 w-[300px] px-[25px] pt-8">
                <h1 className="text-2xl font-bold mb-4">Панель настройки парсеров</h1>
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-brokinvest`} name='Brokinvest' urlProvider='https://www.brokinvest.ru/catalog' />
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-demidov`} name='Demidov' urlProvider='https://demidovsteel.ru/catalog/' />
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-dipos`} name='Dipos' urlProvider='https://dipos.ru/' />
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-ktzholding`} name='Ktzholding' urlProvider='https://ktzholding.com/category/truba' />
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-mc`} name='mc' urlProvider='https://mc.ru/products/msk' />
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-metallotorg`} name='Metallotorg' urlProvider='https://metallotorg.ru/info/pricelists/moscow/' />
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-ntpz`} name='Ntpz' urlProvider='https://ntpz.ru/' />
                <ParserData link={`${import.meta.env.VITE_API_URL}parser-ag`} name='AG amrket' urlProvider='https://ag.market/catalog/' />
                <div className='flex flex-col gap-5 bg-white border-2 border-black rounded-lg w-full h-auto p-4 mb-6'>
                  <a className='text-2xl' href="https://evraz.market/pricelist/"><h2>Парсер Evraz</h2></a>
                  <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  <button className="bg-gray-300" onClick={handleUpload}>Загрузить</button>
                </div>
              </div>
              <UnificTable />
            </div>
            <ParserTable />
          </>
        );
      case 'employees':
            return <EmployeeManagement mode="employees" />;
        
        case 'users':
            return <EmployeeManagement mode="customers" />;
            
      case 'nomenclature':
        return <div className="w-full bg-white p-6 rounded-lg shadow-md"><h2>Номенклатура</h2><p>Здесь будет управление номенклатурой.</p></div>;
      default:
        return <div className="w-full bg-white p-6 rounded-lg shadow-md"><h2>{activeView}</h2><p>Раздел в разработке.</p></div>;
    }
  }


  return (
    <div className="flex flex-col w-full bg-gray-100 px-[100px] py-[50px] gap-8">
      <h2 className="h2-header">Панель администратора</h2>
      <div className="flex w-full gap-10 items-start">
        <AdminMenu activeView={activeView} setActiveView={setActiveView} />
        <div className="flex flex-grow gap-10">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}