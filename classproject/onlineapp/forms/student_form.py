from onlineapp.models import Student,College,MockTest1
import django.forms as forms

class AddStudent(forms.ModelForm):
    class Meta:
        model = Student
        college = College.objects.all()
        exclude =['id','dob','college']
        fields = ['name','email','db_folder','dropped_out']
        widgets ={
            'name':forms.TextInput(attrs={'class':'input','placeholder':'Enter student name'}),
            'email':forms.EmailInput(attrs={'class':'input','placeholder':'Enter email ID'}),
            'db_folder':forms.TextInput(attrs={'class':'input','placeholder':'Enter db folder name'}),
            'dropped_out':forms.CheckboxInput(),
        }

class MockTestForm(forms.ModelForm):
    class Meta:
        model = MockTest1
        exclude = ['student','total','id']
        fields = ['problem1','problem2','problem3','problem4']
        widgets = {
            'problem1': forms.NumberInput(attrs={'class': 'input', 'placeholder': 'Problem 1'}),
            'problem2': forms.NumberInput(attrs={'class': 'input', 'placeholder': 'Problem 2'}),
            'problem3': forms.NumberInput(attrs={'class': 'input', 'placeholder': 'Problem 3'}),
            'problem4': forms.NumberInput(attrs={'class':'input','placeholder':'Problem 4'}),
        }