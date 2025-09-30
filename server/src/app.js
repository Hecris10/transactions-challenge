import express from 'express';
import cors from 'cors';
import { isValidAmount } from './lib/utils.js'

const app = express();
app.use(cors());
app.use(express.json());

const transactions = [] // {id, amount, description, createdAt}

let idSeq = 1;

//Routes

app.get('/api/health', (_req, res) => {
    res.json({ok: true, message: 'Server is healthy'})
})

app.get('/api/transactions', (_req, res) => {
    res.json({data: transactions});
});


app.post('/api/transactions', (req, res) => {
    
    const { amount, description } = req.body || {}
    
    if (!isValidAmount(amount)) {
        
        return res.status(400).json({
            error: 'Invalid amount'
        })
    }

    if (typeof description !== 'string' || description.trim().lenght === 0) {
        return res.status(400).json({ error: 'Description is required' });
    }

    const newTransaction = {
        id: idSeq++,
        amount: amount,
        description: description.trim(),
        createdAt: Date.now()
    }

    transactions.push(newTransaction);
    res.status(201).json({data: newTransaction})
})


export {app, transactions}