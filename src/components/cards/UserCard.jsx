import styles from './styles/userCard.module.css';

export default function UserCard({ user }) {
  const fullName = `${user.name.first} ${user.name.last}`;
  return (
    <div className={styles.card}>
      <img src={user.picture.thumbnail} alt={fullName} />
      <div style={{ flex: 1 }}>
        <h3>{fullName}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
