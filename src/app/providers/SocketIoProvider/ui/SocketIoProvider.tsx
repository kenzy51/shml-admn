// import { Button, Input, List } from 'antd';
// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// import 'antd/dist/antd.css';
// import cls from './SocketIo.module.scss';
// import { useTranslation } from 'react-i18next';

// const socket = io(process.env.REACT_APP_SOCKET!, {
//   extraHeaders: {
//     access_token: localStorage.getItem('access_token') || '',
//   },
// });

// // const socket = io(process.env.REACT_APP_SOCKET!, {
// //   extraHeaders: {
// //     authorization: localStorage.getItem('authorization') || '',
// //   },
// // });



// type Message = {
//   text: string;
//   user_id: string;
//   is_admin: boolean;
// };

// export function SocketIoProvider() {
//   const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
//   const [text, setText] = useState<string>('');
//   const [userId, setUserId] = useState<string>(() => {
//     return localStorage.getItem('user_id') || '';
//   });
//   const [messages, setMessages] = useState<Message[]>(() => {
//     const savedMessages = localStorage.getItem('messages');
//     if (savedMessages) {
//       return JSON.parse(savedMessages);
//     } else {
//       return [];
//     }
//   });

//   const { t } = useTranslation('chat');

//   const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setText(event.target.value);
//   };

//   const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUserId(event.target.value);
//   };

//   // Сабмит,отвечающий за отправку сообщений на подписанный message
//   const ADMIN_USER_ID = 'admin123'
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const message: Message = {
//       text,
//       user_id: userId,
//       is_admin: userId === ADMIN_USER_ID,
//     };
//     socket.emit('message', message);
//     setText('');
//     setUserId('');
//   };

//   useEffect(() => {
//     socket.on('connect', () => {
//       setIsConnected(true);
//     });

//     socket.on('disconnect', () => {
//       setIsConnected(false);
//     });

//     socket.on('message', (message: Message) => {
//       setMessages((messages) => [...messages, message]);
//       if (Notification.permission === 'granted') {
//         new Notification('New message received', {
//           body: message.text,
//           icon: 'path/to/notification-icon.png',
//         });
//       }
//       const messageBox = document.getElementById('message-box');
//       if (messageBox) {
//         messageBox.classList.add('new-message');
//         setTimeout(() => {
//           messageBox.classList.remove('new-message');
//         }, 300);
//       }
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('message');
//     };
//   }, [socket]);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   // Scroll вниз при появлении сообщений
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(()=>{
//     if(Notification.permission !== 'granted'){
//       Notification.requestPermission()
//     }
//   }, []);
  
//   const typeYourMessage = t('typeYourMesage');

//   return (
//     <div className={cls['chat-container']}>
//       <div className={cls.connected}><h3>CHAT</h3></div>
//       <div
//         className={cls['message-box-container']}
//         style={{ overflowY: 'scroll', height: '400px' }}
//       >
//         <List
//           dataSource={messages}
//           renderItem={(item: Message) => (
//             <List.Item
//               className={`${cls['message-item']} ${item.is_admin ? cls.admin : ''}`}
//               style={{
//                 marginLeft: item.user_id ? '300px' : '0',
//                 backgroundColor: item.user_id ? '#DBE5E2' : '#E6F3D5'
//               }}
//             >
//               <div
//                 className={`${cls['message-box']}`}
//                 style={{width:'100%'}}
//               >
//                 <p className={cls['message-text']}>{item.text}</p>
//                 <h3 className={cls['message-user-id']} > {item.user_id ? 'Я' : 'Пользователь'}</h3>
//               </div>
//             </List.Item>
//           )}
//         />

//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSubmit} className={cls['form-container']}>
//         <Input
//           type='text'
//           value={text}
//           placeholder={typeYourMessage}
//           onChange={handleMessageChange}
//           className={cls['message-input']}
//         />
//         <Input
//           type='text'
//           placeholder='Type user ID...'
//           value={userId}
//           onChange={handleUserIdChange}
//           className={cls['user-id-input']}
//         />
//         <Button type='primary' htmlType='submit' disabled={!text || !userId}>
//           Send
//         </Button>
//       </form>
//     </div>
//   )
// }








import { Button, Input, List } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// import 'antd/dist/antd.css';
import cls from './SocketIo.module.scss';
import { useTranslation } from 'react-i18next';

const socket = io(process.env.REACT_APP_SOCKET!, {
  extraHeaders: {
    access_token: localStorage.getItem('access_token') || '',
  },
});


type Message = {
  text: string;
  user_id: string;
  is_admin: boolean;
  date:Date;
};

export function SocketIoProvider() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [text, setText] = useState<string>('');
  const [userId, setUserId] = useState<string>(() => {
    return localStorage.getItem('user_id') || '';
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      return JSON.parse(savedMessages);
    } else {
      return [];
    }
  });

  const { t } = useTranslation('chat');

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  // Сабмит,отвечающий за отправку сообщений на подписанный message
  const ADMIN_USER_ID = 'admin123'
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message: Message = {
      text,
      user_id: userId,
      is_admin: userId === ADMIN_USER_ID,
      date:new Date()
    };
    socket.emit('message', message);
    setText('');
    // setUserId('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('message', (message: Message) => {
      const messageWithData = {
        ...message,
        date:new Date()
      }
      setMessages((messages) => [...messages, messageWithData]);
      if (Notification.permission === 'granted') {
        new Notification('New message received', {
          body: message.text,
          icon: 'path/to/notification-icon.png',
        });
      }
      const messageBox = document.getElementById('message-box');
      if (messageBox) {
        messageBox.classList.add('new-message');
        setTimeout(() => {
          messageBox.classList.remove('new-message');
        }, 300);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, [socket]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Scroll вниз при появлении сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(()=>{
    if(Notification.permission !== 'granted'){
      Notification.requestPermission()
    }
  }, []);
  
  const typeYourMessage = t('typeYourMesage');

  return (
    <div className={cls['chat-container']}>
      <div className={cls.connected}><h3>CHAT</h3></div>
      <div
        className={cls['message-box-container']}
        style={{ overflowY: 'scroll', height: '400px' }}
      >
        <List
          dataSource={messages}
          renderItem={(item: Message) => (
            <List.Item
              className={`${cls['message-item']} ${item.is_admin ? cls.admin : ''}`}
              style={{
                marginLeft: item.user_id ? '300px' : '0',
                backgroundColor: item.user_id ? '#DBE5E2' : '#E6F3D5'
              }}
            >
              <div
                className={`${cls['message-box']}`}
                style={{width:'100%'}}
              >
                <p className={cls['message-text']}>{item.text}</p>
                <h3 className={cls['message-user-id']} > {item.user_id ? 'Я' : 'Пользователь'}</h3>
                <span className={cls['message-date']}>{item.date.toLocaleString()}</span>
              </div>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={cls['form-container']}>
        <Input
          type='text'
          value={text}
          placeholder={typeYourMessage}
          onChange={handleMessageChange}
          className={cls['message-input']}
        />
        <Input
          type='text'
          placeholder='Type user ID...'
          value={userId}
          onChange={handleUserIdChange}
          className={cls['user-id-input']}
        />
        <Button type='primary' htmlType='submit' disabled={!text || !userId}>
          Send
        </Button>
      </form>
    </div>
  )
}
