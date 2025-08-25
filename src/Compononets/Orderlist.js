import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearOrder } from '../Redux/OrderSlice';
import './Orderlist.css';

function Orderlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.Order?.items || []);

  const handleClearOrder = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const gotoHome = () => navigate('/');
  const contactUs = () => navigate('/contactus');

  const handleViewProductDetails = (product) => {
    navigate('/productdescription', { state: { product } });
  };

  return (
    <div className="order-container">
      <h1 className="order-title">Order List</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <h4 className="order-number">Order #{index + 1}</h4>
              <div className="order-details">
                <p><span className="detail-label">Name:</span> {order.name}</p>
                <p><span className="detail-label">Email:</span> {order.email}</p>
                <p><span className="detail-label">Phone:</span> ******{order.phone.slice(-6)}</p>
                <p><span className="detail-label">Address:</span> {order.address}, {order.city}</p>
                <p><span className="detail-label">Zip Code:</span> {order.zip}</p>
                <p><span className="detail-label">Card Ending:</span> ****{order.cardNumber.slice(-4)}</p>

                <div className="order-items">
                  <h3 className="items-title">Ordered Items:</h3>
                  <ul className="items-list">
                    {order.items.map((item) => (
                      <li>
                        <img src={item.image} alt={item.title} className="item-image" onClick={()=> handleViewProductDetails(item)}/>
                        <span className="item-name">{item.title}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                        <span className="item-price"> Price: ${item.price}</span>
                        <span className="item-total">Sub Price: ${item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <h2 className="order-total">
                  Total Order Price: ${(order.items.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="button-group">
        <button className="order-button clear-btn" onClick={handleClearOrder}>Clear All Orders</button>
        <button className="order-button home-btn" onClick={gotoHome}>Back to Home</button>
        <button className="order-button contact-btn" onClick={contactUs}>Contact Us</button>
      </div>
    </div>
  );
}

export default Orderlist;
