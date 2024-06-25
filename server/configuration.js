const configuration = {
    "db": {
        "name": "db",
        "saveOnPush": true,
        "humanReadable": false,
        "separator": "/"
    },
    "routes": [
        { method : "get", path : "/", view : 'FavoriteController.index' },
        { method : "get", path : "/:id", view : 'FavoriteController.show' },
        { method : "post", path : "/add", view : 'FavoriteController.add' },
        { method : "post", path : "/auth", view : 'UserController.login' },
        { method : "post", path : "/auth/add", view : 'UserController.add' },
    ]
}
export default configuration
