from todoapp.models import Todolist,todoitem
import django.forms as forms

class DateInput(forms.DateInput):
    input_type = 'date'

class ListForm(forms.ModelForm):
    class Meta:
        model = Todolist
        exclude = ['id','current','user']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input', 'placeholder': 'Enter the List name'}),
        }

class ItemForm(forms.ModelForm):
    class Meta:
        model = todoitem
        exclude = ['id','list']
        widgets ={
            'description': forms.TextInput(attrs={'class':'input','placeholder':'Enter the item description'}),
            'due_date':DateInput(),
            'completed':forms.CheckboxInput(),
        }


