import csv
import io
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from .models import Athlete
from django.core import serializers
from django.db import connections
from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'result.html') #change to athlete.html

def detail(request, result_id):
    result = get_object_or_404(Athlete, pk=result_id),
    return render(request, 'detail.html', { 'result': result })


@permission_required('admin.can_add_log_entry')
def upload(request):
    template = "upload.html"
    prompt = {
        'order': 'pid  gender  rank  rank_s  rank_cj  lname fname born  nation  category  bweight  snatch1  snatch2  snatch3  snatch  jerk1  jerk2  jerk3  jerk  total  event  date sinclair_total'
    }

    if request.method == "GET":
        return render(request, template, prompt)

    csv_file = request.FILES['file']

    if not csv_file.name.endswith('.csv'):
        messages.error(request, 'This is not a csv file')

    data_set = csv_file.read().decode('UTF-8')
    io_string = io.StringIO(data_set)
    next(io_string)  # skips header
    for column in csv.reader(io_string, delimiter=','):
        _, created = Athlete.objects.update_or_create(
            pid=column[0],
            gender=column[1],
            rank=column[2],
            rank_s=column[3],
            rank_cj=column[4],
            lname=column[5],
            fname=column[6],
            born=column[7],
            nation=column[8],
            category=column[9],
            bweight=column[10],
            snatch1=column[11],
            snatch2=column[12],
            snatch3=column[13],
            snatch=column[14],
            jerk1=column[15],
            jerk2=column[16],
            jerk3=column[17],
            jerk=column[18],
            total=column[19],
            event=column[20],
            date=column[21],
            sinclair_total=column[22]
        )

    context = {}
    return render(request, template, context)


@permission_required('admin.can_add_log_entry')
def download(request):
    items = Athlete.objects.all()

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment: filename="results.csv"'

    writer = csv.writer(response, delimiter=',')
    writer.writerow(['pid', 'gender', 'rank', 'rank_s', 'rank_cj', 'lname', 'fname', 'born', 'nation', 'category', 'bweight',
    'snatch1', 'snatch2', 'snatch3', 'snatch', 'jerk1', 'jerk2', 'jerk3', 'jerk', 'total', 'event', 'date', 'sinclair_total'])

    for obj in items:
        writer.writerow([obj.pid, obj.gender, obj.rank, obj.rank_s, obj.rank_cj, obj.lname, obj.fname, obj.born, obj.nation, obj.category,
        obj.bweight, obj.snatch1, obj.snatch2, obj.snatch3, obj.snatch, obj.jerk1, obj.jerk2, obj.jerk3, obj.jerk, obj.total, obj.event, obj.date, obj.sinclair_total])

    return response


def list(request):
    object_list = Athlete.objects.all()
    raw_data = serializers.serialize('python', object_list)  
    actual_data = [d['fields'] for d in raw_data]       #with no pk or models
    return JsonResponse(actual_data, content_type="application/json", safe=False)
