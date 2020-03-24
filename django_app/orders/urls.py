from django.urls import path

from orders.views import OrderViewSet


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
]
