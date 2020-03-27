from django.contrib import admin

from orders.models import Ingredient, Order, User


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    pass


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
