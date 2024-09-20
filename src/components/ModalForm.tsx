import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
  onUserAdded: () => void; // Propriedade para chamar a função de atualização
}

export const ModalForm: React.FC<IModalFormProps> = ({ onClose, onUserAdded }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('https://66ed7999380821644cdcfa8c.mockapi.io/api/users', data);
      console.log('Usuário cadastrado com sucesso:', response.data);
      onUserAdded(); // Chama a função para atualizar a lista
      onClose(); // Fecha o modal após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <div className='flex justify-between'>
          <h2>Cadastro de usuário</h2>
          <button onClick={onClose} className='hover:bg-gray-200 px-2 py-1'>
            {/* ícone de fechar */}
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
          Cadastrar
        </Button>
      </form>
    </Box>
  );
};
