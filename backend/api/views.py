from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Review
from django.db.models import Avg
from rest_framework.views import APIView
from rest_framework.response import Response


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ReviewListCreate(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    # we make sure to only get the reviews of the game selected
    def get_queryset(self):
        gameID = self.kwargs['game_id']
        return Review.objects.filter(game_id=gameID).order_by('created_at')
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ReviewDelete(generics.DestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(author=user)
    
class GetAverage(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, game_id):
        avg_rating = Review.objects.filter(game_id=game_id).aggregate(avg=Avg('rating')) #we return the obkect so that avg_rating = {avg: '2.66'}
        return Response(avg_rating) # we return in a response so that we serialize the return info correctly into json
    
class ViewUserReviews(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(author=user)
