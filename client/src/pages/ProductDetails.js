import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../styles/ProductDetailsStyles.css"
const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    //initial time productdetails
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])
    //get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }


    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="row container product-details">
                <div className="col-md-6">
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height='300' width={'350px'} />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className='text-center'>Product Details</h1>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : $ {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button className='btn btn-secondary ms-1'>Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h6>Similar Products</h6>
                {relatedProducts.length < 1 && (
                    <p className='text-center'>No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" style={{ width: "18rem" }} >
                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ width: "100%", height: "200px" }} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}...</p>
                                <p className="card-text"> $ {p.price}</p>
                                 <button className='btn btn-secondary ms-1'>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails