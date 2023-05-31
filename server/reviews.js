const express = require('express');
const router = express.Router();
const db = require('./database');

router.post('/addReview', async(req, res) => {
    const reviewInfo = req.body;
    const user_id = reviewInfo.user_id;
    const course_id = reviewInfo.course_id;
    const rating = reviewInfo.rating;
    const review_text = reviewInfo.reviewText;
    
    try {
        db.query('INSERT INTO reviews (course_id,  rating, review_text, user_id) VALUES ($1, $2, $3, $4)', [course_id, rating, review_text, user_id]);
        res.status(200).json({message: "Спасибо за отзыв!"});
        console.log('done');
    } catch (error) {
        console.log(error);
    }
})

router.post('/showReviews', async (req, res) => {
    const course_id = req.body.course_id;
    try {
      const result = await db.query(
        'SELECT reviews.*, personal_data.user_img, personal_data.first_name FROM reviews JOIN personal_data ON reviews.user_id = personal_data.user_id WHERE course_id = $1',
        [course_id]
      );
      res.send(JSON.stringify(result.rows));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
module.exports = router;