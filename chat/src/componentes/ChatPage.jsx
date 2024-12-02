import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { fetchMessages, sendMessage, updateMessageStatus } from '../api';
import { setMessages } from '../redux/mensagensSlice';
import { logout } from '../redux/usuarioSlice'; 

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { messages, status, error } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user.currentUser);

  
  useEffect(() => {
    if (!currentUser) {
      alert('Você precisa estar logado para acessar o chat.');
      navigate('/login'); 
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetchMessages();
        dispatch(setMessages(response.data));
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
      }
    };

    loadMessages();
  }, [dispatch]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      alert('A mensagem não pode estar vazia.');
      return;
    }

    if (!currentUser) {
      alert('Você precisa estar logado para enviar mensagens.');
      return;
    }

    try {
      const message = { content: newMessage, nickname: currentUser.nickname };
      const response = await sendMessage(message);
      console.log('Mensagem enviada:', response.data);
      dispatch(fetchMessages()); 
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem!');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    alert('Logout realizado com sucesso!');
    navigate('/login'); 
  };

  if (status === 'loading') {
    return <p>Carregando mensagens...</p>;
  }

  if (status === 'failed') {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <h1>Bate-Papo</h1>
      {currentUser && (
        <div>
          <p>Bem-vindo, {currentUser.nickname}!</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
      <div>
        <h2>Mensagens</h2>
        <ul>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <li key={msg.id}>
                <strong>{msg.nickname}:</strong> {msg.content}
                <p>Status: {msg.lida ? 'Lida' : 'Não lida'}</p>
              </li>
            ))
          ) : (
            <p>Nenhuma mensagem encontrada.</p>
          )}
        </ul>
      </div>
      <div>
        <h2>Enviar Mensagem</h2>
        <input
          type="text"
          placeholder="Digite sua mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatPage;
