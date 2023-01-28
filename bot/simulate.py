import time
import sys, os
import requests
config = {}

def defineConfig():
    with open(os.path.join(sys.path[0],"config.txt")) as f:
        for line in f:
            (key, val) = line.split('=')
            config[key] = str(val.replace('"', ''))


def main():
    defineConfig()
    print(config['droneName'] + " started")
    print("Conecting to serwer")
    recive = requests.post(config['server_ip'] + "/api/drone/ping", 
        data={'droneName': config['droneName']}
        )
    print(recive.status_code)
    print("Conected")
    #while (True):
    #    time.sleep(2.5)


if __name__ == "__main__":
    main()