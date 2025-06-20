import { useState, useEffect } from "react";
import api from "../api"
import UserReview from "../components/UserReview";
import AppHeader from "../components/AppHeader";


function UserPage() {
    const [reviews, setReviews] = useState([])

    const getReviews = () => {
        api.get("/api/reviews/userpage/")
        .then((res) => res.data)
        .then((data) => {setReviews(data ?? [])})
        .catch((err) => alert(err))
    }

    useEffect(() => {
        getReviews()
    }, [])
    
    const deleteReview = (id) => {
        api.delete(`api/reviews/delete/${id}/`).then((res) => {
            if(res.status === 204) alert('Review was deleted!')
            else alert('Failed to delete review.')
            getReviews();
        }).catch((err) => alert(err))
    };

    return(
        <div>
            <AppHeader />
            <p className='review-header'>My Reviews</p>
            {(reviews.length === 0) && (
                <p className='review-header'>Leave a review to see them here!</p>
            )}
            {(reviews.length > 0) && (
                reviews.map((review) => (
                    <UserReview review={review} onDelete={deleteReview} key={review.id}/>
                ))
            )}
        </div>
    )
}

export default UserPage