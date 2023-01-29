import time
import sys, os
import requests

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
    #while (True):
    #    time.sleep(2.5)


if __name__ == "__main__":
    main()