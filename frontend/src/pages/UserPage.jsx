import { useState, useEffect } from "react";
import api from "../api"
import Review from "../components/Review";
// import { useNavigate } from 'react-router-dom'


function UserPage() {
    const [reviews, setReviews] = useState([])

    const getReviews = () => {
        api.get(`/api/reviews/user/`)
        .then((res) => res.data)
        .then((data) => {setReviews(data)})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        getReviews()
    }, [])
    // const deleteReview = (id) => {
    //     api.delete(`api/reviews/delete/${id}/`).then((res) => {
    //         if(res.status === 204) alert('Review was deleted!')
    //         else alert('Failed to delete review.')
    //         getReviews();
    //     }).catch((err) => alert(err))
    // };

    return(
        <div>
            <p className='review-header'>Reviews</p>
            {reviews.map((review) => (
                <Review review={review} /*onDelete={deleteReview}*/ key={review.id}/>
            ))}
        </div>
    )
}

export default UserPage