import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useParams } from 'react-router-dom';
import { img_300, noPicture } from '../config';
import "../index.css";

const handleDragStart = (e) => e.preventDefault();
const Carousel = () => {
    const params = useParams();

    const [credits, setCredits] = useState([])

    const items = credits?.map((credit, idx) => {
        return (
            <div  key={idx} className="carouselItem">
                <img
                    src={credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture}
                    alt={credit?.name}
                    onDragStart={handleDragStart}
                    className='carouselItem_img'
                />
                <b className="carouselItem_txt">
                    {credit?.name}
                </b>
            </div>
        )
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 3,
        },
        1024: {
            items: 4,
        },
    };

    const fetchCreditData = async () => {
        const mediaType = params.media;
        const mediaId = params.id;
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
            ;
        const { data } = await axios.get(url);
        // console.log(data);
        setCredits(data.cast);
    };

    useEffect(() => {
        fetchCreditData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <AliceCarousel
            autoPlay
            infinite
            disableButtonsControls
            disableDotsControls
            responsive={responsive}
            mouseTracking
            items={items}
            
        />
    );
}

export default Carousel;