'use client';
import { useState } from 'react';
import styles from './login.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("Rol recibido:", data.role);
      console.log("¿Es admin?:", data.role === 'admin');

      if (res.ok) {
        // Guardamos el token en una cookie segura
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict`;

        setTimeout(() => {
          const destination = data.role === 'admin' ? '/admin' : '/';
          window.location.replace(destination);
      }, 500);
      } else {
        alert(data.msg || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        <h2 className={styles.title}>LOG IN</h2>
        <div className={styles.inputGroup}>
          <label>USUARIO</label>
          <input 
            type="text" 
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>CONTRASEÑA</label>
          <input 
            type="password" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
        </div>
        <button type="submit" className={styles.btn}>ENTRAR</button>
      </form>
    </div>
  );
}

export default LoginPage