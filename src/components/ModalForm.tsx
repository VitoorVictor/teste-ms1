import { Box, Typography, Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUser } from '../interfaces/UserInterface';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IFormInput {
  name: string;
  email: string;
  city: string;
}

interface IModalFormProps {
  onClose: () => void;
  onUserAdded: () => void; 
  user: IUser | null;
}

//Modal para Criar Novo Usuário
export const ModalForm: React.FC<IModalFormProps> = ({ onClose, onUserAdded, user }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('city', user.city);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
        if (user) {
          // Edição do usuário existente
          const response = await axios.put(`https://66ed7999380821644cdcfa8c.mockapi.io/api/users/${user.id}`, data);
          console.log('Usuário editado com sucesso:', response.data);
        } else {
          // Cadastro de novo usuário
          const response = await axios.post('https://66ed7999380821644cdcfa8c.mockapi.io/api/users', data);
          console.log('Usuário cadastrado com sucesso:', response.data);
        }
        onUserAdded(); 
        onClose(); 
      } catch (error) {
        if (user) {
        console.error('Erro ao editar usuário:', error);
      } else { console.error('Erro ao cadastrar usuário:', error); }
    };
 }

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <div className='flex justify-between'>
          <h2>Cadastro de usuário</h2>
          <button onClick={onClose} className='hover:bg-gray-200 px-2 py-1'>
          <svg fill="#000000" height="14px" width="14px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 460.775 460.775">
            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
          </svg>
          </button>
        </div>
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Preencha os dados para se cadastrar.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '16px' }}>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          {...register('name', { required: 'Nome é obrigatório' })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { required: 'Email é obrigatório' })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          label="Cidade"
          fullWidth
          margin="normal"
          {...register('city', { required: 'Cidade é obrigatória' })}
          error={!!errors.city}
          helperText={errors.city ? errors.city.message : ''}
        />
        <Button type="submit" variant="contained" color="warning" sx={{ mt: 2 }}>
            {user ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
      </form>
    </Box>
  );
};
