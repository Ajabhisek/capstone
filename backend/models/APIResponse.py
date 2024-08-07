class APIResponse:
    def __init__(self, status=True, msg="", data=None):
        self.status = status
        self.msg = msg
        self.data = data