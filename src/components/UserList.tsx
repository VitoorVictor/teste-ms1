import React from 'react';
import {IUser} from '../interfaces/UserInterface'

interface IUserListProps {
    users: IUser[];
  }
// Lista de Usuários vindo da API
export const UserList: React.FC<IUserListProps> = ({ users }) => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <h2 className='font-bold text-xl my-10 md:text-3xl'>Lista de Usuários</h2>
        <div className="overflow-x-auto w-full max-w-4xl">
            <table className='table-auto bg-white border-2 border-black w-full text-center'>
            <thead className='border-2 border-black'>
                <tr>
                <th className='border px-2 md:px-4 py-1 md:py-2'>Id</th>
                <th className='border px-2 md:px-4 py-1 md:py-2'>Nome</th>
                <th className='border px-2 md:px-4 py-1 md:py-2'>Email</th>
                <th className='border px-2 md:px-4 py-1 md:py-2'>Cidade</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                    <td className='border px-2 md:px-4 py-1 md:py-2'>{user.id}</td>
                    <td className='border px-2 md:px-4 py-1 md:py-2'>{user.name}</td>
                    <td className='border px-2 md:px-4 py-1 md:py-2'>{user.email}</td>
                    <td className='border px-2 md:px-4 py-1 md:py-2'>{user.city}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    );
  };

export default UserList;
