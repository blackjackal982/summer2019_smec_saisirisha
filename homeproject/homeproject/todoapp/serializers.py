from .models import *
from rest_framework import serializers

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todolist
        fields = ('id','name','user_id')

    def create(self,validated_data):
        user = self.context['request'].user
        list = Todolist.objects.create(
            user=user,
            **validated_data
        )
        return list


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = todoitem
        fields = ('id','description','due_date','completed')

    def create(self,validated_data):
        list = Todolist.objects.get(pk =self.context['pk'])
        item = todoitem.objects.create(
            list = list,
            **validated_data
        )
        return item