import React from 'react';
import './CustomerPaymentHub.css'; // Custom styles for the payment hub page

function PaymentHub() {
    return (
        <div className="payment-app-container">
            <div className="payment-main-section">
                <div className="payment-card">
                    <h3 className="payment-header">Transaction Notice Board</h3>
                    <button className="payment-button">Logout</button>
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
