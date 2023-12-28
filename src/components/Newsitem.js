import React from 'react';

const Newsitem = (props) => {

    let defaultImgUrl = 'https://media.cheggcdn.com/media/012/01218fc2-837d-497c-8f06-012e5d922ab9/phpwQqFlz'

    const { title, description, imgUrl, newsUrl, date, source } = props;

    return (
        <div className='my-3 block' style={{ display: 'd-flex' }}>
            <div className="card" style={{ height: '25rem', flexShrink: '0' }}>
                <span className="position-absolute top-0 badge rounded-pill bg-danger" style={{ zIndex: '2', right: '0px', transform: 'translate(-10%, -50%)' }}>{new Date(date).toGMTString().slice(5, 17)}</span>
                <img src={imgUrl ? imgUrl : defaultImgUrl} alt="" style={{ height: '45%', objectFit: 'cover' }} />
                <div className="card-body" style={{ height: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <h5 className="card-title" style={{ fontSize: '1.1rem' }}>{title.length > 50 ? title.slice(0, 50) + '...' : title}</h5>
                    <p className="card-text" style={{ fontSize: '0.9rem' }}>{description ? (description.length > 100 ? description.slice(0, 100) + '...' : description) : ''}</p>
                    <p className="card-text" style={{ fontSize: '0.85rem' }}><small className="text-body-secondary">By {source}</small></p>
                    <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-primary btn-sm">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem