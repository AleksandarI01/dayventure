import time

from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.utils import timezone

from email_scheduler.models import EmailScheduler


class Command(BaseCommand):
    help = 'This command will every 10 seconds send emails that are due.'

    def handle(self, *args, **options):
        while True:
            time.sleep(10)
            emails = EmailScheduler.objects.filter(sent_date=None, scheduled_date__lte=timezone.now())

            for email in emails:
                subject = email.subject
                message = email.message
                from_email = email.from_email
                recipient_list_text = email.recipient_list
                recipient_list = [x.strip() for x in recipient_list_text.split(';')]
                if email.html:
                    html_message = email.html
                else:
                    html_message = None

                send_mail(
                    subject=subject,
                    message=message,
                    from_email=from_email,
                    recipient_list=recipient_list,
                    html_message=html_message,
                )
                email.sent_date = timezone.now()
                email.save()
