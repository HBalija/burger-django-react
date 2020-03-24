from rest_framework import viewsets, generics

from orders.models import Ingredient, Order
from orders.serializers import IngredientSerializer, OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class IngredientView(generics.RetrieveAPIView):
    serializer_class = IngredientSerializer

    def get_object(self):
        return Ingredient.objects.first()
