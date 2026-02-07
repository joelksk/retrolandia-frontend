'use client';
import { useState } from 'react';
import styles from './reportWidget.module.css';

export default function ReportWidget({ gameSlug }) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('bug');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = type === 'bug' ? '/api/reports' : '/api/suggestions';
        
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gameTitle: gameSlug || '',
                description: message,
                userEmail: email,
                platform: 'web-emulator' 
            })
        });

        if (res.ok) {
            setSent(true);
            setTimeout(() => {
                setSent(false);
                setIsOpen(false);
                setMessage('');
                setEmail('');
            }, 2000);
        }
    };

    return (
        <div className={styles.widgetContainer}>
            <button className={styles.mainBtn} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '×' : '?'}
            </button>

            {isOpen && (
                <div className={styles.window}>
                    <div className={styles.windowHeader}>
                        <span>Retro Support</span>
                    </div>
                    
                    {sent ? (
                        <div className={styles.success}>¡Enviado con éxito al Admin!</div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.tabs}>
                                <button 
                                    type="button" 
                                    className={type === 'bug' ? styles.activeTab : ''} 
                                    onClick={() => setType('bug')}
                                >Reportar Bug</button>
                                <button 
                                    type="button" 
                                    className={type === 'suggestion' ? styles.activeTab : ''} 
                                    onClick={() => setType('suggestion')}
                                >Pedir Juego</button>
                            </div>

                            <textarea 
                                className={styles.textarea}
                                placeholder={type === 'bug' ? "¿Qué falló?" : "¿Qué juego falta? Nombre, consola, etc."}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                            
                            <input
                                className={styles.input}
                                type="email" 
                                placeholder="Email (opcional para feedback)" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button type="submit" className={styles.sendBtn}>ENVIAR</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}