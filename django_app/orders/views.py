from rest_framework import generics, permissions, viewsets

from django.contrib.auth import get_user_model

from orders.models import Ingredient, Order
from orders.serializers import IngredientSerializer, OrderSerializer, UserRegisterSerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class IngredientView(generics.RetrieveAPIView):
    serializer_class = IngredientSerializer

    def get_object(self):
        return Ingredient.objects.first()


class UserRegisterView(generics.CreateAPIView):
    model = get_user_model()
    serializer_class = UserRegisterSerializer
