import json
import os
import socket
import time
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginIntegrationTest:
    def __init__(self, target):
        self.driver = None
        # A path on local PC that store necessary drivers and assets
        self.local_pc_path = os.path.dirname(__file__)
        self.confidence_level = 0.9
        self.IP = socket.gethostbyname(socket.gethostname())

        with open("testData.json", "r") as input_file:
            self.test_object = json.load(input_file)[target]

    def automated_run(self):
        service = Service(self.local_pc_path + r"\msedgedriver.exe")
        # The location of Edge browser in local PC PATH
        edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

        # Add options for the driver
        edge_options = webdriver.EdgeOptions()
        edge_options.binary_location = edge_path
        edge_options.add_argument("--ignore-certificate-errors")
        edge_options.add_argument("--allow-insecure-localhost")
        edge_options.add_argument("--enable-chrome-browser-cloud-management")
        edge_options.add_experimental_option("detach", True)

        try:
            # Assign services and options to driver
            self.driver = webdriver.Edge(service=service, options=edge_options)
            self.driver.get("http://" + self.IP + self.test_object["port"] + self.test_object["tail"])

            emailInput = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.NAME, "userID")))
            passwordInput = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.NAME, "password")))
            loginButton = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.NAME, "loginButton")))

            emailInput.send_keys(self.test_object["email"])
            passwordInput.send_keys(self.test_object["password"])
            loginButton.click()
            
        except Exception as e:
            print("Error: " + str(e))
            self.driver.quit()
        return self.driver
    

if __name__ == "__main__":
    patientAutomation = LoginIntegrationTest("patient")
    driver = patientAutomation.automated_run()
    time.sleep(1)
    driver.quit()

    time.sleep(1)

    adminAutomation = LoginIntegrationTest("admin")
    driver = adminAutomation.automated_run()
    time.sleep(1)
    driver.quit()

