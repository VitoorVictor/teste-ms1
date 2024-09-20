import React from 'react';
import {IUser} from '../interfaces/UserInterface'
import { FaEdit, FaTrash } from "react-icons/fa";

interface IUserListProps {
    users: IUser[];
    onEdit: (user: IUser) => void;
    onDelete: (user:  IUser) => void;
  }
// Lista de Usuários vindo da API
export const UserList: React.FC<IUserListProps> = ({ users, onEdit, onDelete }) => {
    return (
      <div className='flex flex-col items-center justify-center mx-2'>
        <div className="overflow-x-auto w-full max-w-4xl mt-10">
            <table className='table-auto bg-white border-2 border-black w-full text-center'>
            <thead className='border-2 border-black'>
                <tr>
                <th className='px-2 md:px-4 py-1 md:py-2'>Id</th>
                <th className='px-2 md:px-4 py-1 md:py-2'>Nome</th>
                <th className='px-2 md:px-4 py-1 md:py-2'>Email</th>
                <th className='px-2 md:px-4 py-1 md:py-2'>Cidade</th>
                <th className='px-2 md:px-4 py-1 md:py-2'>Operações</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0  ? 'bg-gray-200' : 'bg-white'}>
                    <td className='px-2 md:px-4 py-1 md:py-2'>{user.id}</td>
                    <td className='px-2 md:px-4 py-1 md:py-2'>{user.name}</td>
                    <td className='px-2 md:px-4 py-1 md:py-2'>{user.email}</td>
                    <td className='px-2 md:px-4 py-1 md:py-2'>{user.city}</td>
                    <td className='px-2 md:px-4 py-1 md:py-2 flex items-center justify-center'>
                        <button
                            className="text-yellow-500 hover:text-yellow-700 p-2 mr-3"
                            onClick={() => onEdit(user)}
                        >
                            <FaEdit className="h-12 w-6" />
                        </button>
                        <button
                            className="text-red-500 hover:text-red-700 p-2"
                            onClick={() => onDelete(user)}
                        >
                            <FaTrash className="h-12 w-6" />   
                        </button> 
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    );
  };

export default UserList;
