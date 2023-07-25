from sqladmin import ModelView

from app.common.models import SuperUser


class UserAdmin(ModelView, model=SuperUser):
    """Class for setting up the Admin panel for the User model"""

    # Permission
    can_create = True
    can_edit = True
    can_delete = True
    can_view_details = True

    # Metadata
    name = "User Model"
    name_plural = "Users"
    icon = "fa-solid fa-user"

    column_list = [SuperUser.id, SuperUser.email, SuperUser.username]
    column_searchable_list = [SuperUser.email]
    column_sortable_list = [SuperUser.id, SuperUser.email, SuperUser.username]

    # Details
    column_details_list = [SuperUser.id, SuperUser.username]

    # Pagination
    page_size = 50
    page_size_options = [25, 50, 100, 200]
