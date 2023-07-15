from rest_framework import permissions


class CanDeleteFriendRequest(permissions.BasePermission):
    message = "You are not allowed to delete other peoples friend request"

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        # Only the sending user can delete the friend request
        return obj.sender == request.user


class CanUpdateFriendRequest(permissions.BasePermission):
    message = "You dont have permission to change status of this friend request"

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        # Only the receiving user can update (accept/decline) the friend request
        return obj.receiver == request.user
