import React, { useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import {useAlert} from 'react-alert'
import Pagination from 'react-js-pagination'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)


const Home = () => {

    // const [price , setPrice ] = useState([1,1000])
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error, productsCount } = useSelector(state => state.products)

    const {keyword} =  useParams()

    useEffect(() => {
        if(error){
            return alert.error(error)
        }

        dispatch(getProducts(keyword))

            

    }, [dispatch, alert, error , keyword ])


    return (
        <>
            {
                loading ? <Loader /> : (
                    <>
                        <h1 id="products_heading">Latest Products</h1>
                        <MetaData title={'Buy Best Product Online '} />
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {products && products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>
                        </section>
                      
                    </>
                )
            }
        </>
    )
}

export default Home
