import React from 'react';
import Card from '../../../components/Card/Card';
import './Payment.css';

const Payment = () => {
    return (
        <div className="container mt-4">
            <h2>Payment Details</h2>
            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <Card className="p-3 bg-light">
                        <h4>Total Revenue</h4>
                        <p className="display-6">$1,250.00</p>
                    </Card>
                </div>
                <div className="col-md-6 mb-3">
                    <Card className="p-3 bg-light">
                        <h4>Pending Payments</h4>
                        <p className="display-6">$150.00</p>
                    </Card>
                </div>
            </div>
            <p className="text-muted">Payment gateway integration pending...</p>
        </div>
    );
};

export default Payment;
