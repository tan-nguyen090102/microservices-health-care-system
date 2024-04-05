import pymysql
from pymysql.constants import CLIENT

class Setting():
    def __init__(self) -> None:
        self.mysql_setting = {
            "user": "root",
            "password": "your_password",
            "server": "localhost",
            "port": 3306,
            "db": "dev_db",
        }
        self.database_setup = None

    def connection(self):
        database_connection = pymysql.connect(
            user = self.mysql_setting["user"],
            password = self.mysql_setting["password"],
            host = self.mysql_setting["server"],
            port = self.mysql_setting["port"],
            database = self.mysql_setting["db"],
            client_flag=CLIENT.MULTI_STATEMENTS,
        )

        return database_connection

    def setting(self):
        return self.mysql_setting
    
    def database(self):
        if self.database_setup is None:
            return self.connection()