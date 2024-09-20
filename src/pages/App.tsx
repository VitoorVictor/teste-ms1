import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserList } from '../components/UserList';
import { ModalForm } from '../components/ModalForm';
import { IUser } from '../interfaces/UserInterface.tsx'
import axios from 'axios';

const queryClient = new QueryClient();

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]); // Adicione estado para usuários

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // Função para buscar usuários
  const fetchUsersApi = async () => {
    const response = await axios.get('https://66ed7999380821644cdcfa8c.mockapi.io/api/users');
    setUsers(response.data);
  };

  // UseEffect para buscar usuários ao montar
  useEffect(() => {
    fetchUsersApi();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App w-full">
        <h1 className='text-center font-bold text-4xl'>
          Consulta e Cadastro de <span className='text-amber-500'>Usuários</span> vindos da <span className='text-amber-500'>API</span>
        </h1>
        
        <UserList users={users} /> {/* Passe a lista de usuários para UserList */}
        
        <div className='w-full flex justify-center my-10'>
          <button onClick={handleOpen} className='bg-amber-500 p-4 text-white font-bold rounded-lg hover:bg-amber-600'>
            Abrir Cadastro
          </button>
        </div>
        
        {openModal && (
          <ModalForm onClose={handleClose} onUserAdded={fetchUsersApi} />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
