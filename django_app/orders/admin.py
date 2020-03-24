from django.contrib import admin

from orders.models import Ingredient, Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    pass
