import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { UserList } from '../components/UserList';
import { ModalForm } from '../components/ModalForm';
import { IUser } from '../interfaces/UserInterface.tsx';
import axios from 'axios';

const queryClient = new QueryClient();

const fetchUsersApi = async (): Promise<IUser[]> => {
  const response = await axios.get('https://66ed7999380821644cdcfa8c.mockapi.io/api/users');
  return response.data;
};

//Página principal

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null); 

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleEdit = async (data: IUser) => {
    setSelectedUser(data);
    handleOpen();
  };

  const handleDelete = async (data: IUser) => {
    try {
      await axios.delete(`https://66ed7999380821644cdcfa8c.mockapi.io/api/users/${data.id}`);
      console.log('Usuário Deletado com sucesso:');
      refetch();
    } catch (error) {
      console.log()
      console.error('Erro ao Deletar usuário:', error);
    }
  };

  const { data: users = [], error, isLoading, refetch } = useQuery<IUser[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsersApi,
  });

  if (isLoading) return <div className='w-screen h-screen flex justify-center items-center'><div className='text-3xl font-bold'>Loading...</div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App w-full min-h-screen bg-gray-200">
      <h1 className='text-center font-bold  text-2xl md:text-4xl pt-10'>
        Consulta e Cadastro de <span className='text-amber-500'>Usuários</span> por <span className='text-amber-500'>API</span>
      </h1>
      
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete}/>
      
      <div className='w-full flex justify-center py-10'>
        <button onClick={handleOpen} className='bg-amber-500 p-4 text-white font-bold rounded-lg hover:bg-amber-600'>
          Abrir Cadastro
        </button>
      </div>
      
      {openModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
        onClick={handleClose}>
           <div onClick={(e) => e.stopPropagation()}>
              <ModalForm 
              onClose={handleClose} 
              onUserAdded={refetch} 
              user={selectedUser}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default WrappedApp;