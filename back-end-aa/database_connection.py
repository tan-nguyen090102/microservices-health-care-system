from mysql_setting import Setting

database = Setting().database()

def call_stored_procedure(connection, procedure_name, parameters):
    cursor = connection.cursor()
    connection.ping()
    try:
        database_response = None
        cursor.callproc(procedure_name, parameters)
        function_matches = ["select", "check", "get", "insert"]
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
# def update_user_auth_code(connection, userid, authcode) :
#     try:
#         # Cursor object creation
#         cursorObject = connection.cursor()
#         updateStatement = "UPDATE users set authorization_code = '"+ authcode + "' where (id = '"+ userid + "')"
#         #UPDATE `dev_db`.`users` SET `authorization_code` = 'Test-1234' WHERE (`id` = 'U1');
#         # Execute the SQL UPDATE statement
#         cursorObject.execute(updateStatement)
#         connection.commit()

#     except Exception as e:
#         #TODO HANDLE ERRORS AS FAILURE
#         print("Exception occured:{}".format(e))
#         raise Exception("Sorry, failed to save to db")
#     finally:
#         cursorObject.close()

# def update_user_password(connection, userid, password) :
#     print("attempting to change password.",password)
#     try:
#         # Cursor object creation
#         cursorObject = connection.cursor()
#         updateStatement = "UPDATE users set password = '"+ password + "' where (id = '"+ userid + "')"
#         print("update statement",updateStatement)
#         #UPDATE `dev_db`.`users` SET `authorization_code` = 'Test-1234' WHERE (`id` = 'U1');
#         # Execute the SQL UPDATE statement
#         cursorObject.execute(updateStatement)
#         connection.commit()
#         print("Successfully changed password.")

#     except Exception as e:
#         #TODO HANDLE ERRORS AS FAILURE
#         print("Exception occured:{}".format(e))
#         raise Exception("Sorry, failed to save to db")
#     finally:
#         cursorObject.close()