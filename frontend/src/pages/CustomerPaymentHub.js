import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function PaymentHub() {
    const [form, setForm] = useState({
        username: "",
        amount: "",
        currency: "",
        provider: "",
        accountNumber: "",
        swiftCode: "",
    });

    const [loading, setLoading] = useState(false);  // For loading state
    const navigate = useNavigate();

   
    function updateForm(value) {
        return setForm((prev) => ({
            ...prev,
            ...value
        }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);  // Start loading

        // Validation
        if (!form.amount || !form.currency || !form.provider || !form.accountNumber || !form.swiftCode) {
            window.alert("Please fill in all fields.");
            setLoading(false);  // Stop loading
            return;
        }

        const token = localStorage.getItem("jwt");

        const newPost = {
            user: form.username,
            amount: form.amount,
            currency: form.currency,
            provider: form.provider,
            accountNumber: form.accountNumber,
            swiftCode: form.swiftCode,
        };

        try {
            const response = await fetch("https://localhost:3000/post/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Post created:", result);

            navigate("/");
        } catch (error) {
            window.alert(error);
        } finally {
            setLoading(false);  // Stop loading
        }
    }

    return (
        <div className="app-container">
            <div className="login-section">
                <div className="login-form">
                    <div className="card">
                        <div className="login-title">
                            <h1>Create a new Transaction</h1>
                        </div>
                        <div className="label-input-group">
                            <label className="label">Username</label>
                            <input
                                type="text"
                                placeholder="Type your username"
                                className="input-field"
                                value={form.username}
                                onChange={(e) => updateForm({ username: e.target.value })}
                            />
                            <label className="label">Amount</label>
                            <input
                                type="number"
                                placeholder="Type your amount"
                                className="input-field"
                                value={form.amount}
                                onChange={(e) => updateForm({ amount: e.target.value })}
                            />

                            <label className="label">Currency</label>
                            <select
                                className="input-field"
                                id="currency"
                                value={form.currency}
                                onChange={(e) => updateForm({ currency: e.target.value })}
                            >
                                <option value="">Select a currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="ZAR">ZAR</option>
                            </select>
                            </div>
                            <div className="label-input-group">
                            <label className="label">Provider</label>
                            <select
                                className="input-field"
                                id="provider"
                                value={form.provider}
                                onChange={(e) => updateForm({ provider: e.target.value })}
                            >
                                <option value="">Select a provider</option>
                                <option value="SWIFT">SWIFT</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Stripe">Stripe</option>
                            </select>

                            <label className="label">Account Number</label>
                            <input
                                type="text"
                                placeholder="Type your account number"
                                className="input-field"
                                value={form.accountNumber}
                                onChange={(e) => updateForm({ accountNumber: e.target.value })}
                            />

                            <label className="label">SWIFT Code</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Type your SWIFT code"
                                id="swiftCode"
                                value={form.swiftCode}
                                onChange={(e) => updateForm({ swiftCode: e.target.value })}
                            />
                        </div>
                        <button className="login-button" onClick={onSubmit}>
                            {loading ? "Submitting..." : "Create Transaction"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentHub;
