import time
import sys, os
import requests
import math
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
    time.sleep(300)
    recive = requests.post(config['server_ip'] + "/api/drone/ping", 
        data={'droneName': config['droneName'],
            'longitude': location['long'],
            'latitude': location['lat'],
            'command': "deleteVerificationCode"
        })    
    print("end")

def midpoint(x1, y1, x2, y2):
#Input values as degrees

#Convert to radians
    lat1 = math.radians(x1)
    lon1 = math.radians(x2)
    lat2 = math.radians(y1)
    lon2 = math.radians(y2)


    bx = math.cos(lat2) * math.cos(lon2 - lon1)
    by = math.cos(lat2) * math.sin(lon2 - lon1)
    lat3 = math.atan2(math.sin(lat1) + math.sin(lat2), \
           math.sqrt((math.cos(lat1) + bx) * (math.cos(lat1) \
           + bx) + by**2))
    lon3 = lon1 + math.atan2(by, math.cos(lat1) + bx)

    return [round(math.degrees(lat3), 2), round(math.degrees(lon3), 2)]

def makeMission(longitude, latitude, missionId):
    pointsArray = []
    middlepoint = midpoint(latitude, longitude, float(location['lat']), float(location['long']))
    pointsArray.append([latitude, longitude])
    pointsArray.append(midpoint(latitude, longitude, middlepoint[0], middlepoint[1]))
    pointsArray.append(middlepoint)
    pointsArray.append(midpoint(middlepoint[0], middlepoint[1], float(location['lat']), float(location['long'])))
    pointsArray.append([float(location['lat']), float(location['long'])])
    print("Mission Started")
    for i in range(1, 5):
        time.sleep(5)
        if(i == 4):
            recive = requests.post(config['server_ip'] + "/api/mission/update", 
            data={'id': missionId,
                'longitude': pointsArray[i][1],
                'latitude': pointsArray[i][0],
                'isEnd': 1
            })
        else:
            recive = requests.post(config['server_ip'] + "/api/mission/update", 
            data={'id': missionId,
                'longitude': pointsArray[i][1],
                'latitude': pointsArray[i][0],
            })


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
        if(dataFromServer['quest'] == "mission"):
            makeMission(float(dataFromServer['longitude']), float(dataFromServer['latitude']), dataFromServer['missionId'])
    #while (True):
    #    time.sleep(2.5)


if __name__ == "__main__":
    main()