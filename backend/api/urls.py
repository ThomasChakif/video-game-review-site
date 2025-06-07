from django.urls import path
from . import views

urlpatterns = [
    path("reviews/<str:game_id>/", views.ReviewListCreate.as_view(), name="review-list"),
    path("reviews/delete/<int:pk>/", views.ReviewDelete.as_view(), name="delete-review"),
    path("reviews/average-rating/<str:game_id>/", views.GetAverage.as_view(), name="avg-rating"),
]