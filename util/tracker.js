"use strict";

import dgram from "node:dgram";
import { Buffer } from "node:buffer";

export const getPeers = (torrentFile, callback) =>  {
    const udpSocket = dgram.createSocket("udp4");
    const parsedUrl = torrentFile.announce.toString("utf8");

    udpSocketSend(udpSocket, createConnectionRequest(), parsedUrl);

    udpSocket.on("message", response => {
        if (responseType(response) === "connect") {
            const connectionResponse = parseConnectionResponse(response);
            const announceRequest = createAnnounceRequest(connectionResponse.connectionId);

            udpSocketSend(udpSocket, announceRequest, parsedUrl);
        } else if (responseType(response) === "announce") {
            const announceResponse = parseAnnounceResponse(response);
            callback(announceResponse.peers);
        }
    });
};

function udpSocketSend(socket, msg, rawUrl, callback = () => { }) {
    const url = new URL(rawUrl);
    socket.send(msg, 0, msg.length, url.port, url.host, callback);
}

function responseType() {
    
}

function createConnectionRequest() {
    
}

function parseConnectionResponse() {
    
}

function createAnnounceRequest() {
    
}

function parseAnnounceResponse() {
    
}
