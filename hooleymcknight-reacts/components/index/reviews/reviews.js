import styles from '../../../styles/pages/Reviews.module.scss';
import reviewsData from './reviews_data.json';
import { useState, useEffect } from 'react';

const createMarkup = (input) => {
    return { __html: input}
}

const reviewsCount = reviewsData.length;
const middlePoint = Math.round(reviewsCount / 2);

const Reviews = () => {
    // const [isChecked, setIsChecked] = useState(middlePoint)
    const [swiperInit, setSwiperInit] = useState(false);

    useEffect(() => {
        const slideCount = document.querySelectorAll('.glide__slide').length;
        if (slideCount >= reviewsCount && !swiperInit) {
            jQuery('.reviews-carousel').slick({
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
            setSwiperInit(true);
        }
    }, []);

    return (
        <div className={styles.reviews} id="reviews">
            <h2>Reviews</h2>

            <div className="reviews-carousel">
                {reviewsData.map(x => 
                    <div key={x.name} className={`${styles['review-item']} glide__slide`}>
                        <p dangerouslySetInnerHTML={createMarkup(x.content)}></p>
                        <p>-- {x.name}</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Reviews;