import pymysql
from pymysql.constants import CLIENT
from mysql_setting import Setting

database = Setting().database()

def execute_stored_proc(connection, procedure_name, parameters):
    cursor = connection.cursor()
    connection.ping()
    try:
        database_response = None
        cursor.callproc(procedure_name, parameters)
        func_matches = ["select", "check", "get"]
        if any(x in procedure_name for x in func_matches):
            database_response = cursor.fetchall()
        print(f"SUCCESS: {procedure_name} stored procedure executed")
        if database_response:
            return database_response
    except Exception as e:
        raise Exception(
            f"ERROR: {procedure_name} Stored procedure failed with the following error: {e}"
        )

    finally:
        cursor.close()
