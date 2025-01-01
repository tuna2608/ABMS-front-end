import React, { useEffect, useState } from 'react'
import "./featuredItems.scss"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatCurrency } from "../../../utilities/formatCurrency"
import { userRequest } from '../../../utilities/requestMethod';
function FeaturedItem() {

    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(1);


    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income");
                setIncome(res.data)
                setPerc((res.data[1].total * 100) / res.data[0].total - 100)
            } catch (error) {
            }
        }
        getIncome()
    }, [])
    return (
        <div className='featured-container'>
            <div className='featured-item'>
                <p className='featured-title'>Doanh Thu</p>
                <div className='featured-money-container'>
                    <span className='featured-money'>{formatCurrency(income[1]?.total)}</span>
                    <span className='featured-money-rate'>
                        %{Math.floor(perc)}
                        {perc < 0 ? (
                            <ArrowDownwardIcon className='arrow-icons' />
                        ) : (
                            <ArrowUpwardIcon className='arrow-icons' />
                        )}
                    </span>
                </div>
                <p className='featured-sub'>So với tháng trước</p>
            </div>
            <div className='featured-item'>
                <p className='featured-title'>Bán Hàng</p>
                <div className='featured-money-container'>
                    <span className='featured-money'>{formatCurrency(2220000)}</span>
                    <span className='featured-money-rate'>-12.4 <ArrowDownwardIcon className='arrow-icons' /></span>
                </div>
                <p className='featured-sub'>So với tháng trước</p>
            </div>
            <div className='featured-item'>
                <p className='featured-title'>Chi Phí</p>
                <div className='featured-money-container'>
                    <span className='featured-money'>{formatCurrency(220000)}</span>
                    <span className='featured-money-rate'>+2.6 <ArrowUpwardIcon className='arrow-icons' /></span>
                </div>
                <p className='featured-sub'>So với tháng trước</p>
            </div>
        </div>
    )
}

export default FeaturedItem