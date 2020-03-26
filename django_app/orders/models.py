from django.db import models


class Order(models.Model):
    order_address = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=3, decimal_places=1)
    salad = models.PositiveSmallIntegerField()
    bacon = models.PositiveSmallIntegerField()
    meat = models.PositiveSmallIntegerField()
    cheese = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    DELIVERY_METHOD_FASTEST = 'fastest'
    DELIVERY_METHOD_CHEAPEST = 'cheapest'

    DELIVERY_METHOD_CHOICES = (
        (DELIVERY_METHOD_FASTEST, 'Fastest'),
        (DELIVERY_METHOD_CHEAPEST, 'cheapest'),
    )

    delivery_method = models.CharField(
        max_length=255, choices=DELIVERY_METHOD_CHOICES, default=DELIVERY_METHOD_FASTEST)

    def __str__(self):
        return f'{self.id} - {self.price}'

    class Meta:
        ordering = ['-created_at']


class Ingredient(models.Model):
    salad = models.PositiveSmallIntegerField(default=0)
    bacon = models.PositiveSmallIntegerField(default=0)
    meat = models.PositiveSmallIntegerField(default=0)
    cheese = models.PositiveSmallIntegerField(default=0)

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return 'Default ingredients'