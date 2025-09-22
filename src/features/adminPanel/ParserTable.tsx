import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  category: string;
  provider: string;
  mark: string;
  gost: string;
  price1: number;
  units1: string;
};

type ApiResponse = {
  products: Product[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
};

const ParserTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // читаем параметры
  const category = searchParams.get("category") || "";
  const provider = searchParams.get("provider") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 100;

  // универсальное обновление query параметров
const updateParams = (key: string, value: string) => {
  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  // 🔥 фикс: чтобы limit всегда сохранялся
  if (!params.get("limit")) {
    params.set("limit", String(limit));
  }

  setSearchParams(params);
};

  // при первом рендере вставляем limit=200, если его нет
  useEffect(() => {
    if (!searchParams.get("limit")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("limit", String(limit));
      setSearchParams(params);
    }
  }, []);

  // загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = new URL("http://185.23.34.85:3000/data"); // без page/limit
        searchParams.forEach((v, k) => url.searchParams.set(k, v));

        const res = await fetch(url.toString());
        const json = await res.json();
        console.log(json);


        setData(json);
      } catch (err) {
        console.error("Ошибка загрузки", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="p-6 w-full bg-gray-300">
      <h1 className="text-xl font-bold mb-4">Фильтр товаров</h1>

      {/* Фильтры */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Категория"
          value={category}
          onChange={(e) => updateParams("category", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Поставщик"
          value={provider}
          onChange={(e) => updateParams("provider", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Мин. цена"
          value={minPrice}
          onChange={(e) => updateParams("minPrice", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Макс. цена"
          value={maxPrice}
          onChange={(e) => updateParams("maxPrice", e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={sort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Без сортировки</option>
          <option value="priceAsc">Цена ↑</option>
          <option value="priceDesc">Цена ↓</option>
          <option value="nameAsc">Название ↑</option>
          <option value="nameDesc">Название ↓</option>
        </select>
      </div>

      {/* Таблица */}
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table className="w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Название</th>
              <th className="border p-2">Категория</th>
              <th className="border p-2">Поставщик</th>
              <th className="border p-2">Марка</th>
              <th className="border p-2">ГОСТ</th>
              <th className="border p-2">Цена</th>
              <th className="border p-2">Ед изм</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">{p.provider}</td>
                <td className="border p-2">{p.mark}</td>
                <td className="border p-2">{p.gost}</td>
                <td className="border p-2">{p.price1}</td>
                <td className="border p-2">{p.units1}</td>
              </tr>
            ))}
            {data?.products?.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Пагинация */}
      <div className="flex gap-2 mt-4">
  <button
    disabled={page <= 1}
    onClick={() => updateParams("page", String(page - 1))}
    className="border px-3 py-1 rounded disabled:opacity-50"
  >
    Назад
  </button>
  <span className="px-2 py-1">
    {page} / {data?.totalPages || 1}
  </span>
  <button
    disabled={page >= (data?.totalPages || 1)}
    onClick={() => updateParams("page", String(page + 1))}
    className="border px-3 py-1 rounded disabled:opacity-50"
  >
    Вперед
  </button>
</div>
    </div>
  );
};

export default ParserTable;