import time
import sys, os
import requests
from random import randint

config = {}
location = {}

def defineConfig():
    with open(os.path.join(sys.path[0],"config.txt")) as f:
        for line in f:
            (key, val) = line.split('=')
            config[key] = str(val.replace('"', ''))

def getLocation():
    with open(os.path.join(sys.path[0],"location.txt")) as f:
        for line in f:
            (key, val) = line.split('=')
            location[key] = str(val.replace('"', ''))

def changeLocation(longitude, latitude):
    location['long'] = longitude 
    location['lat'] = latitude
    f = open(os.path.join(sys.path[0],"location.txt"), "w")
    f.write(f'long="{longitude}"\n')
    f.write(f'long="{latitude}"')
    f.close()

def getVerificationCode():
    return randint(100000, 999999)

def sendVerificationCode():
    time.sleep(5)
    verifyCode = str(getVerificationCode())
    print("Your verification code is: " + verifyCode)
    recive = requests.post(config['server_ip'] + "/api/drone/ping", 
        data={'droneName': config['droneName'],
            'longitude': location['long'],
            'latitude': location['lat'],
            'verificationCode': verifyCode
        })
    print("hello")
    print(recive.status_code)
    if(recive.status_code != 200):
        return
    print("hello1")
    time.sleep(5)
    recive = requests.post(config['server_ip'] + "/api/drone/ping", 
        data={'droneName': config['droneName'],
            'longitude': location['long'],
            'latitude': location['lat'],
            'command': "deleteVerificationCode"
        })
    print("hello1")
    
    print("end")

def main():
    defineConfig()
    getLocation()
    print(config['droneName'] + " started")
    print("Conecting to server")
    recive = requests.post(config['server_ip'] + "/api/drone/ping", 
        data={'droneName': config['droneName'],
            'longitude': location['long'],
            'latitude': location['lat']
        })
    if(recive.status_code == 404):
        print("Adding drone to database")
        recive = requests.post(config['server_ip'] + "/api/drone/create", 
        data={'droneName': config['droneName']}
        )
        if(recive.status_code != 201):
            print("Server has problems try again later")
            return
    print("Conected")
    while True:
        time.sleep(2.5)
        recive = requests.post(config['server_ip'] + "/api/drone/ping", 
            data={'droneName': config['droneName'],
                'longitude': location['long'],
                'latitude': location['lat']
            })
        dataFromServer = recive.json()
        if(dataFromServer['quest'] == "verifycode"):
            sendVerificationCode()
    #while (True):
    #    time.sleep(2.5)


if __name__ == "__main__":
    main()