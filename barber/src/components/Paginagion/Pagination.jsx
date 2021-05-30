import React from 'react'
import { useSelector } from 'react-redux'
import './pagination.css'

export default function Pagination() {

    const page = useSelector((state) => state.page)

    return (
        <div className="paginagiom">
            {
                page > 0 &&
                <React.Fragment>
                    <div className={`dot ${page > 0 ? 'activeP' : ''}`}>1</div>
                    <div className={`line ${page > 1 ? 'activeP' : ''}`}></div>
                    <div className={`dot ${page > 1 ? 'activeP' : ''}`}>2</div>
                    <div className={`line ${page > 2 ? 'activeP' : ''}`}></div>
                    <div className={`dot ${page > 2 ? 'activeP' : ''}`}>3</div>
                </React.Fragment>
            }

        </div>
    )
}
