from django.db import models

# Create your models here.
class Athlete(models.Model):
    pid = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    rank = models.CharField(max_length=255)
    rank_s = models.CharField(max_length=255)
    rank_cj = models.CharField(max_length=255)
    lname = models.CharField(max_length=255) #unique?
    fname = models.CharField(max_length=255)
    born = models.CharField(max_length=255)
    nation = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    bweight = models.CharField(max_length=255)
    snatch1 = models.CharField(max_length=255)
    snatch2 = models.CharField(max_length=255)
    snatch3 = models.CharField(max_length=255)
    snatch = models.CharField(max_length=255)
    jerk1 = models.CharField(max_length=255)
    jerk2 = models.CharField(max_length=255)
    jerk3 = models.CharField(max_length=255)
    jerk = models.CharField(max_length=255)
    total = models.CharField(max_length=255)
    event = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    sinclair_total = models.CharField(max_length=255)
   

    def __str__(self):
        return self.lname