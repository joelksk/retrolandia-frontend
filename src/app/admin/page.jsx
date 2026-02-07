'use client'
import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { dislpayName } from '@/utils/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('rankings'); // rankings, reports, suggestions
    const [submissions, setSubmissions] = useState([]);
    const [reports, setReports] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/admin/pending-ranking`).then(res => res.json()).then(data => setSubmissions(data));
        fetch(`${API_URL}/api/admin/reports`).then(res => res.json()).then(data => setReports(data));
        fetch(`${API_URL}/api/admin/suggestions`).then(res => res.json()).then(data => setSuggestions(data));
    }, []);

    const handleApprove = async (id) => {
        const response = await fetch(`${API_URL}/api/admin/approve/${id}`, { method: 'POST' });
        if (response.ok) {
            alert("Solicitud Aprobada");
            setSubmissions(prev => prev.filter(sub => sub._id !== id));
        }
    };

    const handleReject = async (id) => {
        const response = await fetch(`${API_URL}/api/admin/reject/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert("Solicitud Rechazada");
            setSubmissions(prev => prev.filter(sub => sub._id !== id));
        }
    };

    const handleDeleteItem = async (type, id) => {
        const response = await fetch(`${API_URL}/api/admin/${type}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            if (type === 'reports') setReports(prev => prev.filter(i => i._id !== id));
            if (type === 'suggestions') setSuggestions(prev => prev.filter(i => i._id !== id));
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <h1 className={styles.title}>Centro de Control - v1.1</h1>

            {/* SELECTOR DE PESTAÑAS */}
            <div className={styles.tabNav}>
                <button onClick={() => setActiveTab('rankings')} className={activeTab === 'rankings' ? styles.activeTab : ''}>
                    🏆 Rankings ({submissions.length})
                </button>
                <button onClick={() => setActiveTab('reports')} className={activeTab === 'reports' ? styles.activeTab : ''}>
                    ⚠️ Bugs ({reports.length})
                </button>
                <button onClick={() => setActiveTab('suggestions')} className={activeTab === 'suggestions' ? styles.activeTab : ''}>
                    🎮 Pedidos ({suggestions.length})
                </button>
            </div>

            <div className={styles.contentArea}>
                {/* VISTA DE RANKINGS */}
                {activeTab === 'rankings' && (
                    <div className={styles.grid}>
                        {submissions.length === 0 && <p className={styles.emptyMsg}>No hay puntuaciones pendientes.</p>}
                        {submissions.map(sub => (
                            <div key={sub._id} className={styles.card}>
                                <div className={styles.details}>
                                    <h3 className={styles.user}>{sub.username}</h3>
                                    <p className={styles.points}>{sub.score.toLocaleString()} pts</p>
                                    <span className={styles.gameTag}>{dislpayName(sub.slug)}</span>
                                </div>
                                <div className={styles.evidenceWrapper} onClick={() => setSelectedImg(sub.screenshot)}>
                                    <img src={sub.screenshot} alt="Evidence" className={styles.screenshot} />
                                    <div className={styles.overlayText}>Ampliar</div>
                                </div>
                                <div className={styles.actions}>
                                    <button onClick={() => handleApprove(sub._id)} className={styles.approveBtn}>Aprobar</button>
                                    <button onClick={() => handleReject(sub._id)} className={styles.rejectBtn}>Borrar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* VISTA DE REPORTES (BUGS) */}
                {activeTab === 'reports' && (
                    <div className={styles.list}>
                        {reports.map(rep => (
                            <div key={rep._id} className={styles.reportItem}>
                                <div>
                                    <span className={styles.gameName}>{rep.gameTitle}</span>
                                    <p>{rep.description}</p>
                                    <small className={styles.date}>{new Date(rep.createdAt).toLocaleDateString()}</small>
                                </div>
                                <button onClick={() => handleDeleteItem('reports', rep._id)} className={styles.deleteBtn}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* VISTA DE SUGERENCIAS */}
                {activeTab === 'suggestions' && (
                    <div className={styles.list}>
                        {suggestions.map(sug => (
                            <div key={sug._id} className={styles.suggestionItem}>
                                <div>
                                    {/* <strong>{sug.gameTitle}</strong> - <span className={styles.systemTag}>{sug.system}</span> */}
                                    <span className={styles.systemTag}>{sug.description}</span>
                                    {sug.userEmail && <p className={styles.email}>{sug.userEmail}</p>}
                                </div>
                                <button onClick={() => handleDeleteItem('suggestions', sug._id)} className={styles.deleteBtn}>Visto</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL DE AMPLIACION */}
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