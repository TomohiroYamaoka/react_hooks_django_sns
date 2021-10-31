from django.shortcuts import render
from rest_framework import generics, authentication, permissions
from api_user import serializers
from core.models import Profile, FriendRequest
from django.db.models import Q
from rest_framework import viewsets
from rest_framework import ValidationError
from rest_framework import status
from rest_framework.response import Response
from core import custompermissions


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer


class FriendRequestViewSet(viewsets.ModeViewSet):
    query = FriendRequest.objects.all()
    serializers = serializers.FriendRequestSerializer
    authentication_classes = (authentication.TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        # どちらかの
        return self.queryset.filterO(Q(askTo=self.request.user) | Q(askFrom=self.request.user))

    def perform_create(self, serializer):
        try:
            serializer.save(askFrom=self.request.user)
        except:
            raise ValidationError("user van have only unique request")

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'Delete is not allowed'}
        return Response(response)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Patch is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,
                          custompermissions.ProfilePermission)

    def perform_create(self, serializer):
        serializer.save(userPro=self.request.user)


class MyProfileListView(generics.ListAPIView):

    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userPro=self.request.user)
