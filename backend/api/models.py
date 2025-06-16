from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Review(models.Model):
    review_content = models.CharField(max_length = 500)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name="reviews")
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)]) #number between 1-10
    game_id = models.CharField(max_length= 100)

    def __str__(self):
        return self.review_content