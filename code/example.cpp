    int maxAttempts = 5;
    while (!Factory.isPhoXiControlRunning() && maxAttempts != 0) {
        sleep(5);
        maxAttempts--;
        publishLogMsg(Warn, "PhoXi Control Software is not running! Keep trying");
    }

    if(!Factory.MinimizePhoXiControl()) {
        publishLogMsg(Info, "Can not minimized PhoXi Control app");
    } else publishLogMsg(Info, "PhoXi Control app minimized");

    publishLogMsg(Info, "connected to the PhoXiControl app");

    // timeout in ms
    int timeOut = 5000;
    int maxtries = 10;
    // Create scanner instance and connect to the scanner using Hardware ID
    while(!scanner && maxtries > 0) {
        scanner = Factory.CreateAndConnect(HARDWAREID.c_str(), timeOut);
        publishLogMsg(Warn, "Failed to connect to the camera! Keep trying");
        sleep(timeOut / 1000);
        maxtries--;
    }

    if (!scanner) {
        std::string msg = "Connection to the device " + HARDWAREID + " was Unsuccessful after 50sec!";
        publishLogMsg(Error, msg);
    }
