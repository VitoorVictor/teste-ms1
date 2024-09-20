import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserList} from '../components/UserList.tsx'
import { ModalForm } from '../components/ModalForm.tsx';

const queryClient = new QueryClient();

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () =>{
    setOpenModal(true);
  }
  const handleClose = () =>{
    setOpenModal(false);
  }

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App w-full">
      <h1 className='text-center font-bold text-4xl'>Consulta e Cadastro de <span className='text-amber-500'>Usuários</span> vindos da <span className='text-amber-500'>API</span></h1>
      
      <UserList />
      
      <div className='w-full  flex justify-center my-10'>

        <button onClick={handleOpen} className='bg-amber-500 p-4 text-white font-bold rounded-lg hover:bg-amber-600'>Abrir Cadastro</button>
      </div>
      {openModal && (
        <ModalForm onClose={handleClose} />
      )}
    </div>
  </QueryClientProvider>
  )
}

export default App
