import React, { useState } from 'react'
import { theTypes, contactUs, location ,aboutUsText, legalTerms } from '../utility'

export default function MenuBar() {

    const [itemChose, setItemChose] = useState('aboutUsLi')

    return (
        <div className="menuBarSec">
            <ul>
                <li>
                    <div className={`aboutUsLi ${itemChose !== null && itemChose === 'aboutUsLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('aboutUsLi')}>
                        <h1 className={`${itemChose !== null && itemChose === 'aboutUsLi' ? 'activeh2' : ''}`} > About Us</h1>
                        <p>{aboutUsText}</p>
                    </div></li>
                <li>
                    <div className={`${itemChose !== null && itemChose === 'pricingLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('pricingLi')}>
                        <h1 className={`aboutUsLi ${itemChose !== null && itemChose === 'pricingLi' ? 'activeh2' : ''}`} >  Pricing </h1>
                        {theTypes.map((item, index) => {
                            return <div className="pricingSec" key={index}>
                                <h3>{item.name}</h3>
                                <h3>{item.price}</h3>
                            </div>
                        })}
                    </div></li>
                <li>
                    <div className={`locationLi ${itemChose !== null && itemChose === 'locationLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('locationLi')}>
                        <h1 className={`${itemChose !== null && itemChose === 'locationLi' ? 'activeh2' : ''}`}>  Location </h1>
                        <div className="contactRow">
                            <div className="contactItem">
                                <i aria-hidden="true" className="map pin red icon"></i>
                            </div>
                            <div className="contactItem">
                                {location.adress}
                            </div>
                        </div>
                        <div className="dinamicMapSec"></div>
                    </div></li>
                <li>
                    <div className={`followUsLi ${itemChose !== null && itemChose === 'followUsLi' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('followUsLi')}>
                        <h1 className={`${itemChose !== null && itemChose === 'followUsLi' ? 'activeh2' : ''}`}>   Contact Us</h1>
                        {
                            contactUs.map((item, index) => {
                                return <div className="contactRow" key={index}>
                                    <div className="contactItem">
                                        <i aria-hidden="true" className={`${item.name} ${item.color} icon`}></i>
                                    </div>
                                    <div className="contactItem">
                                        {item.route}
                                    </div>
                                </div>
                            })
                        }
                    </div></li>

                    <li>
                    <div className={`legalLI ${itemChose !== null && itemChose === 'legalLI' ? 'activeItem' : ''}`}
                        onClick={() => setItemChose('legalLI')}>
                        <h1 className={`${itemChose !== null && itemChose === 'legalLI' ? 'activeh2' : ''}`} > Legal</h1>
                        <p>{legalTerms}</p>
                    </div></li>


            </ul>
        </div>
    )
}
