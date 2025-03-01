package app.shyurock.service.user.data.model

enum UserPermission {
    ADMIN('global admin access'),
    READ_USER_LIST('Show all users permission'),
    EDIT_USER_LIST('Allow create, edit, delete user')

    private final String description

    UserPermission(String description) {
        this.description = description
    }

    String getDescription() {
        return description
    }
}
