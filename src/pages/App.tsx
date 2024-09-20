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

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const { data: users = [], error, isLoading, refetch } = useQuery<IUser[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsersApi,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App w-full h-screen bg-gray-200">
      <h1 className='text-center font-bold  text-2xl md:text-4xl pt-10'>
        Consulta e Cadastro de <span className='text-amber-500'>Usuários</span> vindos da <span className='text-amber-500'>API</span>
      </h1>
      
      <UserList users={users} />
      
      <div className='w-full flex justify-center my-10'>
        <button onClick={handleOpen} className='bg-amber-500 p-4 text-white font-bold rounded-lg hover:bg-amber-600'>
          Abrir Cadastro
        </button>
      </div>
      
      {openModal && (
        <ModalForm onClose={handleClose} onUserAdded={refetch} />
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
