'use client'
import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { dislpayName } from '@/utils/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

export default function AdminPage() {
    const [submissions, setSubmissions] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/admin/pending-ranking`)
            .then(res => res.json())
            .then(data => setSubmissions(data));
    }, []);



    const handleApprove = async (id) => {
       try {
        const response = await fetch(`${API_URL}/api/admin/approve/${id}`, {
            method: 'POST',
        });
        
        if (response.ok) {
            alert("Solicitud Aprobada")
            setSubmissions(prev => prev.filter(sub => sub._id !== id));
        }
        } catch (error) {
            console.error("Error al aprobar:", error);
        }
    };

    const handleReject = async (id) => {
        try {
        const response = await fetch(`${API_URL}/api/admin/reject/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            alert("Solicitud Rechazada")
            setSubmissions(prev => prev.filter(sub => sub._id !== id));
        }
        } catch (error) {
            console.error("Error al Eliminar:", error);
        }
    }

    return (
        <div className={styles.adminWrapper}>
            <h1 className={styles.title}>Admin Panel - Control de Scores</h1>
            <div className={styles.grid}>
                {submissions.length === 0 && <p className={styles.emptyMsg}>No hay solicitudes pendientes.</p>}
                {submissions.map(sub => (
                    <div key={sub._id} className={styles.card}>
                        <div className={styles.details}>
                            <h3 className={styles.user}>{sub.username}</h3>
                            <p className={styles.points}>{sub.score.toLocaleString()} pts</p>
                            <span className={styles.gameTag}>{dislpayName(sub.slug)}</span>
                        </div>
                        
                        <div className={styles.evidenceWrapper} onClick={() => setSelectedImg(sub.screenshot)}>
                            <img src={sub.screenshot} alt="Evidence" className={styles.screenshot} />
                            <div className={styles.overlayText}>Click para ampliar</div>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={() => handleApprove(sub._id)} className={styles.approveBtn}>Aprobar</button>
                            <button onClick={() => handleReject(sub._id)} className={styles.rejectBtn}>Rechazar</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL DE AMPLIACIÓN */}
            {selectedImg && (
                <div className={styles.modalOverlay} onClick={() => setSelectedImg(null)}>
                    <div className={styles.modalContent}>
                        <img src={selectedImg} alt="Evidence Zoom" className={styles.fullImg} />
                        <button className={styles.closeBtn}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}