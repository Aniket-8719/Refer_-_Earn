import { useState } from 'react';
import axios from 'axios';

const ReferralModal = ({ onClose }) => {
    const [form, setForm] = useState({
        referrerName: '',
        referrerEmail: '',
        refereeName: '',
        refereeEmail: '',
        courseName: '',  
        notes: '' 
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post(`${API_URL}/api/v5/referrals`, form);
    
            if (response.status === 201) {
                alert('✅ Referral submitted successfully!');
                onClose(); 
            } else {
                alert('⚠️ Something went wrong! Please try again.');
            }
        } catch (error) {
            console.error('❌ Error submitting referral:', error);
            
            if (error.response && error.response.status === 400) {
                alert('⚠️ This email has already been used for referral!');
            } else {
                alert('❌ Failed to submit referral. Please check your input or try again later.');
            }
        }
    
        setLoading(false);
    };
    
 
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                <h2 className="text-lg font-semibold mb-4">Refer a Friend</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="referrerName" 
                        placeholder="Your Name" 
                        className="w-full p-2 border mb-2" 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="referrerEmail" 
                        placeholder="Your Email" 
                        className="w-full p-2 border mb-2" 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="refereeName" 
                        placeholder="Friend's Name" 
                        className="w-full p-2 border mb-2" 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="refereeEmail" 
                        placeholder="Friend's Email" 
                        className="w-full p-2 border mb-2" 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="courseName" 
                        placeholder="Course Name" 
                        className="w-full p-2 border mb-2" 
                        onChange={handleChange} 
                        required 
                    />
                    <textarea 
                        name="notes" 
                        placeholder="Additional Notes (optional)" 
                        className="w-full p-2 border mb-2" 
                        onChange={handleChange}
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded" 
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                <button 
                    className="w-full mt-2 p-2 bg-gray-400 text-white rounded" 
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ReferralModal;
