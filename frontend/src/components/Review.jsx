import react from 'react'
import '../styles/Review.css'

function Review({review, /*onDelete*/}) {
    const formattedDate = new Date(review.created_at).toLocaleDateString('en-US')

        const getRatingColor = () => {
        const numValue = parseFloat(review.rating)
                if (numValue <= 2.0){
                    return 'red'
                }
                else if (numValue > 2.0 && numValue <= 4.0){
                    return 'orange'
                }
                else if (numValue > 4.0 && numValue <= 6.0){
                    return 'D5B60A'
                }
                else if(numValue > 6.0 && numValue <= 8.0){
                    return '#00ab41'
                }
                else if(numValue > 8.0){
                    return 'green'
                }
                else{
                    return 'black'
                }
    }

    return <div className='review-container'>
        <p className ='review-author'>{review.author}</p>
        <p className = 'review-content'>[<span style={{color: getRatingColor()}}>{review.rating}.0</span>] - {review.review_content}</p>
        <p className='review-date'>{formattedDate}</p>
        {/* <button className='delete-button' onClick={() => onDelete(review.id)}>Delete Review</button> */}
    </div>
}

export default Review