from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,APIView,authentication_classes,permission_classes
from rest_framework import status
from .serializers import *

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication,SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def generate_token(request):
    serializer = AuthTokenSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    token,created = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'user':user.id,
    })

@api_view(['GET','POST','DELETE','PUT'])
#@authentication_classes((TokenAuthentication,))
#@authentication_classes((SessionAuthentication,BasicAuthentication))
#@permission_classes((IsAuthenticated,))
def get_lists(request,*args,**kwargs):
    if request.method =='GET':
        if not kwargs:
            try:
                lists = Todolist.objects.all()
                serialized_list = ListSerializer(lists, many=True)
                return Response(serialized_list.data)
            except Exception:
                return Response(serialized_list.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                lists = Todolist.objects.get(id=kwargs.get('pk'))
                serialized_list = ListSerializer(lists)
                return Response(serialized_list.data)
            except Exception:
                return Response(serialized_list.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'POST':
        serializer = ListSerializer(data=request.data,context={
            'request':request
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        try:
            list = Todolist.objects.get(id=kwargs.get('pk'))
        except Todolist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    elif request.method == 'PUT':
        list = Todolist.objects.get(id=kwargs.get('pk'))
        serializer = ListSerializer(list, data=request.data,context={
            'request':request,
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST','DELETE','PUT'])
#@authentication_classes((TokenAuthentication,))
#@authentication_classes((SessionAuthentication,BasicAuthentication))
#@permission_classes((IsAuthenticated,))
def get_items(request,*args,**kwargs):
    if request.method =='GET':
        if not kwargs.get('item_id'):
            try:
                items = todoitem.objects.filter(list_id = kwargs.get('pk')).all()
                serialized_list = ItemSerializer(items, many=True)
                return Response(serialized_list.data)
            except Exception:
                return Response(serialized_list.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                item = todoitem.objects.get(id=kwargs.get('item_id'))
                serialized_list = ItemSerializer(item)
                return Response(serialized_list.data)
            except Exception:
                return Response(serialized_list.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data,context={
            'pk':kwargs.get('pk')
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        try:
            item = todoitem.objects.get(id=kwargs.get('item_id'))
        except todoitem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    elif request.method == 'PUT':
        item = todoitem.objects.get(id=kwargs.get('item_id'))
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
