from rest_framework import serializers

from orders.models import Ingredient, Order


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('id', 'price', 'order_address', 'salad', 'bacon', 'cheese',
                  'meat', 'created_at', 'delivery_method')


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('salad', 'bacon', 'cheese',  'meat')
