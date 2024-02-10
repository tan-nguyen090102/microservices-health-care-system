import pymysql
from pymysql.constants import CLIENT
from mysql_setting import Setting

database = Setting().database()

def execute_stored_procedure(connection, procedure_name, parameters):
    cursor = connection.cursor()
    connection.ping()
    try:
        database_response = None
        cursor.callproc(procedure_name, parameters)
        func_matches = ["select", "check", "get"]
        if any(x in procedure_name for x in func_matches):
            database_response = cursor.fetchall()
        print(f"'{procedure_name}' executed in MySQL.")
        if database_response:
            return database_response
    except Exception as e:
        raise Exception(
            f"'{procedure_name}' failed with the following error: {e}"
        )

    finally:
        cursor.close()
