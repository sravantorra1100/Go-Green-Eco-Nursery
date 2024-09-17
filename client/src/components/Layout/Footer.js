import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='footer d-flex text-dark'>
                <div className='col-md-3 p-2'>
                    <h3>POLICY INFO</h3>
                    <hr />
                    <p><Link className='lnk' to="/policy">Privacy Policy</Link></p>
                    <p><Link className='lnk' to="/policy">Terms & Conditions</Link></p>
                    <p><Link className='lnk' to="/policy">Shipping Policy</Link></p>
                    <p><Link className='lnk' to="/policy">Cancel & Refund Policy</Link></p>
                </div>
                <div className='col-md-2 p-2'>
                    <h3>MY ACCOUNT</h3>
                    <hr />
                    <p><Link className='lnk' to="/dashboard/admin/orders">Order History</Link></p>
                    <p><Link className='lnk' to="/cart">Wish List</Link></p>
                   <p> <Link className='lnk' to="/about">News Letter</Link></p>
                   <p> <Link className='lnk' to="/login">Login</Link></p>
                </div>
                <div className='col-md-2 p-2'>
                    <h3>NEED HELP ?</h3>
                    <hr />
                    <p><Link className='lnk' to="/contact">Contact Us</Link></p>
                    <p><Link className='lnk' to="/about">Gift Vouchers</Link></p>
                   <p> <Link className='lnk' to="/about">Help</Link></p>
                    <p><Link className='lnk' to="/about">FAQs</Link></p>
                </div>
                <div className='col-md-2 p-2'>
                    <h3>COMPANY INFO</h3>
                    <hr />
                    <p><Link className='lnk' to="/about">About Us</Link></p>
                    <p><Link className='lnk' to="/about">Contact Us</Link></p>
                    <p><Link className='lnk' to="/about">Green Valley</Link></p>
                    <p><Link className='lnk' to="/about">Returns</Link></p>
                </div>
                <div className='col-md-3 p-2'>
                    <h3>OFFICE ADDRESS</h3>
                    <hr />
                    <p>Sector 2, Valley No. 6/B Sakura Road, National Highway Road, Near Research Center,</p>
                    <p> Thane, 400-004, India.</p>
                    <p> Phone:+91-9998887777</p>
                </div>
            </div>
            <div className='footer'>
                <hr />
                <h4 className='text-center'>All Rights Reserved by &copy; sravan 2024</h4>
                <p className="text-center mt-3">
                    <Link to="/about">About</Link>
                    |
                    <Link to="/contact">Contact</Link>
                    |
                    <Link to="/policy">Privacy Policy</Link>
                </p>
            </div>
        </>
    )
}

export default Footer