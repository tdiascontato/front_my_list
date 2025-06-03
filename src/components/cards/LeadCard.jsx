import styles from './styles/leadCard.module.css';

export default function LeadCard({ lead, onDelete, onEdit }) {
  return (
    <div className={styles.card}>
      {lead.picture && (
        <img src={lead.picture} alt={lead.name} />
      )}
      <div style={{ flex: 1 }}>
        <h3>{lead.name}</h3>
        <p>{lead.email}</p>
        <p>{lead.phone}</p>
      </div>
      <button onClick={() => onEdit(lead)}>
        <span role="img" aria-label="Editar">✏️</span>
      </button>
      <button onClick={() => onDelete(lead.id)}>
        <span role="img" aria-label="Excluir">🗑️</span>
      </button>
    </div>
  );
}
