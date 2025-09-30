
import { useEffect } from "react"
import { useState } from "react"

export default function Transactions() {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState('')

    useEffect(() => {
        const fetchTx = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/transactions')
                console.log({res})
                const data = await res.json();
                console.log({data})
                setTransactions(data.data || []);
            
            
        }
        catch (e) {
            console.log(e)
        }
        }
        
        fetchTx()

    }, [])

    const validate = (a, d) => {

        const num = Number(a);
        if (!Number.isFinite(num) || (Math.abs(num) === 0)) return "Must be a number"
        if (!d || !d.trim()) return "Description is requred";

        return ""
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const msg = validate(amount, description);
        if (msg) {
            setError(msg);
            return;


        }

        setLoading(true);

        try {
            const res = await fetch('http://localhost:4000/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount:Number(amount), description }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Failed to save');
            // Optimistic UI: prepend new tx
            setTransactions((prev) => [json.data, ...prev]);
            setAmount('');
            setDescription('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }




    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Submit a Transaction</h1>
                <form onSubmit={onSubmit} style={styles.form}>
                    <label style={styles.label}>
                        Amount
                        <input
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g., 19.99"
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Description
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., Dinner"
                            style={styles.input}
                        />
                    </label>
                    {error && <div style={styles.error}>{error}</div>}
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Saving…' : 'Add Transaction'}
                    </button>
                </form>
            </div>


            <div style={styles.card}>
                <h2 style={styles.subtitle}>Recent Transactions</h2>
                {transactions?.length === 0 ? (
                    <p>No transactions yet.</p>
                ) : (
                    <ul style={styles.list}>
                        {transactions?.map((t) => (
                            <li key={t.id} style={styles.listItem}>
                                <div style={styles.rowBetween}>
                                    <strong>${t.amount.toFixed(2)}</strong>
                                    <span style={styles.time}>
                                        {new Date(t.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <div>{t.description}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'grid',
        gap: 16,
        padding: 16,
        background: '#f7f7fb',
        gridTemplateColumns: 'minmax(0, 1fr)',
    },
    card: {
        background: '#fff',
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
        color: 'black'
    },
    title: { margin: '4px 0 12px' },
    subtitle: { margin: '4px 0 12px' },
    form: { display: 'grid', gap: 12 },
    label: { display: 'grid', gap: 6, fontWeight: 600 },
    input: {
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid #dcdce6',
        fontSize: 16,
    },
    button: {
        padding: '10px 14px',
        borderRadius: 10,
        background: '#222',
        color: '#fff',
        border: 'none',
        fontSize: 16,
        cursor: 'pointer',
    },
    error: {
        background: '#ffe8e8',
        color: '#a40000',
        padding: '8px 10px',
        borderRadius: 8,
        fontSize: 14,
    },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 },
    listItem: { padding: 12, border: '1px solid #eee', borderRadius: 8 },
    rowBetween: { display: 'flex', justifyContent: 'space-between' },
    time: { color: '#666', fontSize: 12 },
};