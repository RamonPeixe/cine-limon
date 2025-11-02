import { useNavigate } from "react-router-dom";
import { MovieService } from "../services/MovieService";
import { useState, useEffect } from "react";
import type { Movie } from "../types/Movie";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await MovieService.getAll();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const columns: ColumnsType<Movie> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-leaf-700">Catálogo de Filmes</h1>
      <Table 
        columns={columns} 
        dataSource={movies} 
        rowKey="id"
        onRow={(record) => ({
          onClick: () => navigate(`/read/${record.id}`),
          className: 'cursor-pointer hover:bg-gray-50'
        })}
      />
    </div>
  );
}