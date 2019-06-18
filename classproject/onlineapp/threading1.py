import sys
import time
import threading

counter = 0

def update():
    name = threading.current_thread().name
    global counter
    while True:
        counter+=1
        #print(name,"i value",i,"counter value",counter)


def watcher():
    global counter
    for i in range(20):
        print("watcher counter value is:",counter)

def main():
    thread1 = threading.Thread(target=update,name="worker1")
    thread2 = threading.Thread(target=update,name="worker2")
    watch = threading.Thread(target=watcher,name="watcher")

    thread1.start()
    thread2.start()
    watch.start()

    thread1.join()
    thread2.join()
    watch.join()

if __name__=='__main__':
    main()