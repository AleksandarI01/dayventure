# from django.shortcuts import render
import random
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
# from email_scheduler.models import EmailScheduler
from user_registration.models import UserRegistration
from user_registration.serializers import UserRegistrationSerializer, UserRegistrationValidationSerializer

# Create your views here.
User = get_user_model()


def code_generator(length=6):
    characters = '0123456789abcdefghijklmnopqrstuvwxyz'
    return ''.join(random.choice(characters) for _ in range(length))


class RegisterView(CreateAPIView):
    """
        post:
        Register a new user with his email  -OR-  start Password Reset
        Code gets sent by Email
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        code = code_generator()
        email = request.data['email']

        # create new user
        data = request.data
        if request.stream.path == '/api/registration/':
            data['username'] = request.data['email']
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

        #     email_header = 'Welcome to Luna-3'
        #     email_body = f'Welcome to Luna!\n\n Your code is: \n-->  {code}  <--'   # todo: change Texts
        # else:
        #     email_header = 'Luna-3 Password reset'
        #     email_body = f'Hello again!\n\n Your code is: \n-->  {code}  <--'     # todo: when email ready

        user = User.objects.get(email=email)

        # create user_registration
        reg_instance = UserRegistration.objects.all()
        reg_instance.update_or_create(user_id=user.id, defaults={'code': code})

        # prepare mail with code on database
        # mail_instance = EmailScheduler.objects.all()
        # mail_instance.create(subject=email_header, message=email_body, recipient_list=email)

        return Response(status=status.HTTP_201_CREATED)


class RegisterValidationView(CreateAPIView):
    """
        post:
        Validate the user with code
        Set Username, Password, (First- and Last-Name)
        password_repeat required!
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationValidationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user_instance = get_object_or_404(User, email=request.data['email'])
        code_instance = get_object_or_404(UserRegistration, user=user_instance)
        if request.data['code'] == code_instance.code \
                and request.data['password'] == request.data['password_repeat']:
            data = request.data
            data['password'] = make_password(data['password'])
            user_serializer = self.get_serializer(user_instance, data=data)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
            res = Response(user_serializer.data)
        else:
            res = Response(status=status.HTTP_418_IM_A_TEAPOT)

        code_instance.delete()
        return res
