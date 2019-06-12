from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,APIView
from rest_framework import status
from .serializers import *
from rest_framework.response import Response



@api_view(['GET','POST','DELETE'])
def get_colleges(request,*args,**kwargs):

    if request.method =='GET':

        if not kwargs:
            try:
                colleges = College.objects.all()
                serialized_college = CollegeSerializer(colleges, many=True)
                return Response(serialized_college.data)
            except Exception:
                return Response(serialized_college.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                colleges = College.objects.get(id=kwargs.get('pk'))
                serialized_college = CollegeSerializer(colleges)
                return Response(serialized_college.data)
            except Exception:
                return Response(serialized_college.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'POST':
        serializer = CollegeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        try:

            college = College.objects.get(id=kwargs.get('pk'))
        except College.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        college.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    elif request.method == 'PUT':
        college = College.objects.get(id=kwargs.get('pk'))
        serializer = CollegeSerializer(college, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentSerializerView(APIView):

    def get(self,request,*args,**kwargs):
        college = College.objects.get(id=kwargs.get('pk'))

        if not kwargs.get('sk'):
            student = Student.objects.filter(college_id=college.id).all()
            serializer = StudentSerializer(student, many=True)
        else:
            # student = Student.objects.filter(college_id=college.id).get(id=kwargs.get('sk'))
            student = get_object_or_404(Student, id=kwargs.get('sk'))
            serializer = StudentSerializer(student)

        return Response(serializer.data)

    def post(self,request,*args,**kwargs):
        student = StudentDetailsSerializer(data=request.data,context={'college_id':kwargs.get('pk')})
        if student.is_valid():
            student.save()
            return Response(student.data,status=status.HTTP_201_CREATED)

    def delete(self, request, pk, sk, format=None):
        student = get_object_or_404(Student, pk=sk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk,sk, format=None):
        student = get_object_or_404(Student,id=sk)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
