from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=75,
        required = True,
        widget=forms.TextInput(attrs={'class':'input','placeholder':'Username'})
    )
    password = forms.CharField(
        max_length = 20,
        required = True,
        widget=forms.PasswordInput(attrs={'class': 'input', 'placeholder': 'Password'})
    )

class SignUpForm(forms.Form):
    first_name = forms.CharField(
        max_length= 75,
        widget=forms.TextInput(attrs={'class': 'input', 'placeholder': 'Firstname'})
    )
    last_name =forms.CharField(
        max_length= 75,
        widget=forms.TextInput(attrs={'class': 'input', 'placeholder': 'Lastname'})
    )
    username = forms.CharField(
        max_length=75,
        required=True,
        widget=forms.TextInput(attrs={'class': 'input', 'placeholder': 'Username'})
    )
    password = forms.CharField(
        max_length=20,
        required=True,
        widget=forms.PasswordInput(attrs={'class': 'input', 'placeholder': 'Password'})
    )