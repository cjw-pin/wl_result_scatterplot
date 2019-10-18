from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, "index.html")


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('index')
    else:
        form = UserCreationForm()
    form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form })

@login_required
def profile(request):
    return render(request, 'profile.html')