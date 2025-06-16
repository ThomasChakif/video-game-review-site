import { useState } from "react";
import {Button, Modal, Box, Stack, TextField, TableRow} from '@mui/material'
import api from "../api";
import { ACCESS_TOKEN } from '../constants'
import '../styles/NewReviewModal.css'


export default function NewReviewModal({newReviewModalOpen, setNewReviewModalOpen, getReviews, gameID}){
    const [review_content, setReviewContent] = useState("")
    const [rating, setRating] = useState()

    const handleModalClose = () => setNewReviewModalOpen(false)
    const token = localStorage.getItem(ACCESS_TOKEN);

    const addReview = async () => {
        if(!review_content || !rating){
            alert('Please fill out all required fields.')
            return
        }
        if(rating < 0 || rating > 10){
            alert("Rating must be a whole number between 0 and 10.")
            return;
        }

        api.post(`api/reviews/${gameID}/`, {review_content: review_content, rating: rating, game_id: gameID}).then((res) => {
            if (res.status === 201) alert("Review created!")
            else alert("Failed to create review")
            getReviews()
            // add a small delay before reloading the page to prevent axios network errors
            // we have to reload to update the running game average and the leave a review button
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }).catch((err) => alert(err))
    }

    return (
        <Modal open={newReviewModalOpen} onClose ={handleModalClose}>
             <Box className='review-Box'>
                <h2>New Review</h2>
                <Stack spacing={2}>
                    <TextField sx={{p: '3px'}} required label='Tell us what you thought...' onChange={event =>
                        setReviewContent(event.target.value)
                    }/>
                    <TextField sx={{p: '4px'}} required label="Your rating out of 10.0" type="number" InputProps={{ inputProps: { min: 0, max: 10 } }} value={rating} onChange={event => {
                        const ic = event.target.value
                        if (/^\d*$/.test(ic)) { // regex to allow only whole numbers
                            setRating(ic)
                        }
                    }}
                    />
                </Stack>
                <div className='review-close-buttons'>
                    <Button sx={{color: '#111827'}} onClick={addReview}>Add Review</Button>
                    <Button sx={{color: '#111827'}} onClick={handleModalClose}>Close</Button>
                </div>
             </Box>
        </Modal>
    )
}