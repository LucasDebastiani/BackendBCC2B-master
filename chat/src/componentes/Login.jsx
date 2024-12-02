import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/usuarioSlice'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nickname || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await dispatch(loginUser({ nickname, password }));
      alert('Login realizado com sucesso!');
      navigate('/chat'); 
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default LoginPage;
