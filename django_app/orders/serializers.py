from rest_framework import serializers

from django.contrib.auth import get_user_model

from orders.models import Ingredient, Order


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'address')


class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create(email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'password', 'address')


class OrderSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'price', 'order_address', 'salad', 'bacon', 'cheese',
                  'meat', 'created_at', 'delivery_method', 'user')


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('salad', 'bacon', 'cheese',  'meat')
