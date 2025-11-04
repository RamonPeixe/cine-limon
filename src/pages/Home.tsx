import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/Movie";
import { Table, Spin, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMovies } from "@/hooks/useMovies";

export default function Home() {
  const navigate = useNavigate();
  const { movies, loading, error } = useMovies();

  const columns: ColumnsType<Movie> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-leaf-700">Catálogo de Filmes</h1>
      {error && <Alert type="error" message={error} showIcon className="mb-4" />}
      <Spin spinning={loading} tip="Carregando filmes...">
        <Table 
          columns={columns} 
          dataSource={movies} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => navigate(`/read/${record.id}`),
            className: 'cursor-pointer hover:bg-gray-50'
          })}
        />
      </Spin>
    </div>
  );
}