import React, { useState } from 'react'

export default function MenuBar() {

    const [itemChose, setItemChose] = useState('aboutUsLi')

    return (
        <div className="menuBarSec">
            <ul>
                <li>
                    <div className={`aboutUsLi ${itemChose !== null && itemChose === 'aboutUsLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('aboutUsLi')}>
                        <h2 className={`${itemChose !== null && itemChose === 'aboutUsLi' ? 'activeh2' : ''}`} > About Us</h2>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore ullam, libero officiis similique exercitationem hic ut necessitatibus totam voluptates vitae dignissimos pariatur nulla molestiae quia.
                    </p>
                    </div></li>
                <li>
                    <div className={`${itemChose !== null && itemChose === 'pricingLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('pricingLi')}>
                        <h2 className={`aboutUsLi ${itemChose !== null && itemChose === 'pricingLi' ? 'activeh2' : ''}`} >  Pricing </h2>
                    </div></li>
                <li>
                    <div className={`locationLi ${itemChose !== null && itemChose === 'locationLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('locationLi')}>
                        <h2 className={`${itemChose !== null && itemChose === 'locationLi' ? 'activeh2' : ''}`}>  Location </h2>
                    </div></li>
                <li>
                    <div className={`followUsLi ${itemChose !== null && itemChose === 'followUsLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('followUsLi')}>
                        <h2 className={`${itemChose !== null && itemChose === 'followUsLi' ? 'activeh2' : ''}`}>   Contact Us</h2>
                    </div></li>
            </ul>
        </div>
    )
}
