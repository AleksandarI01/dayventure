from rest_framework.generics import ListAPIView

from category.models import Category
from category.serializers import CategorySerializer


class CategoryListView(ListAPIView):
    """
        get:
        List of all categories in alphabetical order
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
