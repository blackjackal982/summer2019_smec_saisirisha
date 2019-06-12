from onlineapp.models import College
import django.forms as forms

class AddCollege(forms.ModelForm):
    class Meta:
        model = College
        exclude =['id']
        widgets ={
            'name':forms.TextInput(attrs={'class':'input','placeholder':'Enter the college name'}),
            'location':forms.TextInput(attrs={'class':'input','placeholder':'Enter the college location'}),
            'acronym':forms.TextInput(attrs={'class':'input','placeholder':'Enter the college acronym'}),
           'contact':forms.EmailInput(attrs={'class':'input','placeholder':'Enter the college contact'}),
        }