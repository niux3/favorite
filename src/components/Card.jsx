import { useEffect, useState } from "react"


function Card({href, img, text, display}){

    return (
        <a className={`card cell large-4 medium-6 small-12 ${display}`} href={href} target="_blank">
            <div className="wrap-illus">
                <img src="/bg.png" className="fake" alt="" />
                <img src={img} className={`illus`} loading="lazy" alt="" />
            </div>
            <div className="card-section">
                <p>{text}</p>
            </div>
        </a>
    )
}

export default Card
