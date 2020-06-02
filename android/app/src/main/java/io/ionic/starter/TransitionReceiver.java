package io.ionic.starter;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.cowbell.cordova.geofence.GeoNotification;
import com.cowbell.cordova.geofence.Gson;

public class TransitionReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String error = intent.getStringExtra("error");

        if (error != null) {
            //handle error
            Log.println(Log.ERROR, "YourAppTAG", error);
        } else {
            String geofencesJson = intent.getStringExtra("transitionData");
            //GeoNotification[] geoNotifications = Gson.get().fromJson(geofencesJson, GeoNotification[].class);
            //handle geoNotifications objects
        }
    }
}
