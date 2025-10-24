import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context-providers/RecipeContext';

function LoginPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const { login, register } = useContext(RecipeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const result = isRegister 
            ? await register(name, password)
            : await login(name, password);
        
        if (result.success) {
            navigate('/');
        } else {
            setMessage(result.message);
        }
    };

    return (
        <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        style={{ display: 'block', width: '100%', padding: '8px' }}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ display: 'block', width: '100%', padding: '8px' }}
                        required
                    />
                </div>
                
                <button type="submit" style={{ padding: '10px 20px', width: '100%', marginBottom: '10px' }}>
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>

            <button 
                type="button" 
                onClick={() => setIsRegister(!isRegister)}
                style={{ padding: '10px 20px', width: '100%' }}
            >
                {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>

            {message && <p style={{ color: 'red', marginTop: '15px' }}>{message}</p>}

            <div style={{ marginTop: '30px', padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}>
                <strong>Test Accounts:</strong>
                <p>josh / josh</p>
                <p>dor / dor</p>
            </div>
        </div>
    );
}

export default LoginPage;