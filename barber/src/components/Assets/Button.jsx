import React from 'react'

export default function Button({onClick,text}) {
    return (
        <>
            <button className="ui primary button" onClick={onClick} >{text}</button>
        </>
    )
}
