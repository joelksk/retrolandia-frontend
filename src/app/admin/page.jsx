'use client'
import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { dislpayName } from '@/utils/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('rankings'); // rankings, reports, suggestions, catalog
    const [submissions, setSubmissions] = useState([]);
    const [reports, setReports] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [filterPlatform, setFilterPlatform] = useState('all');
    const [editingGame, setEditingGame] = useState(null);
    const [tempData, setTempData] = useState({ 
        title: '', 
        image: '', 
        description: '',  
        isMultiplayer: false,
        rankingType: ''
        });
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalGames, setTotalGames] = useState(0)

    useEffect(() => {
        fetch(`${API_URL}/api/admin/pending-ranking`).then(res => res.json()).then(data => setSubmissions(data));
        fetch(`${API_URL}/api/admin/reports`).then(res => res.json()).then(data => setReports(data));
        fetch(`${API_URL}/api/admin/suggestions`).then(res => res.json()).then(data => setSuggestions(data));
    }, []);

    useEffect (() => {
        const fetchData = async () => {
        const newplatform = filterPlatform == 'all' ? `page=${currentPage}` : `platform=${filterPlatform}&page=${currentPage}` 
        fetch(`${API_URL}/api/games?full=true&${newplatform}`).then(res => res.json()).then(data => {
            setGames(data.games)
            setTotalPages(data.totalPages || 1);
            setTotalGames(data.totalGames)
        })
        } ;
        fetchData();
    }, [currentPage, filterPlatform])

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

    const handleEditClick = (game) => {
        setEditingGame(game);
        setTempData({
            title: game.title,
            image: game.image,
            description: game.description,
            isMultiplayer: game.isMultiplayer || false,
            rankingType: game.rankingType
        });
    };

    const saveChanges = async () => {
    try {
        const response = await fetch(`${API_URL}/api/admin/games/${editingGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tempData)
        });

        if (response.ok) {
            setGames(prev => prev.map(g => 
                g._id === editingGame._id ? { ...g, ...tempData } : g
            ));
            alert("Juego actualizado correctamente");
            setEditingGame(null);
                } else {
                    alert("Error al guardar los cambios");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

    const syncRoms = async () => {
        if (!confirm("¿Quieres sincronizar las ROMS de la carpeta con la base de datos?")) return;
    
            setIsLoading(true);
                try {
                    const res = await fetch(`${API_URL}/api/admin/sync-roms`, { method: 'POST' });
                    const data = await res.json();
                    alert(res.data.mensaje);
                    // Refrescamos la lista de juegos
                    const refresh = await fetch(`${API_URL}/api/games`);
                    setGames(await refresh.json());
                } catch (error) {
                    alert("Error en la sincronización");
                } finally {
                    setIsLoading(false);
                }
    }

    const updateRAWG = async () => {
        if (!confirm("¿Deseas actualizar la info de todos los juegos desde RAWG? Esto puede tardar.")) return;

        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/update-rawg`, { method: 'POST' });
            if (res.ok) {
                alert("Información de RAWG actualizada correctamente");
                // Refrescamos la lista para ver los nuevos nombres e imágenes
                const refresh = await fetch(`${API_URL}/api/games`);
                setGames(await refresh.json());
            }
        } catch (error) {
            alert("Error al conectar con RAWG");
        } finally {
            setIsLoading(false);
        }
    }

    const handleFilterPlatform = (platform) => {
        setFilterPlatform(platform);
        setCurrentPage(1)
    }

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
                <button onClick={() => setActiveTab('catalog')} className={activeTab === 'catalog' ? styles.activeTab : ''}>
                    📂 Catálogo ({totalGames})
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

                {/* NUEVA VISTA DE CATÁLOGO */}
                    {activeTab === 'catalog' && (
                        <div className={styles.catalogContainer}>
                            <div className={styles.catalogHeader}>
                                <div className={styles.searchBox}>
                                    <input 
                                        type="text" 
                                        placeholder="Buscar juego..." 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className={styles.adminInput} 
                                    />
                                    <select 
                                        value={filterPlatform} 
                                        onChange={(e) => handleFilterPlatform(e.target.value)}
                                        className={styles.adminSelect}
                                    >
                                        <option value="all">Sistemas</option>
                                        <option value="NES">Nintendo</option>
                                        <option value="SNES">Super Nintendo</option>
                                        <option value="Sega Genesis">Sega Genesis</option>
                                    </select>
                                </div>
                                
                                <div className={styles.globalActions}>
                                    <button onClick={syncRoms} className={styles.syncBtn} disabled={isLoading}>
                                        {isLoading ? '⏳ Procesando...' : 'Cargar Roms'}
                                    </button>
                                    <button onClick={updateRAWG} className={styles.rawgBtn} disabled={isLoading}>
                                        {isLoading ? '⏳ Buscando...' : 'Actualizar RAWG'}
                                    </button>
                                </div>
                            </div>

                            {/**LISTA DE LOS JUEGOS */}
                            <div className={styles.catalogList}>
                                {games
                                    .filter(game => 
                                        game.title.toLowerCase().includes(search.toLowerCase()) && 
                                        (filterPlatform === 'all' || game.platform === filterPlatform)
                                    )
                                    .map(game => (
                                        <div key={game._id} className={styles.gameRow}>
                                            <img src={game.image} alt={game.title} className={styles.miniImg} />
                                            
                                            <div className={styles.gameInfo}>
                                                <span className={styles.gameName}>{game.title}</span>
                                                <span className={styles.gameSystem}>{game.platform}</span>
                                            </div>

                                            <div className={styles.gameTags}>
                                                {game.isMultiplayer && <span className={styles.multiTag}>Online</span>}
                                            </div>

                                            <button 
                                                className={styles.editBtn}
                                                onClick={() => handleEditClick(game)}
                                            >
                                                ✏️ Editar
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>

                            {/**PAGINACION */}
                        <div className={styles.pagination}>
                            <button 
                                disabled={currentPage === 1} 
                                onClick={() => {
                                setCurrentPage(prev => prev - 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={styles.pageBtn}
                            >
                                Anterior
                            </button>
                    
                            <span className={styles.pageInfo}>
                                Página {currentPage} de {totalPages}
                            </span>
                    
                            <button 
                                disabled={currentPage === totalPages} 
                                onClick={() => {
                                setCurrentPage(prev => prev + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                                className={styles.pageBtn}
                            >
                                Siguiente
                            </button>
                        </div>

                    </div>
                    )}

            </div>


            {/**MODAL DE EDICION DE JUEGO */}
            {editingGame && (
                <div className={styles.modalOverlay}>
                    <div className={styles.editModal}>
                        <h2 className={styles.modalTitle}>Editar Catálogo</h2>
                        <p className={styles.slugNote}>Slug: {editingGame.slug}</p>

                        <div className={styles.formField}>
                            <label>Nombre Visual</label>
                            <input 
                                type="text" 
                                value={tempData.title} 
                                onChange={(e) => setTempData({...tempData, title: e.target.value})} 
                            />
                        </div>

                        <div className={styles.formField}>
                            <label>Descripcion</label>
                            <textarea value={tempData.description} className={styles.textarea}
                                      onChange={(e) => setTempData({...tempData, description: e.target.value})}></textarea>
                        </div>

                        <div className={styles.formField}>
                            <label>URL de Imagen</label>
                            <input 
                                type="text" 
                                value={tempData.image} 
                                onChange={(e) => setTempData({...tempData, image: e.target.value})} 
                            />
                            <div className={styles.previewContainer}>
                                <img src={tempData.image} alt="Preview" className={styles.editPreview} />
                            </div>
                        </div>

                        <div className={styles.checkField}>
                            <input 
                                type="checkbox" 
                                id="multi" 
                                checked={tempData.isMultiplayer} 
                                onChange={(e) => setTempData({...tempData, isMultiplayer: e.target.checked})} 
                            />
                            <label htmlFor="multi">Online</label>
                            <select 
                                        value={tempData.rankingType} 
                                        onChange={(e) => setTempData({...tempData, rankingType: e.target.value})}
                                        className={styles.select}
                                    >
                                        <option value="none">None</option>
                                        <option value="time">Tiempo</option>
                                        <option value="score">Score</option>
                            </select>

                        </div>

                        <div className={styles.modalButtons}>
                            <button onClick={() => setEditingGame(null)} className={styles.cancelBtn}>Cancelar</button>
                            <button onClick={saveChanges} className={styles.saveBtn}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            )}

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