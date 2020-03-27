from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, email, password=None):
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'email'

    email = models.EmailField(max_length=255, unique=True)
    address = models.CharField(max_length=255, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateField(auto_now_add=True)

    objects = UserManager()

    def __str__(self):
        return self.email


class Order(models.Model):
    order_address = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=3, decimal_places=1)
    salad = models.PositiveSmallIntegerField()
    bacon = models.PositiveSmallIntegerField()
    meat = models.PositiveSmallIntegerField()
    cheese = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')

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
