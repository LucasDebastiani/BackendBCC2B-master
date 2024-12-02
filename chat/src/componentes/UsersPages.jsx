import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import { fetchUsers } from '../redux/usuarioSlice';

const UsersPage = () => {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users || []);

  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const handleAddUser = async () => {
    if (!nickname.trim() || !avatar.trim() || !password.trim()) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('https://backend-bcc-2-b.vercel.app/usuario', {
        nickname,
        avatar,
        password,
      });
      console.log('Usuário registrado:', response.data);
      dispatch(fetchUsers()); 
      setNickname('');
      setAvatar('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      alert('Erro ao cadastrar usuário!');
    }
  };

  return (
    <div>
      <h1>Cadastro de Usuários</h1>
      <form>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
        />
        <input
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="URL Avatar"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
        />
        <button type="button" onClick={handleAddUser}>
          Adicionar
        </button>
      </form>
      <h2>Usuários Cadastrados</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <strong>Nickname:</strong> {user.nickname}
            </li>
          ))
        ) : (
          <p>Nenhum usuário cadastrado.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersPage;
