import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
  }

const fetchUsersApi = async (): Promise<User[]> => {
  const responseAxios = await axios.get('https://jsonplaceholder.typicode.com/users');
  return responseAxios.data;
};

export const UserList = () => {
  const { data, error, isLoading } = useQuery<User[], Error>({
    queryKey: ['users'], 
    queryFn: fetchUsersApi,
});

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados: {error.message}</p>;

  return (
    <div className='flex flex-col items-center justify-center w-3/6 mx-auto'>
        <h2 className='font-bold text-3xl my-10'>Lista de Usuários</h2>
        <table className='min-w-full bg-white border border-gray-300'>
            <thead>
            <tr className='bg-amber-500'>
                <th className='py-2 px-4 border-b text-left'>Nome</th>
                <th className='py-2 px-4 border-b text-left'>Email</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((user: User) => (
                <tr key={user.id} className='hover:bg-gray-100'>
                <td className='py-2 px-4 border-b'>{user.name}</td>
                <td className='py-2 px-4 border-b'>{user.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>

  );
}

export default UserList;
