import React from 'react';
import '../App.css';  

function PaymentHub() {
    return (
        <div className="app-container">
            <div className="login-section">
                <div className="card">
                    <div className="login-title">
                        <h1>Transaction Notice Board</h1>
                    </div>
                    <table className="payment-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Provider</th>
                                <th>Currency</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table rows go here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PaymentHub;
