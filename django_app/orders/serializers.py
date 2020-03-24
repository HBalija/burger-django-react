from rest_framework import serializers

from orders.models import Order


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('id', 'price', 'order_address', 'salad', 'bacon', 'cheese', 'meat', 'created_at')
