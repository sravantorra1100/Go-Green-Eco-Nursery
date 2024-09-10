import React, { useState, useEffect } from 'react';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory()
    return (
        <Layout title={`All Categories`}>
            <div className="container">
                <h1 className='text-center'>All Categories</h1>
                <div className="row container">
                    {categories.map(c => (
                        <div className="col-md-6 mt-5 mb-3 gx-3 gy-3 " key={c._id}>
                            <img src="https://www.housedigest.com/img/gallery/15-plants-perfect-for-a-west-facing-window/l-intro-1660122569.jpg"
                             alt="errLoading" height={"200px"} width={"550px"} />
                           <Link to={`/category/${c.slug}`} className='btn btn-primary diff-categories '><h4>{c.name}</h4></Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories