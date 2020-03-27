from django.urls import path

from orders.views import IngredientView, OrderViewSet, UserRegisterView


order_list = OrderViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
order_detail = OrderViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    path('orders/', order_list, name='bookmark-list'),
    path('orders/<int:pk>/', order_detail, name='bookmark-detail'),
    path('ingredients/', IngredientView.as_view(), name='ingredients'),
    path('register/', UserRegisterView.as_view(), name='user-register')

]
