class ConnectionManager:
    connections = []

    @classmethod
    def add_connection(cls, sid, user_id):
        new_connection = {"sid": sid, "user_id": user_id}
        cls.connections.append(new_connection)

    @classmethod
    def remove_connection(cls, sid):
        connection_to_remove = None

        for connection in cls.connections:
            if connection["sid"] == sid:
                connection_to_remove = connection
                break
        if connection_to_remove is not None:
            cls.connections.remove(connection_to_remove)

    @classmethod
    def session_exists(cls, user_id):
        for connection in cls.connections:
            if connection["user_id"] == user_id:
                return True
        return False
    
    @classmethod
    def session_count(cls, user_id):
        count = 0
        for connection in cls.connections:
            if connection["user_id"] == user_id:
                count += 1
        return count