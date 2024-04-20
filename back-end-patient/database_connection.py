from mysql_setting import Setting

database = Setting().database()

def call_stored_procedure(connection, procedure_name, parameters):
    cursor = connection.cursor()
    connection.ping()
    try:
        database_response = None
        cursor.callproc(procedure_name, parameters)
        function_matches = ["check", "insert"]
        if any(x in procedure_name for x in function_matches):
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